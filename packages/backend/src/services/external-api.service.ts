import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import type { ExternalApiConfig } from '../types/index.js';
import { CacheService } from './cache.service.js';

export class ExternalApiService {
  private client: AxiosInstance;
  private cache: CacheService;

  constructor(config: ExternalApiConfig, cache: CacheService) {
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout,
      headers: config.headers,
    });
    this.cache = cache;
  }

  /**
   * Make a GET request with caching
   */
  async get<T>(url: string, cacheKey?: string, ttl: number = 300): Promise<T> {
    // Check cache first
    if (cacheKey && this.cache.has(cacheKey)) {
      console.log(`Cache hit for key: ${cacheKey}`);
      return this.cache.get<T>(cacheKey)!;
    }

    try {
      console.log(`Making external API request to: ${url}`);
      const response: AxiosResponse<T> = await this.client.get(url);
      
      // Cache the response if cacheKey is provided
      if (cacheKey) {
        this.cache.set(cacheKey, response.data, ttl);
        console.log(`Cached response for key: ${cacheKey}`);
      }

      return response.data;
    } catch (error) {
      console.error('External API request failed:', error);
      throw error;
    }
  }

  /**
   * Clear cache for a specific pattern
   */
  clearCache(pattern?: string): void {
    if (pattern) {
      const keys = this.cache.getKeys().filter(key => key.includes(pattern));
      keys.forEach(key => this.cache.delete(key));
      console.log(`Cleared cache for pattern: ${pattern}`);
    } else {
      this.cache.clear();
      console.log('Cleared all cache');
    }
  }
}
