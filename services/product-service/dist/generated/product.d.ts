import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { type CallOptions, type ChannelCredentials, Client, type ClientOptions, type ClientUnaryCall, type handleUnaryCall, type Metadata, type ServiceError, type UntypedServiceImplementation } from "@grpc/grpc-js";
export interface DeleteResponse {
    message: string;
}
export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    category: string;
}
export interface GetProductRequest {
    id: string;
}
export interface CreateProductRequest {
    name: string;
    price: number;
    description: string;
    stock: number;
    category: string;
}
export interface UpdateProductRequest {
    id: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    category: string;
}
export interface DeleteProductRequest {
    id: string;
}
export declare const DeleteResponse: MessageFns<DeleteResponse>;
export declare const Product: MessageFns<Product>;
export declare const GetProductRequest: MessageFns<GetProductRequest>;
export declare const CreateProductRequest: MessageFns<CreateProductRequest>;
export declare const UpdateProductRequest: MessageFns<UpdateProductRequest>;
export declare const DeleteProductRequest: MessageFns<DeleteProductRequest>;
export type ProductServiceService = typeof ProductServiceService;
export declare const ProductServiceService: {
    readonly getProduct: {
        readonly path: "/product_service.ProductService/GetProduct";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: GetProductRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => GetProductRequest;
        readonly responseSerialize: (value: Product) => Buffer;
        readonly responseDeserialize: (value: Buffer) => Product;
    };
    readonly createProduct: {
        readonly path: "/product_service.ProductService/CreateProduct";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: CreateProductRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => CreateProductRequest;
        readonly responseSerialize: (value: Product) => Buffer;
        readonly responseDeserialize: (value: Buffer) => Product;
    };
    readonly updateProduct: {
        readonly path: "/product_service.ProductService/UpdateProduct";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: UpdateProductRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => UpdateProductRequest;
        readonly responseSerialize: (value: Product) => Buffer;
        readonly responseDeserialize: (value: Buffer) => Product;
    };
    readonly deleteProduct: {
        readonly path: "/product_service.ProductService/DeleteProduct";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: DeleteProductRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => DeleteProductRequest;
        readonly responseSerialize: (value: DeleteResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => DeleteResponse;
    };
};
export interface ProductServiceServer extends UntypedServiceImplementation {
    getProduct: handleUnaryCall<GetProductRequest, Product>;
    createProduct: handleUnaryCall<CreateProductRequest, Product>;
    updateProduct: handleUnaryCall<UpdateProductRequest, Product>;
    deleteProduct: handleUnaryCall<DeleteProductRequest, DeleteResponse>;
}
export interface ProductServiceClient extends Client {
    getProduct(request: GetProductRequest, callback: (error: ServiceError | null, response: Product) => void): ClientUnaryCall;
    getProduct(request: GetProductRequest, metadata: Metadata, callback: (error: ServiceError | null, response: Product) => void): ClientUnaryCall;
    getProduct(request: GetProductRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: Product) => void): ClientUnaryCall;
    createProduct(request: CreateProductRequest, callback: (error: ServiceError | null, response: Product) => void): ClientUnaryCall;
    createProduct(request: CreateProductRequest, metadata: Metadata, callback: (error: ServiceError | null, response: Product) => void): ClientUnaryCall;
    createProduct(request: CreateProductRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: Product) => void): ClientUnaryCall;
    updateProduct(request: UpdateProductRequest, callback: (error: ServiceError | null, response: Product) => void): ClientUnaryCall;
    updateProduct(request: UpdateProductRequest, metadata: Metadata, callback: (error: ServiceError | null, response: Product) => void): ClientUnaryCall;
    updateProduct(request: UpdateProductRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: Product) => void): ClientUnaryCall;
    deleteProduct(request: DeleteProductRequest, callback: (error: ServiceError | null, response: DeleteResponse) => void): ClientUnaryCall;
    deleteProduct(request: DeleteProductRequest, metadata: Metadata, callback: (error: ServiceError | null, response: DeleteResponse) => void): ClientUnaryCall;
    deleteProduct(request: DeleteProductRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: DeleteResponse) => void): ClientUnaryCall;
}
export declare const ProductServiceClient: {
    new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): ProductServiceClient;
    service: typeof ProductServiceService;
    serviceName: string;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
type DeepPartial<T> = T extends Builtin ? T : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
interface MessageFns<T> {
    encode(message: T, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): T;
    fromJSON(object: any): T;
    toJSON(message: T): unknown;
    create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
    fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
export {};
//# sourceMappingURL=product.d.ts.map