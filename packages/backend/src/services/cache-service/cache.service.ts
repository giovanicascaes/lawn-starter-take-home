import NodeCache from 'node-cache';
import type { ICacheConfig } from '../../index.types';
import type { ICacheService } from './cache-service.types';

export class CacheService implements ICacheService {
  private cache: NodeCache;

  constructor(config: ICacheConfig = { ttl: 300, checkperiod: 600 }) {
    this.cache = new NodeCache(config);
  }

  del(key: string): void {
    throw new Error('Method not implemented.');
  }

  flushAll(): void {
    throw new Error('Method not implemented.');
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
   * Clear by pattern
   */
  clearBy(pattern?: string): void {
    if (pattern) {
      const keys = this.getKeys().filter(key => key.includes(pattern));
      keys.forEach(key => this.delete(key));
      console.log(`Cleared cache for pattern: ${pattern}`);
    } else {
      this.clear();
      console.log('Cleared all cache');
    }
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
