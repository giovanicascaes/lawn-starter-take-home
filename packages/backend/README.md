# Backend API with Error Interceptor and Statistics Service

This backend provides a comprehensive error handling system with an Express error interceptor middleware and a real-time statistics tracking service.

## Error Interceptor Features

### 1. Centralized Error Handling

All errors are automatically caught and formatted by the `errorInterceptor` middleware, providing consistent error responses across the API.

### 2. Custom Error Classes

The system includes predefined error classes for common HTTP status codes:

- `ValidationError` (400) - For invalid input data
- `UnauthorizedError` (401) - For authentication failures
- `ForbiddenError` (403) - For authorization failures
- `NotFoundError` (404) - For missing resources
- `ConflictError` (409) - For resource conflicts
- `RateLimitError` (429) - For rate limiting violations
- `CustomError` - For custom error scenarios

### 3. Automatic Error Logging

All errors are automatically logged with detailed information including:

- Error message and stack trace
- Request URL, method, and IP
- User agent and timestamp
- Environment-specific debugging information

### 4. Production-Safe Error Messages

In production mode, internal error details are hidden from clients while maintaining useful error codes and messages.

## Usage Examples

### Throwing Custom Errors

```typescript
import {
  ValidationError,
  NotFoundError,
  CustomError,
} from '../middleware/error-interceptor.js';

// In your route handlers
if (!user) {
  throw new NotFoundError('User not found');
}

if (!isValid) {
  throw new ValidationError('Invalid input data');
}

// Custom error with specific status code
throw new CustomError('Custom error message', 422, 'CUSTOM_ERROR_CODE');
```

### Error Response Format

All errors return a consistent format:

```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human-readable error message"
}
```

In development mode, additional debug information is included:

```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human-readable error message",
  "debug": {
    "stack": "Error stack trace",
    "url": "/api/endpoint",
    "method": "GET",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

## API Endpoints

### Core Endpoints

- `GET /api/health` - Health check with cache statistics
- `GET /api/people` - List of people with optional search
- `GET /api/people/:id` - Get person by ID
- `GET /api/movies` - List of movies with optional search
- `GET /api/movies/:id` - Get movie by ID

### Cache Management

- `GET /api/cache/stats` - Cache statistics
- `DELETE /api/cache/clear` - Clear cache with optional pattern

### Statistics

- `GET /api/statistics` - Top 5 requests with percentages (auto-updated every 5 minutes)

### Demo Endpoints

Test the error handling system with these demo endpoints:

- `GET /api/demo/error/validation` - 400 Validation Error
- `GET /api/demo/error/not-found` - 404 Not Found Error
- `GET /api/demo/error/unauthorized` - 401 Unauthorized Error
- `GET /api/demo/error/forbidden` - 403 Forbidden Error
- `GET /api/demo/error/conflict` - 409 Conflict Error
- `GET /api/demo/error/rate-limit` - 429 Rate Limit Error
- `GET /api/demo/error/server` - 500 Server Error

## Environment Variables

- `NODE_ENV` - Set to 'production' to hide debug information from error responses

## Middleware Order

The error interceptor middleware is registered after all routes to catch any unhandled errors:

1. Application middleware (helmet, cors, compression, etc.)
2. API routes with request tracking middleware
3. 404 handler
4. Error interceptor (catches all errors)

This ensures that all errors, whether thrown in routes or occurring in middleware, are properly formatted and returned to clients.

## Statistics Service

The backend includes a comprehensive statistics service that:

- **Automatically tracks** all API requests
- **Provides real-time insights** into endpoint usage patterns
- **Recomputes statistics** every 5 minutes using an event-driven queue system
- **Requires no configuration** - works out of the box

For detailed documentation, see [STATISTICS.md](./STATISTICS.md).
