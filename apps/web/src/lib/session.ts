import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'bc_session';
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecretKey() {
  const secret = process.env.SESSION_SECRET ?? 'fallback-dev-secret-min-32-chars!!';
  return new TextEncoder().encode(secret);
}

export interface SessionPayload {
  userId: string;
  email: string;
  role: 'CANDIDATE' | 'COMPANY';
  exp?: number;
}

// ─── Encrypt / Decrypt ────────────────────────────────────────────────────────

export async function encryptSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecretKey());
}

export async function decryptSession(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ['HS256'],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

// ─── Cookie Helpers ───────────────────────────────────────────────────────────

/** Called after successful login to set the encrypted session cookie. */
export async function createSession(payload: SessionPayload): Promise<void> {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const token = await encryptSession(payload);
  const store = await cookies();

  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });
}

/** Returns the decoded session or null if missing / expired. */
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  return decryptSession(raw);
}

/** Deletes the session cookie (logout). */
export async function deleteSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
