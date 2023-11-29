import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";
import { join } from "path";

export const getMailConfig = async (): Promise<any> => {
  const mailFromName = process.env.MAIL_FROM_NAME;
  const mailFromAddress = process.env.EMAIL_ID;

  return {
    transport: {
      host: process.env.SMTP,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
    },

    defaults: {
      from: `"${mailFromName}" <${mailFromAddress}>`,
    },
    template: {
      dir: join(__dirname, "templates"),
      adapter: new EjsAdapter(),
      options: {
        strict: false,
      },
    },
  };
};
