// ─── Shared Assessment Types ──────────────────────────────────────────────────

export interface EvaluationResult {
  score: number;
  feedback: string;
}

export interface AttemptResponse {
  id: string;
  questionId: string;
  candidateId: string;
  score: number | null;
  createdAt: string;
}

// ─── Shared Auth Types ────────────────────────────────────────────────────────

export type UserRole = 'CANDIDATE' | 'COMPANY';
export type AuthProvider = 'GOOGLE' | 'GITHUB' | 'EMAIL';

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  provider: AuthProvider;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

export interface SignupCompanyDto {
  email: string;
  password: string;
  companyName: string;
  name?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
