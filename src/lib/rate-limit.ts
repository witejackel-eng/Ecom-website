import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';
import { logSecurityEvent } from './logger';

// Lazily initialise so missing env vars don't crash the build
let redis: Redis | null = null;
let limiters: Record<string, Ratelimit> = {};

function getRedis(): Redis {
  if (!redis) {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      throw new Error('UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set');
    }
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  return redis;
}

// Limiter configurations — requests per window
const LIMITER_CONFIGS: Record<string, { requests: number; window: string }> = {
  auth:       { requests: 5,   window: '1 m'  }, // Login, register, forgot-password
  contact:    { requests: 3,   window: '1 m'  }, // Contact form
  quote:      { requests: 3,   window: '1 m'  }, // Quote requests
  search:     { requests: 30,  window: '1 m'  }, // Search endpoint
  api:        { requests: 60,  window: '1 m'  }, // General API
  global:     { requests: 120, window: '1 m'  }, // Everything else
};

function getLimiter(name: string): Ratelimit {
  if (!limiters[name]) {
    const config = LIMITER_CONFIGS[name] ?? LIMITER_CONFIGS.global;
    limiters[name] = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.slidingWindow(config.requests, config.window as any),
      prefix: `rl:${name}`,
    });
  }
  return limiters[name];
}

function getLimiterName(pathname: string): string {
  if (pathname.match(/\/api\/auth\/(login|register|forgot-password|reset-password)/)) return 'auth';
  if (pathname.startsWith('/api/contact')) return 'contact';
  if (pathname.startsWith('/api/quote'))   return 'quote';
  if (pathname.startsWith('/api/search'))  return 'search';
  if (pathname.startsWith('/api/'))        return 'api';
  return 'global';
}

export function getRealIp(req: NextRequest): string {
  return (
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    '127.0.0.1'
  );
}

export async function checkRateLimit(
  req: NextRequest
): Promise<NextResponse | null> {
  const ip = getRealIp(req);
  const pathname = req.nextUrl.pathname;
  const limiterName = getLimiterName(pathname);

  try {
    const limiter = getLimiter(limiterName);
    const { success, limit, remaining, reset } = await limiter.limit(ip);

    if (!success) {
      logSecurityEvent('rate_limit_exceeded', { ip, pathname, limiterName });
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(reset),
          },
        }
      );
    }
    return null; // Not rate limited
  } catch (err) {
    // If Redis is unavailable, fail open (don't block users) but log it
    logSecurityEvent('rate_limit_redis_error', { ip, pathname, error: String(err) });
    return null;
  }
}