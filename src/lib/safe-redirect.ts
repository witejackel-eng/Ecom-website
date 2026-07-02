const ALLOWED_HOSTS = [
  process.env.NEXT_PUBLIC_SITE_URL,
  'devicedestination.com',
  'www.devicedestination.com',
  'localhost',
  '127.0.0.1',
].filter(Boolean);

export function isSafeRedirectUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith('/')) return true; // Relative paths are safe

  try {
    const parsed = new URL(url);
    return ALLOWED_HOSTS.some((host) => parsed.hostname === host);
  } catch {
    return false;
  }
}

export function safeRedirect(url: string, fallback = '/'): string {
  return isSafeRedirectUrl(url) ? url : fallback;
}
