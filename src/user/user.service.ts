import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { Prisma } from '@prisma/client';

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

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async findUnique(idOrEmail: string) {
    console.log(idOrEmail);

    const user = await this.prisma.user.findUnique({
      where: /^\S+@\S+\.\S+$/.test(idOrEmail)
        ? { email: idOrEmail }
        : { id: idOrEmail },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
}
