import type { Request, Response } from 'express';
import { Router } from 'express';
import type { IApiResponse } from '../index.types';
import { CustomError } from '../middleware/error-interceptor/error-interceptor.js';
import { createRequestTracker } from '../middleware/request-tracker/request-tracker.js';
import type { IApiProvider } from '../services/api-provider.types';
import type { ICacheService } from '../services/cache-service/cache-service.types';
import type { IStatisticsService } from '../services/statistics-service/statistics.types';

export function createApiRouter(
  apiProvider: IApiProvider,
  cacheService: ICacheService,
  statisticsService: IStatisticsService
): Router {
  const router = Router();

  const trackRequest = createRequestTracker(statisticsService);

  // Health check endpoint
  router.get('/health', async (req: Request, res: Response<IApiResponse>) => {
    res.json({
      success: true,
      message: 'Backend is healthy',
      data: {
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        data: cacheService.getStats(),
      },
    });
  });

  router.get(
    '/people',
    trackRequest,
    async (req: Request, res: Response<IApiResponse>) => {
      const data = await apiProvider.people.getList(
        req.query.search as string | undefined
      );

      res.json({
        success: true,
        data,
        message: 'Data retrieved successfully',
      });
    }
  );

  router.get(
    '/people/:id',
    trackRequest,
    async (req: Request, res: Response<IApiResponse>) => {
      const data = await apiProvider.people.getOneById(
        Number(req.params['id'])
      );

      res.json({
        success: true,
        data,
        message: 'Data retrieved successfully',
      });
    }
  );

  router.get(
    '/movies',
    trackRequest,
    async (req: Request, res: Response<IApiResponse>) => {
      const data = await apiProvider.movie.getList(
        req.query.search as string | undefined
      );

      res.json({
        success: true,
        data,
        message: 'Data retrieved successfully',
      });
    }
  );

  router.get(
    '/movies/:id',
    trackRequest,
    async (req: Request, res: Response<IApiResponse>) => {
      const data = await apiProvider.movie.getOneById(Number(req.params['id']));

      res.json({
        success: true,
        data,
        message: 'Data retrieved successfully',
      });
    }
  );

  // Cache management endpoints
  router.get(
    '/cache/stats',
    async (req: Request, res: Response<IApiResponse>) => {
      res.json({
        success: true,
        data: cacheService.getStats(),
        message: 'Cache statistics retrieved',
      });
    }
  );

  router.delete(
    '/cache/clear',
    async (req: Request, res: Response<IApiResponse>) => {
      const pattern = req.query.pattern as string;
      cacheService.clearBy(pattern);

      res.json({
        success: true,
        message: pattern
          ? `Cache cleared for pattern: ${pattern}`
          : 'All cache cleared',
      });
    }
  );

  // Statistics endpoint
  router.get(
    '/statistics',
    async (_req: Request, res: Response<IApiResponse>) => {
      res.json({
        success: true,
        data: statisticsService.stats,
        message: statisticsService.stats
          ? 'Top 5 requests statistics retrieved'
          : 'Not enough requests to compute statistics',
      });
    }
  );

  // Demo endpoint to showcase error handling
  router.get(
    '/demo/error/:type',
    async (req: Request, res: Response<IApiResponse>) => {
      const errorType = req.params.type;

      switch (errorType) {
        case 'validation':
          throw new CustomError(
            'This is a validation error example',
            400,
            'VALIDATION_ERROR'
          );
        case 'not-found':
          throw new CustomError(
            'This is a not found error example',
            404,
            'NOT_FOUND'
          );
        case 'unauthorized':
          throw new CustomError(
            'This is an unauthorized error example',
            401,
            'UNAUTHORIZED'
          );
        case 'forbidden':
          throw new CustomError(
            'This is a forbidden error example',
            403,
            'FORBIDDEN'
          );
        case 'conflict':
          throw new CustomError(
            'This is a conflict error example',
            409,
            'CONFLICT'
          );
        case 'rate-limit':
          throw new CustomError(
            'This is a rate limit error example',
            429,
            'RATE_LIMIT_EXCEEDED'
          );
        case 'server':
          throw new CustomError(
            'This is a server error example',
            500,
            'INTERNAL_ERROR'
          );
        default:
          throw new CustomError(
            'Unknown error type',
            400,
            'INVALID_ERROR_TYPE'
          );
      }
    }
  );

  return router;
}
