import { headers } from 'next/headers';
import crypto from 'crypto';

export async function getNonce(): Promise<string> {
  const headersList = await headers();
  return headersList.get('x-nonce') || '';
}

export function generateNonce(): string {
  return crypto.randomBytes(16).toString('base64');
}
