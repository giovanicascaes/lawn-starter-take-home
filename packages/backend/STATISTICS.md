# Statistics Service Documentation

## Overview

The Statistics Service provides real-time tracking of API request patterns and automatically recomputes statistics every 5 minutes using an event-driven queue system.

## Features

- **Real-time Request Tracking**: Automatically tracks all API requests
- **Top 5 Requests**: Returns the most frequently accessed endpoints with percentages
- **Automatic Recomputation**: Statistics are recalculated every 5 minutes
- **Memory Efficient**: Uses in-memory storage with automatic cleanup
- **Production Ready**: Includes proper error handling and graceful shutdown

## API Endpoints

### GET /api/statistics

Returns the top 5 most requested endpoints with their counts and percentages.

**Response Format:**

```json
{
  "success": true,
  "data": {
    "topRequests": [
      {
        "endpoint": "GET /health",
        "count": 7,
        "percentage": "43.75"
      },
      {
        "endpoint": "GET /statistics",
        "count": 3,
        "percentage": "18.75"
      }
    ],
    "totalRequests": 16,
    "lastUpdated": "2025-08-26T03:38:33.684Z",
    "nextRecomputation": "2025-08-26T03:43:33.684Z"
  },
  "message": "Top 5 requests statistics retrieved"
}
```

## Architecture

### Components

1. **StatisticsService** (`src/services/statistics-service/`)
   - Core service that tracks requests and manages statistics
   - Handles periodic recomputation every 5 minutes
   - Provides methods for retrieving and resetting statistics

2. **Request Tracker Middleware** (`src/middleware/request-tracker/`)
   - Automatically tracks all API requests
   - Integrates seamlessly with existing Express routes
   - No manual tracking required

3. **Queue System**
   - Uses Node.js `setInterval` for periodic recomputation
   - Event-driven architecture for scalability
   - Automatic cleanup on process termination

### Data Flow

```
API Request → Request Tracker Middleware → Statistics Service → In-Memory Storage
                                                                    ↓
                                                            5-Minute Timer
                                                                    ↓
                                                            Recomputation Event
                                                                    ↓
                                                            Log Statistics
```

## Configuration

### Recomputation Interval

The statistics are automatically recomputed every 5 minutes (300,000 ms). This can be modified in the `StatisticsService` constructor:

```typescript
private readonly RECOMPUTATION_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
```

### Memory Management

- Statistics are stored in memory using `Map<string, number>`
- Automatic cleanup on process exit (SIGINT, SIGTERM)
- No persistent storage (can be extended for production use)

## Usage Examples

### Basic Statistics Retrieval

```bash
curl http://localhost:3001/api/statistics
```

### Monitoring Request Patterns

The service automatically tracks:

- HTTP method + endpoint path
- Request counts
- Percentage calculations
- Timestamps for updates and next recomputation

### Integration with Existing Endpoints

All existing API endpoints automatically contribute to statistics:

- `/api/health`
- `/api/people`
- `/api/movies`
- `/api/cache/*`
- `/api/demo/*`

## Production Considerations

### Scaling

For production environments, consider:

1. **Database Persistence**: Store statistics in Redis or PostgreSQL
2. **Distributed Tracking**: Use message queues (RabbitMQ, Kafka) for multi-instance deployments
3. **Metrics Export**: Integrate with Prometheus, Grafana, or similar monitoring tools
4. **Alerting**: Set up alerts for unusual request patterns

### Monitoring

The service logs recomputation events:

```
📊 Recomputing statistics at 2025-08-26T03:42:45.641Z
📈 Current top requests: [...]
```

### Performance

- **Memory Usage**: Minimal overhead (~1KB per unique endpoint)
- **CPU Impact**: Negligible during normal operation
- **Network**: No external dependencies or network calls

## Testing

The service can be tested by:

1. Making requests to various endpoints
2. Checking the `/api/statistics` endpoint
3. Monitoring server logs for recomputation events
4. Verifying percentage calculations

## Future Enhancements

Potential improvements:

1. **Time-based Analytics**: Track requests by hour/day
2. **Response Time Tracking**: Monitor endpoint performance
3. **Error Rate Monitoring**: Track failed requests
4. **User Agent Analysis**: Identify client patterns
5. **Geographic Distribution**: Track request origins
6. **Custom Metrics**: Allow custom tracking parameters

## Troubleshooting

### Common Issues

1. **Statistics Not Updating**: Check if the service is properly initialized
2. **Memory Leaks**: Ensure proper cleanup on process termination
3. **Incorrect Percentages**: Verify total request count accuracy

### Debug Mode

Enable additional logging by modifying the `recomputeStatistics` method in `StatisticsService`.

## Dependencies

- **Node.js**: >=18.0.0
- **Express**: ^5.1.0
- **TypeScript**: ^5.8.3

No additional external dependencies required.
