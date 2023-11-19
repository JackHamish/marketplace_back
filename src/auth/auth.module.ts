import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SteamUserService } from 'src/steam-user/steam-user.service';
import { MailModule } from 'src/mail /mail.module';
import { ResetTokenModule } from 'src/reset-token/reset-token.module';
import { NotificationModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '5m' },
    }),
    MailModule,
    ResetTokenModule,
    NotificationModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService, SteamUserService],
})
export class AuthModule {}
