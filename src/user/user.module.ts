import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { MailModule } from "src/mail /mail.module";
import { ResetTokenModule } from "src/reset-token/reset-token.module";
import { NotificationModule } from "src/notifications/notifications.module";

@Module({
  imports: [MailModule, ResetTokenModule, NotificationModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
