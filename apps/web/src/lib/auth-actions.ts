'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createSession, deleteSession } from './session';
import type { LoginResponse } from '../types/auth';

const API_URL = process.env.API_URL ?? 'http://localhost:3000';

// ─── Schemas ──────────────────────────────────────────────────────────────────

const SignupSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  companyName: z.string().min(1),
  name: z.string().optional(),
});

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type AuthActionState =
  | { errors?: Record<string, string[]>; message?: string }
  | undefined;

// ─── Company Signup ───────────────────────────────────────────────────────────

export async function signupCompany(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = SignupSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    companyName: formData.get('companyName'),
    name: formData.get('name'),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const res = await fetch(`${API_URL}/auth/company/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return { message: body.message ?? 'Signup failed. Please try again.' };
  }

  const data: LoginResponse = await res.json();
  await createSession({
    userId: data.user.id,
    email: data.user.email,
    role: data.user.role,
  });

  redirect('/dashboard');
}

// ─── Company Login ────────────────────────────────────────────────────────────

export async function loginCompany(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const res = await fetch(`${API_URL}/auth/company/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  });

  if (!res.ok) {
    return { message: 'Invalid email or password.' };
  }

  const data: LoginResponse = await res.json();
  await createSession({
    userId: data.user.id,
    email: data.user.email,
    role: data.user.role,
  });

  redirect('/dashboard');
}

// ─── Logout ───────────────────────────────────────────────────────────────────

export async function logout() {
  await deleteSession();
  redirect('/');
}
