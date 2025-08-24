export interface ICacheService {
  get<T>(key: string): T | undefined;
  set<T>(key: string, value: T, ttl?: number): boolean;
  has(key: string): boolean;
  del(key: string): void;
  flushAll(): void;
  getStats(): {
    hits: number;
    misses: number;
    keys: number;
  };
}
