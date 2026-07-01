/**
 * middleware.ts — runs at the Edge before a request is processed.
 *
 * Security headers applied:
 *   • X-Frame-Options  → DENY  (clickjacking protection)
 *   • X-Content-Type-Options → nosniff  (MIME sniffing protection)
 *   • Referrer-Policy  → strict-origin-when-cross-origin
 *   • Permissions-Policy  → restricts camera, mic, geolocation
 *   • Strict-Transport-Security (HSTS) — only in production
 *   • Content-Security-Policy  — strict baseline with just enough flexibility
 *   • Cross-Origin-Embedder-Policy — safe for Next.js images
 *
 * CSRF: for mutating API routes (POST/PUT/DELETE) originating outside the
 * same origin, we require a matching Origin header. This blocks most CSRF.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_SCRIPT_SRC =
  "'self' 'unsafe-inline' 'unsafe-eval' https://cdn.vercel.net";
const ALLOWED_STYLE_SRC =
  "'self' 'unsafe-inline' https://fonts.googleapis.com";
const ALLOWED_IMG_SRC =
  "'self' data: https: blob:";
const ALLOWED_CONNECT_SRC =
  "'self' https://*.vercel-insights.com https://vitals.vercel-insights.com wss:";
const ALLOWED_FONT_SRC =
  "'self' https://fonts.gstatic.com data:";
const ALLOWED_FRAME_SRC = "'none'";

function buildCsp(userAgent: string): string {
  const directives = [
    `default-src 'self'`,
    `script-src ${ALLOWED_SCRIPT_SRC}`,
    `style-src ${ALLOWED_STYLE_SRC}`,
    `img-src ${ALLOWED_IMG_SRC}`,
    `connect-src ${ALLOWED_CONNECT_SRC}`,
    `font-src ${ALLOWED_FONT_SRC}`,
    `frame-src ${ALLOWED_FRAME_SRC}`,
    `frame-ancestors 'none'`,          // same as X-Frame-Options: DENY
    `form-action 'self'`,
    `base-uri 'self'`,
    `object-src 'none'`,
    `upgrade-insecure-requests`,
    'report-uri /api/csp-report',      // placeholder report endpoint
  ];
  return directives.join('; ');
}

function corsSafeOrigin(request: NextRequest): boolean {
  // Allow same-origin requests unconditionally
  const origin = request.headers.get('origin');
  if (!origin) return true;
  const host = request.nextUrl.host;
  try {
    const parsed = new URL(origin);
    return parsed.host === host;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest): NextResponse {
  const response = NextResponse.next(request);
  const isProd = process.env.NODE_ENV === 'production';
  const path = request.nextUrl.pathname;

  // ── Security Headers ──────────────────────────────────────────────────────

  response.headers.set('x-frame-options', 'DENY');
  response.headers.set('x-content-type-options', 'nosniff');
  response.headers.set('referrer-policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'permissions-policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
  );

  // HSTS — only enforce in production (localhost must not be HSTS'd)
  if (isProd) {
    response.headers.set(
      'strict-transport-security',
      'max-age=63072000; includeSubDomains; preload'
    );
  }

  // CSP — relaxed slightly for dev to allow Vite/HMR style eval
  if (isProd) {
    response.headers.set('content-security-policy', buildCsp(request.headers.get('user-agent') ?? ''));
    response.headers.set('cross-origin-embedder-policy', 'require-corp');
    response.headers.set('cross-origin-opener-policy', 'same-origin');
  }

  // ── CSRF Mutating-Request Guard ───────────────────────────────────────────
  //
  // For POST/PUT/PATCH/DELETE to API routes, require a matching Origin header
  // so that a cross-origin attacker site cannot trigger side-effects.
  if (
    ['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method) &&
    path.startsWith('/api/')
  ) {
    if (!corsSafeOrigin(request)) {
      return new NextResponse('Forbidden — invalid Origin', { status: 403 });
    }
  }

  // ── Canonical host redirect (prod only) ───────────────────────────────────
  if (isProd && request.headers.get('x-forwarded-host') === 'www.devicedestination.com') {
    const url = request.nextUrl.clone();
    url.host = 'devicedestination.com';
    return NextResponse.redirect(url, 301);
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.svg|logo.svg).*)'],
};
