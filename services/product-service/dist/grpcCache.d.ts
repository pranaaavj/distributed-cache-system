import { GetRequest, SetRequest, Product, SetResponse, InvalidateRequest, InvalidateResponse } from './generated/cache_service';
export declare const GrpcCacheClient: {
    getCache: (request: GetRequest) => Promise<Product | null>;
    setCache: (request: SetRequest) => Promise<SetResponse | null>;
    InvalidateCache: (request: InvalidateRequest) => Promise<InvalidateResponse | null>;
};
//# sourceMappingURL=grpcCache.d.ts.map