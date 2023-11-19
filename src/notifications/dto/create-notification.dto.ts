import { NotificationDeviceType } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  deviceType: NotificationDeviceType;

  @IsString()
  @IsNotEmpty()
  notificationToken: string;
}
