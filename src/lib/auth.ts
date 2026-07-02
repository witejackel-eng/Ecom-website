import bcrypt from 'bcryptjs';

const BCRYPT_ROUNDS = 12; // Never lower than 12

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Secure cookie options
export const SECURE_COOKIE_OPTIONS = {
  httpOnly: true,           // Inaccessible to JavaScript
  secure: process.env.NODE_ENV === 'production', // HTTPS only in production
  sameSite: 'strict' as const, // CSRF protection
  maxAge: 60 * 60 * 24 * 7,    // 7 days max
  path: '/',
};

// For auth cookies specifically
export const AUTH_COOKIE_OPTIONS = {
  ...SECURE_COOKIE_OPTIONS,
  sameSite: 'lax' as const, // Use 'lax' if 'strict' breaks OAuth redirects
  maxAge: 60 * 60 * 24,      // 24 hours for session
};

// Anti-timing attack: always compare even if user not found
export async function safeAuthCheck(email: string, password: string, getUserByEmail: (email: string) => Promise<any | null>): Promise<boolean> {
  const user = await getUserByEmail(email);
  const DUMMY_HASH = '$2b$12$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  const hash = user?.passwordHash || DUMMY_HASH;
  const valid = await bcrypt.compare(password, hash);
  return valid && !!user;
}


