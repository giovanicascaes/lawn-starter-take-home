import type { Request, Response } from 'express';
import type { IApiResponse } from '../../index.types';
import type { IAppError } from './error-interceptor.types';

export class CustomError extends Error implements IAppError {
  public statusCode: number;
  public isOperational: boolean;
  public code?: string;

  constructor(message: string, statusCode: number = 500, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends CustomError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string = 'Forbidden access') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class ConflictError extends CustomError {
  constructor(message: string = 'Resource conflict') {
    super(message, 409, 'CONFLICT');
  }
}

export class RateLimitError extends CustomError {
  constructor(message: string = 'Too many requests') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
  }
}

export function errorInterceptor(
  error: IAppError,
  req: Request,
  res: Response<IApiResponse>
): void {
  // Log error for debugging
  console.error('Error intercepted:', {
    message: error.message,
    stack: error.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
  });

  // Determine status code
  const statusCode = error.statusCode ?? 500;

  // Determine if error is operational (expected) or programming error
  const isOperational = error.isOperational !== false;

  // Don't expose internal error details in production for non-operational errors
  const isProduction = process.env.NODE_ENV === 'production';

  let errorMessage = error.message;
  let errorCode = error.code;

  // Handle different types of errors
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    errorMessage = 'Invalid data provided';
    errorCode = 'VALIDATION_ERROR';
  } else if (error.name === 'JsonWebTokenError') {
    errorMessage = 'Invalid token';
    errorCode = 'INVALID_TOKEN';
  } else if (error.name === 'TokenExpiredError') {
    errorMessage = 'Token expired';
    errorCode = 'TOKEN_EXPIRED';
  } else if (error.name === 'SyntaxError' && error.message.includes('JSON')) {
    errorMessage = 'Invalid JSON format';
    errorCode = 'INVALID_JSON';
  } else if (error.name === 'MulterError') {
    errorMessage = 'File upload error';
    errorCode = 'FILE_UPLOAD_ERROR';
  }

  // In production, don't expose internal error details for non-operational errors
  if (isProduction && !isOperational) {
    errorMessage = 'An unexpected error occurred';
    errorCode = 'INTERNAL_ERROR';
  }

  // Send formatted error response
  res.status(statusCode).json({
    success: false,
    error: errorCode ?? 'UNKNOWN_ERROR',
    message: errorMessage,
    ...(process.env.NODE_ENV === 'development' && {
      debug: {
        stack: error.stack,
        url: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString(),
      },
    }),
  });
}

export function notFoundHandler(
  req: Request,
  res: Response<IApiResponse>
): void {
  res.status(404).json({
    success: false,
    error: 'NOT_FOUND',
    message: `The route ${req.originalUrl} does not exist`,
  });
}
