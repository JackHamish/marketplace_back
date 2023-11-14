import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailModule } from 'src/mail /mail.module';
import { ResetTokenModule } from 'src/reset-token/reset-token.module';

@Module({
  imports: [MailModule, ResetTokenModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
