import type {
  IRequestStats,
  IStatisticsService,
  ITopRequestsResponse,
} from './statistics.types';

const RECOMPUTATION_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

export class StatisticsService implements IStatisticsService {
  private requestCounts: Map<string, number> = new Map();
  private totalRequests: number = 0;
  private recomputationInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.startPeriodicRecomputation();
  }

  /**
   * Track an API request
   */
  public trackRequest(endpoint: string): void {
    const currentCount = this.requestCounts.get(endpoint) ?? 0;
    this.requestCounts.set(endpoint, currentCount + 1);
    this.totalRequests++;
  }

  /**
   * Get the top 5 requests with percentages
   */
  public getTopRequests(): ITopRequestsResponse {
    const sortedRequests = Array.from(this.requestCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([endpoint, count]) => ({
        endpoint,
        count,
        percentage:
          this.totalRequests > 0
            ? ((count / this.totalRequests) * 100).toFixed(2)
            : '0.00',
      }));

    return {
      topRequests: sortedRequests,
      totalRequests: this.totalRequests,
      lastUpdated: new Date().toISOString(),
      nextRecomputation: this.getNextRecomputationTime(),
    };
  }

  /**
   * Get current statistics
   */
  public getStats(): IRequestStats {
    return {
      totalRequests: this.totalRequests,
      uniqueEndpoints: this.requestCounts.size,
      topRequests: this.getTopRequests(),
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Reset all statistics
   */
  public resetStats(): void {
    this.requestCounts.clear();
    this.totalRequests = 0;
  }

  /**
   * Start periodic recomputation of statistics
   */
  private startPeriodicRecomputation(): void {
    this.recomputationInterval = setInterval(() => {
      this.recomputeStatistics();
    }, RECOMPUTATION_INTERVAL_MS);

    // Ensure cleanup on process exit
    process.on('exit', () => {
      this.cleanup();
    });

    process.on('SIGINT', () => {
      this.cleanup();
    });

    process.on('SIGTERM', () => {
      this.cleanup();
    });
  }

  /**
   * Recompute statistics (called every 5 minutes)
   */
  private recomputeStatistics(): void {
    console.log(`📊 Recomputing statistics at ${new Date().toISOString()}`);

    // In a real production system, you might want to:
    // 1. Persist statistics to a database
    // 2. Send metrics to a monitoring service
    // 3. Generate reports
    // 4. Trigger alerts if certain thresholds are met

    const stats = this.getTopRequests();
    console.log('📈 Current top requests:', stats.topRequests);
  }

  /**
   * Get the next recomputation time
   */
  private getNextRecomputationTime(): string {
    const now = new Date();
    const next = new Date(now.getTime() + RECOMPUTATION_INTERVAL_MS);
    return next.toISOString();
  }

  /**
   * Cleanup resources
   */
  private cleanup(): void {
    if (this.recomputationInterval) {
      clearInterval(this.recomputationInterval);
      this.recomputationInterval = null;
    }
  }

  /**
   * Stop the service (useful for testing)
   */
  public stop(): void {
    this.cleanup();
  }
}
