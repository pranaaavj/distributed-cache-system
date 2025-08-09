import * as grpc from '@grpc/grpc-js';
import { ProductServiceClient } from '@system/proto-contracts';
const PRODUCT_SERVICE_PORT = 'localhost:50051';
const client = new ProductServiceClient(PRODUCT_SERVICE_PORT, grpc.credentials.createInsecure());
export const GrpcProductClient = client;
const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
