import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { RegistrationDto } from 'src/auth/dto/registration.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async createUser(user: RegistrationDto): Promise<User | null> {
    return await this.prisma.user.create({
      data: user,
    });
  }

  async checkUserExist(email: string, login: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { login }],
      },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
}
