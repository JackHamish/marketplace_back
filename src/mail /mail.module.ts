import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { mailerConfig } from "src/configs/mailer/mailer-config";

@Module({
  imports: [MailerModule.forRootAsync(mailerConfig)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
