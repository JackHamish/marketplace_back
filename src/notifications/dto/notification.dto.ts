import { IsNotEmpty, IsString } from 'class-validator';

export class NotificationDto {
  @IsString()
  @IsNotEmpty()
  deviceType: string;

  @IsString()
  @IsNotEmpty()
  notificationToken: string;
}
