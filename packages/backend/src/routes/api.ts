import type { Request, Response } from 'express';
import { Router } from 'express';
import type { IApiResponse } from '../index.types';
import { CustomError } from '../middleware/error-interceptor/error-interceptor';
import { ApiProvider } from '../services/api-provider';
import { CacheService } from '../services/cache-service/cache.service';

export function createApiRouter(
  apiProvider: ApiProvider,
  cacheService: CacheService
): Router {
  const router = Router();

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

  router.get('/people', async (req: Request, res: Response<IApiResponse>) => {
    const data = await apiProvider.people.getList(req.query.search as string);

    res.json({
      success: true,
      data,
      message: 'Data retrieved successfully',
    });
  });

  router.get(
    '/people/:id',
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

  router.get('/movies', async (req: Request, res: Response<IApiResponse>) => {
    const data = await apiProvider.movie.getList(req.query.search as string);

    res.json({
      success: true,
      data,
      message: 'Data retrieved successfully',
    });
  });

  router.get(
    '/movies/:id',
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
