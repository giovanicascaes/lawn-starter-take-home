export interface IApiService {
  get<T>(
    url: string,
    params?: URLSearchParams,
    cacheKey?: string,
    ttl?: number
  ): Promise<T>;
}
