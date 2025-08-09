import * as grpc from '@grpc/grpc-js';
import { CacheServiceService, } from '@system/proto-contracts';
import { getRedisClient, connectRedisClient, } from './redisClient';
class CacheService {
    constructor(redisClient) {
        this.redis = redisClient;
    }
    async getCache(call, callback) {
        const key = call.request.key;
        try {
            const value = await this.redis.get(key);
            if (!value) {
                callback({ code: grpc.status.NOT_FOUND, message: 'Cache not found' });
                return;
            }
            const product = JSON.parse(value);
            product.stock = Number(product.stock) || 0;
            product.price = Number(product.price) || 0.0;
            callback(null, product);
        }
        catch (error) {
            callback({ name: 'Error', message: 'There was an error' });
        }
    }
    async setCache(call, callback) {
        const { key, value, ttlSeconds } = call.request;
        if (!key || !value)
            return;
        try {
            await this.redis.set(key, JSON.stringify(value), {
                EX: ttlSeconds,
            });
            callback(null, { message: 'Cached successfully' });
        }
        catch (error) {
            callback({ name: 'Error', message: 'There was an error' });
        }
    }
    async invalidateCache(call, callback) {
        const key = call.request.key;
        if (!key) {
            callback({ code: grpc.status.NOT_FOUND, message: 'No key was present' });
            return;
        }
        try {
            await this.redis.del(key);
            callback(null, { message: 'Cache invalidated successfully.' });
        }
        catch (error) {
            callback({ code: grpc.status.INTERNAL, message: 'There was an error' });
        }
    }
}
const CACHE_SERVICE_PORT = 50052;
const server = new grpc.Server();
connectRedisClient().then(() => {
    const redisClient = getRedisClient();
    server.addService(CacheServiceService, new CacheService(redisClient)); // Todo: Have used any for development, change this accordingly.
    server.bindAsync(`0.0.0.0:${CACHE_SERVICE_PORT}`, grpc.ServerCredentials.createInsecure(), (err) => {
        if (err)
            return console.log('There was some error.');
        console.log('Cache service started');
    });
});
