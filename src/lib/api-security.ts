import { NextRequest, NextResponse } from 'next/server';
import { ZodSchema, ZodError } from 'zod';
import { logger } from './logger';
import { logSecurityEvent } from './logger';

export type ApiHandler = (req: NextRequest, context?: any) => Promise<NextResponse>;

interface SecureApiOptions {
  requireAuth?: boolean;
  schema?: ZodSchema;
  allowedMethods?: string[];
  maxBodySize?: number; // bytes
}

export function secureApiRoute(handler: ApiHandler, options: SecureApiOptions = {}): ApiHandler {
  const {
    requireAuth = false,
    schema,
    allowedMethods = ['GET', 'POST'],
    maxBodySize = 1_048_576, // 1MB default
  } = options;

  return async (req: NextRequest, context?: any) => {
    try {
      // 1. Method check
      if (!allowedMethods.includes(req.method)) {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
      }

      // 2. Content-Type check for mutations
      if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        const ct = req.headers.get('content-type') || '';
        if (!ct.includes('application/json') && !ct.includes('multipart/form-data') && !ct.includes('application/x-www-form-urlencoded')) {
          return NextResponse.json({ error: 'Invalid content type' }, { status: 415 });
        }
      }

      // 3. Body size check
      const contentLength = req.headers.get('content-length');
      if (contentLength && parseInt(contentLength) > maxBodySize) {
        return NextResponse.json({ error: 'Request too large' }, { status: 413 });
      }

      // 4. Auth check
      if (requireAuth) {
        const sessionCookie = req.cookies.get('session') || req.cookies.get('next-auth.session-token');
        if (!sessionCookie?.value) {
          logger.warn({ url: req.url, method: req.method }, 'Unauthorized API access attempt');
          logSecurityEvent('unauthorized_api_access', {
            url: req.url,
            method: req.method,
            ip: req.headers.get('x-real-ip'),
          });
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
      }

      // 5. Body validation
      if (schema && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
        let body: unknown;
        try {
          body = await req.json();
        } catch {
          return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
        }
        const result = schema.safeParse(body);
        if (!result.success) {
          logSecurityEvent('validation_failed', {
            url: req.url,
            errors: result.error.flatten().fieldErrors,
            ip: req.headers.get('x-real-ip'),
          });
          return NextResponse.json(
            { error: 'Validation failed', details: result.error.flatten().fieldErrors },
            { status: 422 }
          );
        }
        // Attach validated body to request for handler use
        (req as any).validatedBody = result.data;
      }

      // 6. Call actual handler
      return await handler(req, context);
    } catch (error) {
      logger.error({ error, url: req.url }, 'Unhandled API error');
      // Never expose error details in production
      return NextResponse.json(
        { error: 'An unexpected error occurred. Please try again.' },
        { status: 500 }
      );
    }
  };
}

// Generic safe error response — never leaks internals
export function apiError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

// Generic success response
export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}
