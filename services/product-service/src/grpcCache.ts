import * as grpc from '@grpc/grpc-js';
import { CacheServiceClient, GetResponse } from '@system/proto-contracts';
import {
  GetRequest,
  SetRequest,
  Product,
  SetResponse,
  InvalidateRequest,
  InvalidateResponse,
} from '@system/proto-contracts';

const CACHE_SERVICE_PORT = 'localhost:50052';

const client = new CacheServiceClient(
  CACHE_SERVICE_PORT,
  grpc.credentials.createInsecure()
);

function promisifyGrpcCall<RequestType, ResponseType>(
  method: (
    request: RequestType,
    callback: grpc.requestCallback<ResponseType>
  ) => grpc.ClientUnaryCall,
  methodName: string
): (request: RequestType) => Promise<ResponseType | null> {
  return (request: RequestType): Promise<ResponseType | null> => {
    return new Promise((resolve, reject) => {
      method(
        request,
        (error: grpc.ServiceError | null, response?: ResponseType) => {
          if (error) {
            if (
              methodName === 'getCache' &&
              error.code == grpc.status.NOT_FOUND
            ) {
              resolve(null);
            } else {
              reject(error);
              return;
            }
          }
          if (response) {
            resolve(response);
          } else {
            if (methodName === 'DeleteProduct') {
              resolve(undefined as ResponseType);
            } else {
              reject(new Error(`Call to ${methodName} returned no response.`));
            }
          }
        }
      );
    });
  };
}

export const GrpcCacheClient = {
  getCache: promisifyGrpcCall<GetRequest, Product>(
    client.getCache.bind(client),
    'getCache'
  ),
  setCache: promisifyGrpcCall<SetRequest, SetResponse>(
    client.setCache.bind(client),
    'setCache'
  ),
  InvalidateCache: promisifyGrpcCall<InvalidateRequest, InvalidateResponse>(
    client.invalidateCache.bind(client),
    'InvalidateCache'
  ),
};

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
