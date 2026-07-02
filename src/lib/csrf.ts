import { doubleCsrf } from 'csrf-csrf';
import type { NextRequest } from 'next/server';

const { generateCsrfToken, validateRequest } = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET ?? (() => { throw new Error('CSRF_SECRET env var is not set'); })(),
  cookieName: process.env.NODE_ENV === 'production' ? '__Host-csrf' : 'csrf',
  cookieOptions: {
    httpOnly: true,
    sameSite: 'strict' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  },
  size: 64,
  getSessionIdentifier: (req: Request) => {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) return 'anonymous';

    const cookies = Object.fromEntries(
      cookieHeader.split(';').map(c => {
        const [key, ...valueParts] = c.trim().split('=');
        return [key, valueParts.join('=')];
      })
    );

    return cookies['__Host-csrf'] || cookies['csrf'] || 'anonymous';
  },
  getCsrfTokenFromRequest: (req: NextRequest) => {
    // Accept token from header or body
    return (
      (req.headers.get('x-csrf-token') ?? '') ||
      (req.headers.get('csrf-token') ?? '')
    );
  },
});

export { generateCsrfToken, validateRequest };
