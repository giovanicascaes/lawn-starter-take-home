export interface IApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ICacheConfig {
  ttl: number; // Time to live in seconds
  checkperiod: number; // Check period in seconds
}

export interface IApiConfig {
  baseUrl: string;
  timeout: number;
  headers?: Record<string, string>;
}

export interface IServerConfig {
  port: number;
  host: string;
  cors: {
    origin: string | string[];
    credentials: boolean;
  };
}
