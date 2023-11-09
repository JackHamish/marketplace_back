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
import { MailService } from 'src/mail /mail.service';
import { ResetTokenService } from 'src/reset-token/reset-token.service';
import { ResetPasswordWithTokenRequestDto } from 'src/reset-token/dto/reset-password-with-token.request.dto';
import { ResetTokenInterface } from 'src/reset-token/interfaces/reset-token.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private resetTokenService: ResetTokenService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  public async resetPasswordRequest(email: string) {
    const user = await this.findUnique({ email });
    if (!user) {
      throw new BadRequestException(
        `Cannot generate token for reset password request  because user ${email} is not found`,
      );
    }
    const response = await this.resetTokenService.generateResetToken(email);

    await this.mailService.sendResetPasswordLink(email, response.token);

    return response;
  }

  public async resetPassword(
    resetPasswordWithTokenRequestDto: ResetPasswordWithTokenRequestDto,
  ): Promise<void> {
    const { token, newPassword } = resetPasswordWithTokenRequestDto;
    const { email } = this.jwtService.decode(token) as ResetTokenInterface;

    const resetPasswordRequest = await this.resetTokenService.getResetToken(
      token,
    );

    if (!resetPasswordRequest) {
      throw new BadRequestException(
        `There is no request password request for user: ${email}`,
      );
    }
    const user = await this.findUnique({ email });
    if (!user) {
      throw new BadRequestException(`User is not found`);
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: await hash(newPassword) },
    });

    await this.resetTokenService.removeResetToken(token);
  }

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
