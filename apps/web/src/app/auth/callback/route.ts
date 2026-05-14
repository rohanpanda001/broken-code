import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { createSession } from '@/lib/session';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/auth/candidate/login?error=missing_token', request.url));
  }

  // Verify the JWT issued by NestJS using the shared JWT_SECRET
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET ?? 'fallback-secret',
  );

  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256'],
    });

    await createSession({
      userId: payload.sub as string,
      email: payload.email as string,
      role: payload.role as 'CANDIDATE' | 'COMPANY',
    });

    return NextResponse.redirect(new URL('/practice', request.url));
  } catch {
    return NextResponse.redirect(
      new URL('/auth/candidate/login?error=invalid_token', request.url),
    );
  }
}
