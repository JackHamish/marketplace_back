import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { UpdateUserDto } from './dto/update-user.dto';
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

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async findUnique(where: Prisma.UserWhereInput) {
    const user = await this.prisma.user.findFirstOrThrow({
      where,
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findUnique({ id });

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
