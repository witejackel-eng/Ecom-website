import { logger } from './logger';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function handleApiError(error: unknown, context?: string) {
  if (error instanceof AppError && error.isOperational) {
    // Expected error — log as warning
    logger.warn({ error: error.message, statusCode: error.statusCode, context }, 'Operational error');
    return { message: error.message, status: error.statusCode };
  }

  // Unexpected error — log full details server-side only
  logger.error({ error, context, stack: error instanceof Error ? error.stack : undefined }, 'Unexpected server error');

  // NEVER send internal details to client
  return { message: 'An unexpected error occurred. Please try again.', status: 500 };
}

// Safe error response for API routes
export function safeApiError(error: unknown, context?: string): NextResponse {
  const { message, status } = handleApiError(error, context);
  return NextResponse.json({ error: message }, { status });
}

// Type import for TypeScript compatibility
import { NextResponse } from 'next/server';
