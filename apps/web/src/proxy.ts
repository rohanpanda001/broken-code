import { NextRequest, NextResponse } from 'next/server';
import { decryptSession } from '@/lib/session';

const CANDIDATE_PATHS = ['/practice'];
const COMPANY_PATHS = ['/dashboard'];
const AUTH_PATHS = ['/auth'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read the session cookie
  const raw = request.cookies.get('bc_session')?.value;
  const session = raw ? await decryptSession(raw) : null;

  const isAuthed = !!session;
  const isCandidate = session?.role === 'CANDIDATE';
  const isCompany = session?.role === 'COMPANY';

  // Redirect logged-in users away from auth pages
  const isAuthPage = AUTH_PATHS.some((p) => pathname.startsWith(p));
  if (isAuthPage && isAuthed) {
    const dest = isCompany ? '/dashboard' : '/practice';
    return NextResponse.redirect(new URL(dest, request.url));
  }

  // Protect candidate routes
  const isCandidatePath = CANDIDATE_PATHS.some((p) => pathname.startsWith(p));
  if (isCandidatePath && !isCandidate) {
    return NextResponse.redirect(
      new URL('/auth/candidate/login', request.url),
    );
  }

  // Protect company routes
  const isCompanyPath = COMPANY_PATHS.some((p) => pathname.startsWith(p));
  if (isCompanyPath && !isCompany) {
    return NextResponse.redirect(
      new URL('/auth/company/login', request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/practice/:path*', '/dashboard/:path*', '/auth/:path*'],
};
