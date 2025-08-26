export interface IApiService {
  get<T>(url: string, cacheKey?: string, ttl?: number): Promise<T>;
}
