"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = __importStar(require("@grpc/grpc-js"));
const cache_service_1 = require("./generated/cache_service");
const redisClient_1 = require("./redisClient");
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
(0, redisClient_1.connectRedisClient)().then(() => {
    const redisClient = (0, redisClient_1.getRedisClient)();
    server.addService(cache_service_1.CacheServiceService, new CacheService(redisClient));
    server.bindAsync(`0.0.0.0:${CACHE_SERVICE_PORT}`, grpc.ServerCredentials.createInsecure(), (err) => {
        if (err)
            return console.log('There was some error.');
        console.log('Cache service started');
    });
});
//# sourceMappingURL=main.js.map