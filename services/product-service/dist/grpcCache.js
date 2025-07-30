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
exports.GrpcCacheClient = void 0;
const grpc = __importStar(require("@grpc/grpc-js"));
const cache_service_1 = require("./generated/cache_service");
const CACHE_SERVICE_PORT = 'localhost:50052';
const client = new cache_service_1.CacheServiceClient(CACHE_SERVICE_PORT, grpc.credentials.createInsecure());
function promisifyGrpcCall(method, methodName) {
    return (request) => {
        return new Promise((resolve, reject) => {
            method(request, (error, response) => {
                if (error) {
                    if (methodName === 'getCache' &&
                        error.code == grpc.status.NOT_FOUND) {
                        resolve(null);
                    }
                    else {
                        reject(error);
                        return;
                    }
                }
                if (response) {
                    resolve(response);
                }
                else {
                    if (methodName === 'DeleteProduct') {
                        resolve(undefined);
                    }
                    else {
                        reject(new Error(`Call to ${methodName} returned no response.`));
                    }
                }
            });
        });
    };
}
exports.GrpcCacheClient = {
    getCache: promisifyGrpcCall(client.getCache.bind(client), 'getCache'),
    setCache: promisifyGrpcCall(client.setCache.bind(client), 'setCache'),
    InvalidateCache: promisifyGrpcCall(client.invalidateCache.bind(client), 'InvalidateCache'),
};
const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
client.waitForReady(deadline, (err) => {
    if (err)
        return console.log('Error starting the product service');
    console.log('Server has started');
});
//# sourceMappingURL=grpcCache.js.map