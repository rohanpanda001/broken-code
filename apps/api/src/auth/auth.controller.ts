import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { SignupCompanyDto } from './dto/signup-company.dto';
import { LoginDto } from './dto/login.dto';
import {
  GoogleOAuthGuard,
  GithubOAuthGuard,
  JwtAuthGuard,
} from './guards/auth.guards';
import { UserRecord } from './types/user-record.interface';

interface RequestWithUser extends Request {
  user: UserRecord;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ─── Company Email/Password ──────────────────────────────────────────────

  @Post('company/signup')
  signup(@Body(ValidationPipe) dto: SignupCompanyDto) {
    return this.authService.signupCompany(dto);
  }

  @Post('company/login')
  login(@Body(ValidationPipe) dto: LoginDto) {
    return this.authService.loginCompany(dto);
  }

  // ─── Google SSO ──────────────────────────────────────────────────────────

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  googleAuth() {
    // Guard redirects to Google consent screen
  }

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleCallback(
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ) {
    const { accessToken } = await this.authService.ssoLogin(req.user);
    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3001';
    res.redirect(`${frontendUrl}/auth/callback?token=${accessToken}`);
  }

  // ─── GitHub SSO ──────────────────────────────────────────────────────────

  @Get('github')
  @UseGuards(GithubOAuthGuard)
  githubAuth() {
    // Guard redirects to GitHub consent screen
  }

  @Get('github/callback')
  @UseGuards(GithubOAuthGuard)
  async githubCallback(
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ) {
    const { accessToken } = await this.authService.ssoLogin(req.user);
    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3001';
    res.redirect(`${frontendUrl}/auth/callback?token=${accessToken}`);
  }

  // ─── Current User ─────────────────────────────────────────────────────────

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: RequestWithUser) {
    return this.authService.getMe(req.user.id);
  }
}
