import { Router } from 'express';
import type { Request, Response } from 'express';
import { ExternalApiService } from '../services/external-api.service.js';
import { CacheService } from '../services/cache.service.js';
import type { ApiResponse } from '../types/index.js';

export function createApiRouter(externalApiService: ExternalApiService, cacheService: CacheService): Router {
  const router = Router();

  // Health check endpoint
  router.get('/health', (req: Request, res: Response<ApiResponse>) => {
    res.json({
      success: true,
      message: 'Backend is healthy',
      data: {
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        cache: cacheService.getStats()
      }
    });
  });

  // Example endpoint that fetches data from external API with caching
  router.get('/external-data', async (req: Request, res: Response<ApiResponse>) => {
    try {
      const cacheKey = 'external-data';
      const data = await externalApiService.get(
        '',
        cacheKey,
        300 // Cache for 5 minutes
      );

      res.json({
        success: true,
        data,
        message: 'Data retrieved successfully'
      });
    } catch (error) {
      console.error('Error fetching external data:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch external data',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Cache management endpoints
  router.get('/cache/stats', (req: Request, res: Response<ApiResponse>) => {
    res.json({
      success: true,
      data: cacheService.getStats(),
      message: 'Cache statistics retrieved'
    });
  });

  router.delete('/cache/clear', (req: Request, res: Response<ApiResponse>) => {
    const pattern = req.query.pattern as string;
    externalApiService.clearCache(pattern);
    
    res.json({
      success: true,
      message: pattern ? `Cache cleared for pattern: ${pattern}` : 'All cache cleared'
    });
  });

  return router;
}
