import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '~/user/user.service';
import { AuthService } from '~/auth/auth.service';
import { PrismaService } from '~/prisma/prisma.service';
import { HashingService } from '~/hashing/hashing.service';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { BadRequestException, ForbiddenException } from '@nestjs/common';

describe('Auth service', () => {
  let authService: AuthService;
  let prismaService: PrismaService;
  let userService: UserService;
  let hashingService: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              update: jest.fn(),
              updateMany: jest.fn(),
            },
          },
        },
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: HashingService,
          useValue: {
            hash: jest.fn(),
            compare: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest
              .fn()
              .mockImplementation((key) =>
                key === 'AT_SECRET' ? 'at-secret' : 'rt-secret',
              ),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);
    hashingService = module.get<HashingService>(HashingService);
  });

  describe('Sign-up', () => {
    it('Should throw BadRequestException if user already exists', async () => {
      jest
        .spyOn(userService, 'findByEmail')
        .mockResolvedValue({ id: '1' } as User);

      await expect(
        authService.signUp({ email: 'test@example.com', password: 'password' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create a new user and return tokens', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);
      jest
        .spyOn(userService, 'save')
        .mockResolvedValue({ id: '1', email: 'test@example.com' } as User);
      jest.spyOn(authService, 'getTokens').mockResolvedValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
      jest.spyOn(authService, 'updateRt').mockResolvedValue();

      const tokens = await authService.signUp({
        email: 'test@example.com',
        password: 'password',
      });

      expect(tokens).toEqual({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
    });
  });

  describe('Sign-in', () => {
    it('Should throw ForbiddenException if user not found', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);

      await expect(
        authService.signIn({ email: 'test@example.com', password: 'password' }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('Should throw ForbiddenException if password does not match', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue({
        id: '1',
        hashedPassword: 'hashedPassword',
      } as User);
      jest.spyOn(hashingService, 'compare').mockResolvedValue(false);

      await expect(
        authService.signIn({ email: 'test@example.com', password: 'password' }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('Should return tokens on successful sign-in', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue({
        id: '1',
        hashedPassword: 'hashedPassword',
      } as User);
      jest.spyOn(hashingService, 'compare').mockResolvedValue(true);
      jest.spyOn(authService, 'getTokens').mockResolvedValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });

      const tokens = await authService.signIn({
        email: 'test@example.com',
        password: 'password',
      });

      expect(tokens).toEqual({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
    });
  });

  describe('Logout', () => {
    it('Should clear refresh token', async () => {
      jest.spyOn(prismaService.user, 'updateMany').mockResolvedValue({} as any);

      const result = await authService.logout('1');

      expect(prismaService.user.updateMany).toHaveBeenCalledWith({
        where: {
          id: '1',
          hashedRt: {
            not: null,
          },
        },
        data: {
          hashedRt: null,
        },
      });
      expect(result).toBe(true);
    });
  });

  describe('Refresh tokens', () => {
    it('Should throw ForbiddenException if user or hashedRt is invalid', async () => {
      jest.spyOn(userService, 'findById').mockResolvedValue(null);

      await expect(
        authService.refreshTokens('1', 'refreshToken'),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should return new tokens if refresh token matches', async () => {
      jest.spyOn(userService, 'findById').mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        hashedRt: 'hashedRefreshToken',
      } as User);
      jest.spyOn(hashingService, 'compare').mockResolvedValue(true);
      jest.spyOn(authService, 'getTokens').mockResolvedValue({
        accessToken: 'newAccessToken',
        refreshToken: 'newRefreshToken',
      });
      jest.spyOn(authService, 'updateRt').mockResolvedValue();

      const tokens = await authService.refreshTokens('1', 'refreshToken');

      expect(tokens).toEqual({
        accessToken: 'newAccessToken',
        refreshToken: 'newRefreshToken',
      });
    });
  });
});
