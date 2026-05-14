export type UserRole = 'CANDIDATE' | 'COMPANY';

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}
