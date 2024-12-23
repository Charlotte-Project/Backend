import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { UserService } from '~/user/user.service';
import { AuthDto } from '~/auth/dto';
import { JwtPayload, Tokens } from '~/auth/types';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from '~/hashing/hashing.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as process from 'node:process';

@Injectable()
export class AuthService {
  readonly REFRESH_TOKEN_NAME = 'refreshToken';
  readonly EXPIRE_DAY_REFRESH_TOKEN = 15;

  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
    private readonly config: ConfigService,
  ) {}

  async signUp(dto: AuthDto): Promise<Tokens> {
    const oldUser = await this.userService.findByEmail(dto.email);
    if (oldUser) {
      throw new BadRequestException('User already exist');
    }

    const user = await this.userService.save(dto);

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRt(user.id, tokens.refreshToken);
    return tokens;
  }

  async signIn(dto: AuthDto): Promise<Tokens> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new ForbiddenException('Wrong email or password');
    }

    const passwordMatches = await this.hashingService.compare(
      dto.password,
      user.hashedPassword,
    );
    if (!passwordMatches) {
      throw new ForbiddenException('Wrong email or password');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRt(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });

    return true;
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.userService.findById(userId);
    if (!user?.hashedRt) {
      throw new ForbiddenException('Access Denied');
    }

    const rtMatches = await this.hashingService.compare(rt, user.hashedRt);
    if (!rtMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRt(user.id, tokens.refreshToken);

    return tokens;
  }

  async updateRt(userId: string, rt: string): Promise<void> {
    const hash = await this.hashingService.hash(rt, 10);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: this.EXPIRE_DAY_REFRESH_TOKEN + 'd',
      }),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  private getCookieOptions() {
    return {
      httpOnly: true,
      domain: this.config.get<string>('SERVER_DOMAIN') || undefined,
      secure: process.env.NODE_ENV === 'prod',
      sameSite: 'strict' as const,
    };
  }

  async addRtToResponse(res: Response, rt: string) {
    res.cookie(this.REFRESH_TOKEN_NAME, rt, {
      ...this.getCookieOptions(),
      maxAge: this.EXPIRE_DAY_REFRESH_TOKEN * 24 * 60 * 60 * 1000,
    });
  }

  async removeRtFromResponse(res: Response) {
    res.clearCookie(this.REFRESH_TOKEN_NAME, this.getCookieOptions());
  }
}
