import * as grpc from '@grpc/grpc-js';
import {
  GetRequest,
  SetRequest,
  SetResponse,
  CacheServiceService,
  CacheServiceServer,
  InvalidateRequest,
  InvalidateResponse,
  Product,
} from './generated/cache_service';
import {
  connectedRedisClient,
  getRedisClient,
  connectRedisClient,
} from './redisClient';

class CacheService {
  private redis: connectedRedisClient;

  constructor(redisClient: connectedRedisClient) {
    this.redis = redisClient;
  }

  public async getCache(
    call: grpc.ServerUnaryCall<GetRequest, Product>,
    callback: grpc.sendUnaryData<Product>
  ) {
    const key = call.request.key;

    try {
      const value = await this.redis.get(key);
      if (!value) {
        callback({ code: grpc.status.NOT_FOUND, message: 'Cache not found' });
        return;
      }

      const product: Product = JSON.parse(value);

      product.stock = Number(product.stock) || 0;
      product.price = Number(product.price) || 0.0;

      callback(null, product);
    } catch (error) {
      callback({ name: 'Error', message: 'There was an error' });
    }
  }

  public async setCache(
    call: grpc.ServerUnaryCall<SetRequest, SetResponse>,
    callback: grpc.sendUnaryData<SetResponse>
  ) {
    const { key, value, ttlSeconds } = call.request;

    if (!key || !value) return;

    try {
      await this.redis.set(key, JSON.stringify(value), {
        EX: ttlSeconds,
      });

      callback(null, { message: 'Cached successfully' });
    } catch (error) {
      callback({ name: 'Error', message: 'There was an error' });
    }
  }

  public async invalidateCache(
    call: grpc.ServerUnaryCall<InvalidateRequest, InvalidateResponse>,
    callback: grpc.sendUnaryData<InvalidateResponse>
  ) {
    const key = call.request.key;

    if (!key) {
      callback({ code: grpc.status.NOT_FOUND, message: 'No key was present' });
      return;
    }

    try {
      await this.redis.del(key);
      callback(null, { message: 'Cache invalidated successfully.' });
    } catch (error) {
      callback({ code: grpc.status.INTERNAL, message: 'There was an error' });
    }
  }
}

const CACHE_SERVICE_PORT = 50052;

const server = new grpc.Server();

connectRedisClient().then(() => {
  const redisClient = getRedisClient();

  server.addService(
    CacheServiceService,
    new CacheService(redisClient) as unknown as CacheServiceServer
  );
  server.bindAsync(
    `0.0.0.0:${CACHE_SERVICE_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err) => {
      if (err) return console.log('There was some error.');

      console.log('Cache service started');
    }
  );
});
