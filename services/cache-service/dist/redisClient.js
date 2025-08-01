"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedisClient = connectRedisClient;
exports.getRedisClient = getRedisClient;
const redis_1 = require("redis");
let clientInstance;
const REDIS_URL = 'http://localhost:6379';
async function connectRedisClient() {
    if (clientInstance && clientInstance.isReady) {
        console.log('Redis is already connected');
        return;
    }
    try {
        clientInstance = (0, redis_1.createClient)({
            socket: { host: 'localhost', port: 6379 },
        });
        clientInstance.on('Error', (err) => console.log('There was some error connecting to redis.'));
        await clientInstance.connect();
        console.log('Redis connected successfully');
    }
    catch (error) {
        console.log('Error connecting to redis', error);
    }
}
function getRedisClient() {
    if (!clientInstance || !clientInstance.isReady) {
        throw new Error('Redis client is not connected or ready.');
    }
    return clientInstance;
}
//# sourceMappingURL=redisClient.js.map