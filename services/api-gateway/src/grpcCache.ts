import * as grpc from '@grpc/grpc-js';
import { CacheServiceClient } from '@system/proto-contracts';

const CACHE_SERVICE_PORT = 'localhost:50052';

const client = new CacheServiceClient(
  CACHE_SERVICE_PORT,
  grpc.credentials.createInsecure()
);

export const GrpcCacheClient = client;

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
