import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import {
  ConflictError,
  CustomError,
  ForbiddenError,
  NotFoundError,
  RateLimitError,
  UnauthorizedError,
  ValidationError,
} from '../../middleware/error-interceptor/error-interceptor';
import { CacheService } from '../cache-service/cache.service';
import type { IApiService } from './api-service.types';

export class ApiService implements IApiService {
  private readonly client: AxiosInstance;
  private readonly cache: CacheService;

  constructor(client: AxiosInstance, cache: CacheService) {
    this.client = client;
    this.cache = cache;
  }

  /**
   * Make a GET request with caching
   */
  async get<T>(
    url: string,
    cacheKey?: string,
    ttl: number = Infinity
  ): Promise<T> {
    // Check cache first
    if (cacheKey && this.cache.has(cacheKey)) {
      console.log(`Cache hit for key: ${cacheKey}`);
      return this.cache.get<T>(cacheKey)!;
    }

    try {
      console.log(`Making Star Wars API request to: ${url}`);
      const response: AxiosResponse<T> = await this.client.get(url);

      // Cache the response if cacheKey is provided
      if (cacheKey) {
        this.cache.set(cacheKey, response.data, ttl);
        console.log(`Cached response for key: ${cacheKey}`);
      }

      return response.data;
    } catch (error: unknown) {
      console.error('Star Wars API request failed:', error);
      const axiosError = error as AxiosError;

      // Map HTTP status codes to custom errors
      if (axiosError.response) {
        const { status, statusText, data } = axiosError.response;
        const errorData = data as any;

        switch (status) {
          case 400:
            throw new ValidationError(
              errorData?.message ?? statusText ?? 'Bad request'
            );
          case 401:
            throw new UnauthorizedError(
              errorData?.message ?? statusText ?? 'Unauthorized'
            );
          case 403:
            throw new ForbiddenError(
              errorData?.message ?? statusText ?? 'Forbidden'
            );
          case 404:
            throw new NotFoundError(
              errorData?.message ?? statusText ?? 'Resource not found'
            );
          case 409:
            throw new ConflictError(
              errorData?.message ?? statusText ?? 'Conflict'
            );
          case 429:
            throw new RateLimitError(
              errorData?.message ?? statusText ?? 'Too many requests'
            );
          case 500:
          case 502:
          case 503:
          case 504:
            throw new CustomError(
              errorData?.message ?? statusText ?? 'Star Wards API error',
              status
            );
          default:
            throw new CustomError(
              errorData?.message ??
                statusText ??
                'Star Wards API request failed',
              status ?? 500
            );
        }
      }

      // Handle network errors or other non-HTTP errors
      if (
        axiosError.code === 'ECONNREFUSED' ||
        axiosError.code === 'ENOTFOUND'
      ) {
        throw new CustomError('Star Wards API is unreachable', 503);
      }

      if (axiosError.code === 'ETIMEDOUT') {
        throw new CustomError('Star Wards API request timed out', 504);
      }

      // Re-throw as generic error if we can't determine the type
      throw new CustomError(
        axiosError.message ?? 'Star Wards API request failed',
        500
      );
    }
  }
}
