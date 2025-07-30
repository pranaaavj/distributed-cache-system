import { Product, GetProductRequest, ProductServiceServer, UpdateProductRequest, CreateProductRequest, DeleteProductRequest, DeleteResponse } from './generated/product';
import { sendUnaryData, ServerUnaryCall, UntypedHandleCall } from '@grpc/grpc-js';
export interface ProductData extends Product {
    id: string;
}
export declare class ProductService implements ProductServiceServer {
    [method: string]: UntypedHandleCall;
    getProduct(call: ServerUnaryCall<GetProductRequest, Product>, callback: sendUnaryData<Product>): Promise<void>;
    createProduct(call: ServerUnaryCall<CreateProductRequest, Product>, callback: sendUnaryData<Product>): void;
    updateProduct(call: ServerUnaryCall<UpdateProductRequest, Product>, callback: sendUnaryData<Product>): Promise<void>;
    deleteProduct(call: ServerUnaryCall<DeleteProductRequest, DeleteResponse>, callback: sendUnaryData<DeleteResponse>): Promise<void>;
}
//# sourceMappingURL=main.d.ts.map