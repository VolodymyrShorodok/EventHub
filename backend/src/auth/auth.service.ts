import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import type { Role } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(input: RegisterDto) {
    const registration = this.validateRegistration(input);
    const user = await this.usersService.create(registration);
    if (!user) {
      throw this.createFieldException('email', 'An account with this email already exists', 409);
    }
    return this.createAuthResponse(user, input.keepSignedIn === true);
  }

  async login(input: LoginDto) {
    const credentials = this.validateCredentials(input);
    const user = await this.usersService.validatePassword(credentials.email, credentials.password);
    if (!user) {
      throw this.createFieldException('password', 'Invalid email or password', 401);
    }
    return this.createAuthResponse(user, input.keepSignedIn === true);
  }

  private createAuthResponse(
    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      phone: string;
      role: Role;
    },
    keepSignedIn: boolean,
  ) {
    return {
      accessToken: this.jwtService.sign(
        { sub: user.id, email: user.email },
        {
          expiresIn: keepSignedIn
            ? process.env.JWT_REMEMBER_EXPIRES_IN || '30d'
            : process.env.JWT_EXPIRES_IN || '3600s',
        },
      ),
      user,
    };
  }

  private validateRegistration(input: RegisterDto) {
    const credentials = this.validateCredentials(input);
    const firstName = this.requiredText(input.firstName, 'firstName', 'First name', 2);
    const lastName = this.requiredText(input.lastName, 'lastName', 'Last name', 2);
    const phone = this.requiredText(input.phone, 'phone', 'Phone number');

    if (!/^\+?[0-9 ()-]{10,20}$/.test(phone)) {
      throw this.createFieldException('phone', 'Enter a valid phone number', 400);
    }

    return { ...credentials, firstName, lastName, phone };
  }

  private validateCredentials(input: LoginDto) {
    const email = this.requiredText(input.email, 'email', 'Email address').toLowerCase();
    const password = this.requiredText(input.password, 'password', 'Password');

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      throw this.createFieldException('email', 'Enter a valid email address', 400);
    }
    if (password.length < 8) {
      throw this.createFieldException(
        'password',
        'Password must contain at least 8 characters',
        400,
      );
    }

    return { email, password };
  }

  private requiredText(value: unknown, field: AuthField, label: string, minLength = 1) {
    if (typeof value !== 'string') {
      throw this.createFieldException(field, `${label} is required`, 400);
    }

    const normalized = value.trim();
    if (normalized.length < minLength) {
      throw this.createFieldException(field, `${label} is required`, 400);
    }

    return normalized;
  }

  private createFieldException(field: AuthField, message: string, statusCode: 400 | 401 | 409) {
    const body = { message, field, statusCode };
    if (statusCode === 401) return new UnauthorizedException(body);
    if (statusCode === 409) return new ConflictException(body);
    return new BadRequestException(body);
  }
}

type AuthField = 'firstName' | 'lastName' | 'phone' | 'email' | 'password';
