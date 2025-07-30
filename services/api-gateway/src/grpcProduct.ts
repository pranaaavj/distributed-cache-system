import * as grpc from '@grpc/grpc-js';
import { ProductServiceClient } from './generated/product';

const PRODUCT_SERVICE_PORT = 'localhost:50051';

const client = new ProductServiceClient(
  PRODUCT_SERVICE_PORT,
  grpc.credentials.createInsecure()
);

export const GrpcProductClient = client;

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);

client.waitForReady(deadline, (err) => {
  if (err) return console.log('Error starting the product service');

  console.log('Server has started');
});
