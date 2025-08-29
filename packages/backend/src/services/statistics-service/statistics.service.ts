import type {
  IRequestStats,
  IStatisticsService,
  ITopRequest,
} from './statistics.types';

export class StatisticsService implements IStatisticsService {
  private static DEFAULT_RECOMPUTATION_INTERVAL_MS = 5 * 60 * 100; // 5 minutes
  private requestCounts: Map<string, number> = new Map();
  private totalRequests: number = 0;
  private recomputationInterval: number;
  private intervalTimeout: NodeJS.Timeout | null = null;
  private _stats: IRequestStats | null = null;

  constructor(
    interval: number = StatisticsService.DEFAULT_RECOMPUTATION_INTERVAL_MS
  ) {
    this.recomputationInterval = interval;
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
   * Return the top 5 requests with percentages
   */
  private computeTopRequests(): ITopRequest[] {
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

    return sortedRequests;
  }

  /**
   * Get current statistics
   */
  public get stats(): IRequestStats | null {
    return this._stats;
  }

  /**
   * Reset the request counts
   */
  public resetCounts(): void {
    this.requestCounts.clear();
    this.totalRequests = 0;
  }

  /**
   * Reset all statistics
   */
  public resetStats(): void {
    this.resetCounts();
    this._stats = null;
  }

  /**
   * Start periodic recomputation of statistics
   */
  private startPeriodicRecomputation(): void {
    this.intervalTimeout = setInterval(() => {
      this.recomputeStatistics();
    }, this.recomputationInterval);

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
   * Update the statistics
   */
  private updateStats(): void {
    if (this.totalRequests === 0) {
      return;
    }

    this._stats = {
      totalRequests: this.totalRequests,
      uniqueEndpoints: this.requestCounts.size,
      topRequests: this.computeTopRequests(),
      lastUpdated: new Date().toISOString(),
      nextRecomputation: new Date(
        new Date().getTime() + this.recomputationInterval
      ).toISOString(),
    };
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

    this.updateStats();
    this.resetCounts();
    console.log('📈 Current stats:', this.stats);
  }

  /**
   * Cleanup resources
   */
  private cleanup(): void {
    if (this.intervalTimeout) {
      clearInterval(this.intervalTimeout);
      this.intervalTimeout = null;
      this.resetStats();
    }
  }

  /**
   * Stop the service
   */
  public stop(): void {
    this.cleanup();
  }

  /**
   * Start the service
   */
  public start() {
    this.startPeriodicRecomputation();
  }
}
