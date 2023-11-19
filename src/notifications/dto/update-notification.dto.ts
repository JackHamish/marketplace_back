import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CreateNotificationDto } from './create-notification.dto';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {}
