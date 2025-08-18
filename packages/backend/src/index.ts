import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';

import { createApiRouter } from './routes/api.js';
import { CacheService } from './services/cache.service.js';
import { ExternalApiService } from './services/external-api.service.js';
import type { ServerConfig, ExternalApiConfig } from './types/index.js';

// Load environment variables
dotenv.config();

// Configuration
const config: ServerConfig = {
  port: parseInt(process.env.PORT || '3001'),
  host: process.env.HOST || '0.0.0.0',
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  }
};

const externalApiConfig: ExternalApiConfig = {
  baseUrl: process.env.EXTERNAL_API_URL || 'https://www.swapi.tech/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Initialize services
const cacheService = new CacheService({
  ttl: 300, // 5 minutes default TTL
  checkperiod: 600 // Check every 10 minutes
});

const externalApiService = new ExternalApiService(externalApiConfig, cacheService);

// Create Express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors(config.cors));
app.use(compression() as any);
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api', createApiRouter(externalApiService, cacheService));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Lawn Starter Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      externalData: '/api/external-data',
      cacheStats: '/api/cache/stats',
      clearCache: '/api/cache/clear'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `The route ${req.originalUrl} does not exist`
  });
});

// Error handler
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: error.message
  });
});

// Start server
app.listen(config.port, config.host, () => {
  console.log(`🚀 Backend server running on http://${config.host}:${config.port}`);
  console.log(`📊 Cache service initialized with TTL: 300s`);
  console.log(`🌐 CORS enabled for origin: ${config.cors.origin}`);
  console.log(`🔗 External API: ${externalApiConfig.baseUrl}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});
