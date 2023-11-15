import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { NotificationDto } from './notification.dto';

export class UpdateNotificationDto extends PartialType(NotificationDto) {}
