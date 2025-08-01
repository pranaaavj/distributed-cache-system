import { createClient } from 'redis';
export type connectedRedisClient = ReturnType<typeof createClient>;
export declare function connectRedisClient(): Promise<void>;
export declare function getRedisClient(): connectedRedisClient;
//# sourceMappingURL=redisClient.d.ts.map