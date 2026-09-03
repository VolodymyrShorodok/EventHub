import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import type { User } from '@prisma/client';

type CreateUserInput = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateUserInput) {
    const existing = await this.prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existing) return null;

    const passwordHash = await bcrypt.hash(input.password, 10);

      const user = await this.prisma.user.create({
      data: {
        email: input.email,
        password: passwordHash,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
      },
    });

    return this.toPublicUser(user);
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user ? this.toPublicUser(user) : null;
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user ? this.toPublicUser(user) : null;
  }

  async validatePassword(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);

    return isValid ? this.toPublicUser(user) : null;
  }

  private toPublicUser(user: User) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      role: user.role,
    };
  }
}
