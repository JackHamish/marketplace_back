import * as Joi from 'joi';

export const envSchema = Joi.object({
  APP_PORT: Joi.number().default(3001),
  JWT_EXPIRES_IN_SECONDS: Joi.number(),
  JWT_ACCESS_SECRET: Joi.string(),
  JWT_REFRESH_SECRET: Joi.string(),
  JWT_RESET_PASSWORD_SECRET: Joi.string(),
  DATABASE_URL: Joi.string(),
  SMTP: Joi.string(),
  SMTP_PORT: Joi.number(),
  MAIL_FROM_NAME: Joi.string(),
  EMAIL_ID: Joi.string().email(),
  EMAIL_PASS: Joi.string(),
  PROJECT_ID: Joi.string(),
  PRIVATE_KEY: Joi.string(),
  CLIENT_EMAIL: Joi.string(),
  STORAGE_MEDIA_BUCKET: Joi.string(),
});
