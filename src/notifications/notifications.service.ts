import { Injectable } from '@nestjs/common';
import { getMessaging } from 'firebase-admin/messaging';
import { firebaseConfig } from 'src/configs/firebase/firebase.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationDto } from './dto/notification.dto';
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
    notification_dto: NotificationDto,
  ) => {
    await this.prismaService.notificationToken.updateMany({
      where: { userId: user.id },
      data: {
        status: 'INACTIVE',
      },
    });

    const notificationToken = await this.prismaService.notificationToken.create(
      {
        data: {
          userId: user.id,
          deviceType: notification_dto.deviceType,
          notificationToken: notification_dto.notificationToken,
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
          status: 'INACTIVE',
        },
      });
    } catch (error) {
      return error;
    }
  };

  getNotifications = async () => {
    return await this.prismaService.notifications.findMany();
  };

  sendPush = async (user: User, title: string, body: string): Promise<void> => {
    try {
      const notification = await this.prismaService.notificationToken.findFirst(
        {
          where: { user: { id: user.id }, status: 'ACTIVE' },
        },
      );

      console.log(notification);

      if (notification) {
        await this.prismaService.notifications.create({
          data: {
            notificationTokenId: notification.id,
            title,
            body,
            status: 'ACTIVE',
            created_by: user.name,
          },
        });
        const res = await firebase
          .messaging()
          .send({
            notification: { title, body },
            token: notification.notificationToken,
            android: { priority: 'high' },
          })
          .catch((error: any) => {
            console.error(error);
          });

        console.log(res);
      }
    } catch (error) {
      console.log(error);

      return error;
    }
  };
}
