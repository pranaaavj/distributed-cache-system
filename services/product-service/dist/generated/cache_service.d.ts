import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { type CallOptions, type ChannelCredentials, Client, type ClientOptions, type ClientUnaryCall, type handleUnaryCall, type Metadata, type ServiceError, type UntypedServiceImplementation } from "@grpc/grpc-js";
export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    category: string;
}
export interface GetRequest {
    key: string;
}
export interface GetResponse {
    value?: Product | undefined;
}
export interface SetResponse {
    message: string;
}
export interface SetRequest {
    key: string;
    value?: Product | undefined;
    ttlSeconds: number;
}
export interface InvalidateRequest {
    key: string;
}
export interface InvalidateResponse {
    message: string;
}
export declare const Product: MessageFns<Product>;
export declare const GetRequest: MessageFns<GetRequest>;
export declare const GetResponse: MessageFns<GetResponse>;
export declare const SetResponse: MessageFns<SetResponse>;
export declare const SetRequest: MessageFns<SetRequest>;
export declare const InvalidateRequest: MessageFns<InvalidateRequest>;
export declare const InvalidateResponse: MessageFns<InvalidateResponse>;
export type CacheServiceService = typeof CacheServiceService;
export declare const CacheServiceService: {
    readonly getCache: {
        readonly path: "/cache_service.CacheService/GetCache";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: GetRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => GetRequest;
        readonly responseSerialize: (value: Product) => Buffer;
        readonly responseDeserialize: (value: Buffer) => Product;
    };
    readonly setCache: {
        readonly path: "/cache_service.CacheService/SetCache";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: SetRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => SetRequest;
        readonly responseSerialize: (value: SetResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => SetResponse;
    };
    readonly invalidateCache: {
        readonly path: "/cache_service.CacheService/InvalidateCache";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: InvalidateRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => InvalidateRequest;
        readonly responseSerialize: (value: InvalidateResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => InvalidateResponse;
    };
};
export interface CacheServiceServer extends UntypedServiceImplementation {
    getCache: handleUnaryCall<GetRequest, Product>;
    setCache: handleUnaryCall<SetRequest, SetResponse>;
    invalidateCache: handleUnaryCall<InvalidateRequest, InvalidateResponse>;
}
export interface CacheServiceClient extends Client {
    getCache(request: GetRequest, callback: (error: ServiceError | null, response: Product) => void): ClientUnaryCall;
    getCache(request: GetRequest, metadata: Metadata, callback: (error: ServiceError | null, response: Product) => void): ClientUnaryCall;
    getCache(request: GetRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: Product) => void): ClientUnaryCall;
    setCache(request: SetRequest, callback: (error: ServiceError | null, response: SetResponse) => void): ClientUnaryCall;
    setCache(request: SetRequest, metadata: Metadata, callback: (error: ServiceError | null, response: SetResponse) => void): ClientUnaryCall;
    setCache(request: SetRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: SetResponse) => void): ClientUnaryCall;
    invalidateCache(request: InvalidateRequest, callback: (error: ServiceError | null, response: InvalidateResponse) => void): ClientUnaryCall;
    invalidateCache(request: InvalidateRequest, metadata: Metadata, callback: (error: ServiceError | null, response: InvalidateResponse) => void): ClientUnaryCall;
    invalidateCache(request: InvalidateRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: InvalidateResponse) => void): ClientUnaryCall;
}
export declare const CacheServiceClient: {
    new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): CacheServiceClient;
    service: typeof CacheServiceService;
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
//# sourceMappingURL=cache_service.d.ts.map