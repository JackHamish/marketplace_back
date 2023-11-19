import { BadRequestException, Injectable } from '@nestjs/common';
import { getMessaging } from 'firebase-admin/messaging';
import { firebaseConfig } from 'src/configs/firebase/firebase.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { User } from '@prisma/client';
import * as firebase from 'firebase-admin';
import * as path from 'path';

firebase.initializeApp({
  credential: firebase.credential.cert(
    path.join(__dirname, '..', 'configs/firebase/firebase-admin.json'),
  ),
});

@Injectable()
export class NotificationsService {
  constructor(private readonly prismaService: PrismaService) {}

  acceptPushNotification = async (
    user: User,
    notificationDto: CreateNotificationDto,
  ) => {
    const duplicate = await this.prismaService.notificationToken.findUnique({
      where: { notificationToken: notificationDto.notificationToken },
    });

    if (duplicate)
      throw new BadRequestException('Push notifications already accepted');

    const notificationToken = await this.prismaService.notificationToken.create(
      {
        data: {
          userId: user.id,
          deviceType: notificationDto.deviceType,
          notificationToken: notificationDto.notificationToken,
          status: 'ACTIVE',
        },
      },
    );
    return notificationToken;
  };

  disablePushNotification = async (
    user: User,
    updateDto: UpdateNotificationDto,
  ) => {
    try {
      await this.prismaService.notificationToken.updateMany({
        where: { user: { id: user.id }, deviceType: updateDto.deviceType },
        data: {
          status: 'EXPIRED',
        },
      });
    } catch (error) {
      return error;
    }
  };

  getNotifications = async () => {
    return await this.prismaService.notification.findMany();
  };

  sendPush = async (user: User, title: string, body: string): Promise<void> => {
    try {
      const notificationToken =
        await this.prismaService.notificationToken.findFirst({
          where: { user: { id: user.id }, status: 'ACTIVE' },
        });

      console.log(notificationToken);

      if (!notificationToken) {
        return;
      }
      const res = await firebase
        .messaging()
        .send({
          notification: { title, body },
          token: notificationToken.notificationToken,
          android: { priority: 'high' },
        })
        .catch((error: any) => {
          console.error(error);
        });

      await this.prismaService.notification.create({
        data: {
          notificationTokenId: notificationToken.id,
          title,
          body,
          status: 'ACTIVE',
          created_by: user.name,
        },
      });

      console.log(res);
    } catch (error) {
      console.log(error);

      return error;
    }
  };
}
