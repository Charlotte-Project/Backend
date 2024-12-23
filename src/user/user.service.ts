import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '~/prisma/prisma.service';
import { HashingService } from '~/hashing/hashing.service';
import { AuthDto } from '~/auth/dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
  ) {}

  async save(dto: AuthDto): Promise<User> {
    const hashedPassword = await this.hashingService.hash(dto.password, 10);
    return this.prisma.user.create({
      data: {
        email: dto.email,
        hashedPassword: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });
  }

  findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  findById(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
