import { z } from 'zod';
import validator from 'validator';

// ─── Primitives ──────────────────────────────────────────────────────────────
export const safeString = (maxLen = 255) => z.string()
  .trim()
  .min(1, 'Required')
  .max(maxLen, `Maximum ${maxLen} characters`)
  .refine((s) => !/<[^>]*>/g.test(s), 'HTML tags are not allowed')
  .refine((s) => !s.includes('\0'), 'Invalid characters');

export const safeEmail = z.string()
  .trim()
  .toLowerCase()
  .max(254)
  .refine((v) => validator.isEmail(v), 'Invalid email address')
  .refine((v) => !v.includes('..'), 'Invalid email address');

export const safePhone = z.string()
  .trim()
  .refine((v) => validator.isMobilePhone(v, 'any', { strictMode: false }), 'Invalid phone number');

export const safeUrl = z.string()
  .trim()
  .url()
  .refine((v) => v.startsWith('https://'), 'Must be a secure HTTPS URL')
  .refine((v) => {
    try {
      const url = new URL(v);
      return !['localhost', '127.0.0.1', '0.0.0.0', '::1'].includes(url.hostname);
    } catch { return false; }
  }, 'Invalid URL');

export const safeId = z.union([
  z.string().uuid(),
  z.string().regex(/^[a-zA-Z0-9_-]{1,64}$/, 'Invalid ID format'),
  z.number().int().positive().max(2_147_483_647),
]);

export const safePassword = z.string()
  .min(12, 'Password must be at least 12 characters')
  .max(128, 'Password too long')
  .refine((p) => /[A-Z]/.test(p), 'Must contain an uppercase letter')
  .refine((p) => /[a-z]/.test(p), 'Must contain a lowercase letter')
  .refine((p) => /[0-9]/.test(p), 'Must contain a number')
  .refine((p) => /[^A-Za-z0-9]/.test(p), 'Must contain a special character');

// ─── Forms ───────────────────────────────────────────────────────────────────
export const ContactFormSchema = z.object({
  name: safeString(100),
  email: safeEmail,
  phone: safePhone.optional(),
  subject: safeString(150),
  message: safeString(2000),
  // Honeypot field — must be empty
  website: z.string().max(0, 'Spam detected').optional(),
  // Time-based anti-spam: form must be submitted at least 3 seconds after load
  formLoadTime: z.number().optional(),
});

export const QuoteRequestSchema = z.object({
  businessName: safeString(200),
  contactName: safeString(100),
  email: safeEmail,
  phone: safePhone,
  productInterest: safeString(500),
  quantity: z.number().int().min(1).max(100_000),
  message: safeString(3000),
  // Honeypot
  website: z.string().max(0, 'Spam detected').optional(),
});

export const LoginSchema = z.object({
  email: safeEmail,
  password: z.string().min(1, 'Password required').max(128),
});

export const RegisterSchema = z.object({
  name: safeString(100),
  email: safeEmail,
  password: safePassword,
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const AddressSchema = z.object({
  line1: safeString(200),
  line2: safeString(200).optional(),
  city: safeString(100),
  state: safeString(100),
  postcode: safeString(20).refine((v) => /^[A-Za-z0-9 \-]{2,10}$/.test(v), 'Invalid postcode'),
  country: z.string().length(2).regex(/^[A-Z]{2}$/, 'Invalid country code'),
});

export const SearchSchema = z.object({
  q: safeString(200).optional(),
  page: z.coerce.number().int().min(1).max(1000).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  category: safeString(100).optional(),
  sort: z.enum(['asc', 'desc', 'price_asc', 'price_desc', 'newest']).optional(),
});

// ─── Sanitizers ──────────────────────────────────────────────────────────────
export function sanitizeOutput(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export function stripHtml(dirty: string): string {
  return dirty.replace(/<[^>]*>/g, '').trim();
}

export function validateId(id: unknown): boolean {
  const result = safeId.safeParse(id);
  return result.success;
}

// ─── Anti-spam time check ─────────────────────────────────────────────────────
export function checkFormTiming(loadTime?: number): boolean {
  if (!loadTime) return true; // Optional field
  const elapsed = Date.now() - loadTime;
  return elapsed >= 3000; // At least 3 seconds must pass
}

// ─── SSRF prevention: validate URLs are not internal ─────────────────────────
const PRIVATE_IP_RANGES = [
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[01])\./,
  /^192\.168\./,
  /^::1$/,
  /^fc00:/,
  /^fe80:/,
  /^0\.0\.0\.0/,
  /^localhost$/i,
  /^metadata\.google\.internal$/i,
  /^169\.254\.169\.254/,
];

export function isSafeExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) return false;
    const hostname = parsed.hostname;
    return !PRIVATE_IP_RANGES.some((r) => r.test(hostname));
  } catch {
    return false;
  }
}
