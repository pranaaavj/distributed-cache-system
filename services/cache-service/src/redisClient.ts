import { createClient, RedisClientType } from 'redis';

let clientInstance: ReturnType<typeof createClient>;

export type connectedRedisClient = ReturnType<typeof createClient>;

const REDIS_URL = 'http://localhost:6379';

export async function connectRedisClient(): Promise<void> {
  if (clientInstance && clientInstance.isReady) {
    console.log('Redis is already connected');
    return;
  }

  try {
    clientInstance = createClient({
      socket: { host: 'localhost', port: 6379 },
    });
    clientInstance.on('Error', (err) =>
      console.log('There was some error connecting to redis.')
    );
    await clientInstance.connect();
    console.log('Redis connected successfully');
  } catch (error) {
    console.log('Error connecting to redis', error);
  }
}

export function getRedisClient(): connectedRedisClient {
  if (!clientInstance || !clientInstance.isReady) {
    throw new Error('Redis client is not connected or ready.');
  }

  return clientInstance;
}
