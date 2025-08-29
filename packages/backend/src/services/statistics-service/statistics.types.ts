export interface ITopRequest {
  endpoint: string;
  count: number;
  percentage: string;
}

export interface IRequestStats {
  totalRequests: number;
  uniqueEndpoints: number;
  topRequests: ITopRequest[];
  lastUpdated: string;
  nextRecomputation: string;
}

export interface IStatisticsService {
  trackRequest(endpoint: string): void;
  get stats(): IRequestStats | null;
  resetStats(): void;
  stop(): void;
}
