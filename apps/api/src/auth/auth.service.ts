import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupCompanyDto } from './dto/signup-company.dto';
import { LoginDto } from './dto/login.dto';
import { UserRecord } from './types/user-record.interface';

type AuthProvider = 'GOOGLE' | 'GITHUB' | 'EMAIL';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // ─── Helpers ──────────────────────────────────────────────────────────────

  private issueToken(user: UserRecord): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
  }

  private safeUser(user: UserRecord) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword: _, ...safe } = user;
    return safe;
  }

  // ─── SSO (Candidates) ─────────────────────────────────────────────────────

  async findOrCreateSsoUser(params: {
    email: string;
    name?: string | null;
    provider: AuthProvider;
    providerAccountId: string;
  }) {
    const { email, name, provider, providerAccountId } = params;

    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          name,
          role: 'CANDIDATE',
          provider,
          providerAccountId,
          candidate: { create: {} },
        },
      });
    }

    return user;
  }

  async ssoLogin(user: UserRecord) {
    const token = this.issueToken(user);
    return { accessToken: token, user: this.safeUser(user) };
  }

  // ─── Email / Password (Companies) ────────────────────────────────────────

  async signupCompany(dto: SignupCompanyDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException('Email already registered');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        role: 'COMPANY',
        provider: 'EMAIL',
        hashedPassword,
        company: { create: { companyName: dto.companyName } },
      },
    });

    const token = this.issueToken(user);
    return { accessToken: token, user: this.safeUser(user) };
  }

  async loginCompany(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    }) as UserRecord | null;

    if (
      !user ||
      user.role !== 'COMPANY' ||
      !user.hashedPassword ||
      !(await bcrypt.compare(dto.password, user.hashedPassword))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.issueToken(user);
    return { accessToken: token, user: this.safeUser(user) };
  }

  // ─── Current User ─────────────────────────────────────────────────────────

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException();
    return this.safeUser(user);
  }
}
