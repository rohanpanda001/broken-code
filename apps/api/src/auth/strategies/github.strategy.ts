import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import { AuthService } from '../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
      callbackURL: process.env.GITHUB_CALLBACK_URL ?? 'http://localhost:3000/auth/github/callback',
      scope: ['user:email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: (err: Error | null, user?: unknown) => void,
  ) {
    const email =
      profile.emails?.[0]?.value ?? `${profile.username}@github.local`;
    const name = profile.displayName ?? profile.username;

    const user = await this.authService.findOrCreateSsoUser({
      email,
      name,
      provider: 'GITHUB',
      providerAccountId: String(profile.id),
    });
    done(null, user);
  }
}
