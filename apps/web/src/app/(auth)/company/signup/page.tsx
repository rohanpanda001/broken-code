'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import Logo from '@/components/Logo';
import { signupCompany, AuthActionState } from '@/lib/auth-actions';

export default function CompanySignupPage() {
  const [state, action, pending] = useActionState<AuthActionState, FormData>(
    signupCompany,
    undefined,
  );

  return (
    <div className="flex-1 bg-charcoal flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-10">
          <Link href="/">
            <Logo size="md" />
          </Link>
        </div>

        <div className="bg-cloud/5 border border-cloud/10 rounded-xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-cloud mb-1 text-center">
            Create Company Account
          </h1>
          <p className="text-cloud/50 text-sm text-center mb-8">
            Start assessing candidates with AI precision
          </p>

          {state?.message && (
            <div className="mb-6 p-3 bg-orange/10 border border-orange/30 rounded-md text-orange text-sm">
              {state.message}
            </div>
          )}

          <form action={action} className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-cloud/70 mb-1.5">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jane Smith"
                className="w-full px-4 py-3 rounded-md bg-charcoal border border-cloud/20 text-cloud placeholder:text-cloud/30 focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric"
              />
            </div>

            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-cloud/70 mb-1.5">
                Company Name <span className="text-orange">*</span>
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                required
                placeholder="Acme Corp"
                className="w-full px-4 py-3 rounded-md bg-charcoal border border-cloud/20 text-cloud placeholder:text-cloud/30 focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric"
              />
              {state?.errors?.companyName && (
                <p className="mt-1 text-xs text-orange">{state.errors.companyName[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-cloud/70 mb-1.5">
                Work Email <span className="text-orange">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-md bg-charcoal border border-cloud/20 text-cloud placeholder:text-cloud/30 focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric"
              />
              {state?.errors?.email && (
                <p className="mt-1 text-xs text-orange">{state.errors.email[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-cloud/70 mb-1.5">
                Password <span className="text-orange">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Min 8 characters"
                className="w-full px-4 py-3 rounded-md bg-charcoal border border-cloud/20 text-cloud placeholder:text-cloud/30 focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric"
              />
              {state?.errors?.password && (
                <p className="mt-1 text-xs text-orange">{state.errors.password[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full py-3 bg-electric text-charcoal font-bold rounded-md hover:bg-electric/90 disabled:opacity-50 transition-all mt-2 shadow-[0_0_15px_rgba(64,224,255,0.2)]"
            >
              {pending ? 'Creating Account…' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-cloud/10 text-center text-sm text-cloud/50">
            Already have an account?{' '}
            <Link href="/auth/company/login" className="text-electric hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
