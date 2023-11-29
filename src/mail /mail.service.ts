import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendResetPasswordLink(email: string, token: string) {
    const url = `http://localhost:3000/profile/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: "Reset password",
      template: "./resetPassword",
      context: {
        url,
      },
    });
  }
}
