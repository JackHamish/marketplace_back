import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (oldUser) {
      throw new BadRequestException('User already exist');
    }

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: await hash(createUserDto.password),
      },
    });

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async findUnique(where: { email: string } | { id: string }) {
    const user = await this.prisma.user.findUnique({ where });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
