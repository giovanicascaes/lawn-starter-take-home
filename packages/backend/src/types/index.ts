export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CacheConfig {
  ttl: number; // Time to live in seconds
  checkperiod: number; // Check period in seconds
}

export interface ExternalApiConfig {
  baseUrl: string;
  timeout: number;
  headers?: Record<string, string>;
}

export interface ServerConfig {
  port: number;
  host: string;
  cors: {
    origin: string | string[];
    credentials: boolean;
  };
}
