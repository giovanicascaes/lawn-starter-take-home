import NodeCache from 'node-cache';
import type { CacheConfig } from '../types/index.js';

export class CacheService {
  private cache: NodeCache;

  constructor(config: CacheConfig = { ttl: 300, checkperiod: 600 }) {
    this.cache = new NodeCache(config);
  }

  /**
   * Get a value from cache
   */
  get<T>(key: string): T | undefined {
    return this.cache.get(key);
  }

  /**
   * Set a value in cache
   */
  set<T>(key: string, value: T, ttl?: number): boolean {
    if (ttl) {
      return this.cache.set(key, value, ttl);
    }
    return this.cache.set(key, value);
  }

  /**
   * Check if a key exists in cache
   */
  has(key: string): boolean {
    return this.cache.has(key);
  }

  /**
   * Delete a key from cache
   */
  delete(key: string): number {
    return this.cache.del(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.flushAll();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return this.cache.getStats();
  }

  /**
   * Get cache keys
   */
  getKeys(): string[] {
    return this.cache.keys();
  }
}
