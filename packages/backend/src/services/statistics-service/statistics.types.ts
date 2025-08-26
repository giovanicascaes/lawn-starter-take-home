export interface ITopRequest {
  endpoint: string;
  count: number;
  percentage: string;
}

export interface ITopRequestsResponse {
  topRequests: ITopRequest[];
  totalRequests: number;
  lastUpdated: string;
  nextRecomputation: string;
}

export interface IRequestStats {
  totalRequests: number;
  uniqueEndpoints: number;
  topRequests: ITopRequestsResponse;
  lastUpdated: string;
}

export interface IStatisticsService {
  trackRequest(endpoint: string): void;
  getTopRequests(): ITopRequestsResponse;
  getStats(): IRequestStats;
  resetStats(): void;
  stop(): void;
}
