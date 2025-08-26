import type { NextFunction, Request, Response } from 'express';
import type { IStatisticsService } from '../../services/statistics-service/statistics.types';

export function createRequestTracker(statisticsService: IStatisticsService) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const endpoint = `${req.method} ${req.route?.path ?? req.path}`;
    statisticsService.trackRequest(endpoint);

    next();
  };
}
