import { NextRequest, NextResponse } from 'next/server';
import { generateCsrfToken } from '@/lib/csrf';

export async function GET(req: NextRequest) {
  try {
    const response = NextResponse.json({ success: true });
    const token = generateCsrfToken(req, response);
    response.headers.set('x-csrf-token', token);
    return response;
  } catch (error) {
    console.error('CSRF token generation error:', error);
    return NextResponse.json({ error: 'Failed to generate CSRF token' }, { status: 500 });
  }
}
