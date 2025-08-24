import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import type { IApiConfig, IServerConfig } from './index.types';
import {
  errorInterceptor,
  notFoundHandler,
} from './middleware/error-interceptor/error-interceptor';
import { createApiRouter } from './routes/api';
import { ApiProvider } from './services/api-provider';
import { CacheService } from './services/cache-service/cache.service';

// Load environment variables
dotenv.config();

// Configuration
const serverConfig: IServerConfig = {
  port: parseInt(process.env.PORT ?? '3001'),
  host: process.env.HOST ?? '0.0.0.0',
  cors: {
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true,
  },
};

const swApiConfig: IApiConfig = {
  baseUrl: process.env.SW_API_URL ?? 'https://www.swapi.tech/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Initialize services
const cacheService = new CacheService({
  ttl: 300, // 5 minutes default TTL
  checkperiod: 600, // Check every 10 minutes
});

const apiProvider = new ApiProvider(swApiConfig, cacheService);

// Create Express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors(serverConfig.cors));
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api', createApiRouter(apiProvider, cacheService));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Lawn Starter Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      people: '/api/people',
      peopleById: '/api/people/:id',
      movies: '/api/movies',
      moviesById: '/api/movies/:id',
      cacheStats: '/api/cache/stats',
      clearCache: '/api/cache/clear',
      demoErrors: '/api/demo/error/:type',
    },
  });
});

// 404 handler
app.use(notFoundHandler);

// Error interceptor middleware
app.use(errorInterceptor);

// Start server
app.listen(serverConfig.port, serverConfig.host, () => {
  console.log(
    `🚀 Backend server running on http://${serverConfig.host}:${serverConfig.port}`
  );
  console.log(`📊 Cache service initialized with TTL: 300s`);
  console.log(`🌐 CORS enabled for origin: ${serverConfig.cors.origin}`);
  console.log(`🔗 Star Wars API: ${swApiConfig.baseUrl}`);
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
