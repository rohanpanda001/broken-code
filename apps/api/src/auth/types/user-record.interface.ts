/** Minimal DB user shape used within auth module before Prisma client is generated. */
export interface UserRecord {
  id: string;
  email: string;
  name: string | null;
  role: string;
  provider: string;
  providerAccountId: string | null;
  hashedPassword: string | null;
  createdAt: Date;
  updatedAt: Date;
}
