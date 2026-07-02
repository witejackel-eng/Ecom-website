import DOMPurify from 'isomorphic-dompurify';
import xss from 'xss';

// Strict DOMPurify configuration
export const DOMPURIFY_CONFIG = {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'a', 'span', 'div'],
  ALLOWED_ATTR: ['href', 'title', 'rel', 'class'],
  ALLOW_DATA_ATTR: false,
  FORCE_BODY: true,
  ADD_ATTR: ['target'],
  FORBID_SCRIPTS: true,
  ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
};

// Sanitize HTML content
export function sanitizeHtml(dirty: string): string {
  if (!dirty) return '';
  return DOMPurify.sanitize(dirty, DOMPURIFY_CONFIG);
}

// Strip all HTML tags
export function stripHtml(dirty: string): string {
  if (!dirty) return '';
  return dirty.replace(/<[^>]*>/g, '').trim();
}

// Sanitize for JSON-LD (server-side only, no user input in JSON-LD typically)
export function sanitizeJsonLd(data: unknown): string {
  // JSON.stringify is safe for structured data
  return JSON.stringify(data);
}

// XSS prevention for user input
export function escapeHtml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Alternative XSS library sanitizer
export function sanitizeWithXss(html: string): string {
  if (!html) return '';
  return xss(html, {
    whiteList: {} as Record<string, string[]>, // No tags allowed by default
    // @ts-ignore
    stripTag: ['script', 'iframe', 'form', 'input'],
  });
}
