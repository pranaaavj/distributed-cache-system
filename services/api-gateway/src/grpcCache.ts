import * as grpc from '@grpc/grpc-js';
import { CacheServiceClient } from './generated/cache_service';

const CACHE_SERVICE_PORT = 'localhost:50052';

const client = new CacheServiceClient(
  CACHE_SERVICE_PORT,
  grpc.credentials.createInsecure()
);

export const GrpcCacheClient = client;

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);

client.waitForReady(deadline, (err) => {
  if (err) return console.log('Error starting the product service');

  console.log('Server has started');
});
