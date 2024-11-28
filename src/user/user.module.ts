import { Module } from '@nestjs/common';
import { UserController } from '~/user/user.controller';
import { UserService } from '~/user/user.service';
import { HashingService } from '~/hashing/hashing.service';

@Module({
  controllers: [UserController],
  providers: [UserService, HashingService],
  exports: [UserService],
})
export class UserModule {}
