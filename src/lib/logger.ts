import pino from 'pino';
import type { Logger } from 'pino';

const isDev = process.env.NODE_ENV === 'development';

export const logger: Logger = pino({
  level: process.env.LOG_LEVEL || (isDev ? 'debug' : 'warn'),
  // Never log these fields
  redact: {
    paths: [
      'password',
      'passwordHash',
      'token',
      'secret',
      'authorization',
      'cookie',
      'creditCard',
      'cardNumber',
      'cvv',
      'ssn',
      'nationalId',
      'body.password',
      'body.token',
      'headers.authorization',
      'headers.cookie',
      'req.headers.authorization',
      'req.headers.cookie',
      '*.password',
      '*.token',
      '*.secret',
    ],
    censor: '[REDACTED]',
  },
  ...(isDev ? { transport: { target: 'pino-pretty' } } : {}),
});

// Auth-specific logging
export const authLogger = logger.child({ module: 'auth' });

// API-specific logging
export const apiLogger = logger.child({ module: 'api' });

// Security event logging
export const securityLogger = logger.child({ module: 'security' });

// Log security events (failed logins, rate limits, suspicious requests)
export function logSecurityEvent(event: string, details: Record<string, unknown>) {
  securityLogger.warn({ event, ...details, timestamp: new Date().toISOString() }, `Security event: ${event}`);
}
