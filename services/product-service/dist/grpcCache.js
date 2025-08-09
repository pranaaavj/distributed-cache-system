import * as grpc from '@grpc/grpc-js';
import { CacheServiceClient } from '@system/proto-contracts';
const CACHE_SERVICE_PORT = 'localhost:50052';
const client = new CacheServiceClient(CACHE_SERVICE_PORT, grpc.credentials.createInsecure());
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
export const GrpcCacheClient = {
    getCache: promisifyGrpcCall(client.getCache.bind(client), 'getCache'),
    setCache: promisifyGrpcCall(client.setCache.bind(client), 'setCache'),
    InvalidateCache: promisifyGrpcCall(client.invalidateCache.bind(client), 'InvalidateCache'),
};
const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
