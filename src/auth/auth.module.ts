import { Module } from '@nestjs/common';
import { AuthService } from '~/auth/auth.service';
import { AuthController } from '~/auth/auth.controller';
import { UserModule } from '~/user/user.module';
import { AtStrategy, RtStrategy } from '~/auth/strategies';
import { JwtModule } from '@nestjs/jwt';
import { HashingService } from '~/hashing/hashing.service';

@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, HashingService],
})
export class AuthModule {}
