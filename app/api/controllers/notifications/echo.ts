import {
  configureEcho,
  echoIsConfigured,
  useEchoNotification,
} from '@laravel/echo-react';
import type { INotification } from '~/api/controllers/notifications/types';

export function initializeEcho() {
  // if (echoIsConfigured()) {
  //   echo().disconnect();
  // }

  const token = localStorage.getItem('userToken');
  if (!token) {
    console.error('Echo: Auth token not found.');
    return;
  }

  configureEcho({
    broadcaster: 'reverb',
    key: 'journalist',
    wsHost: 'localhost',
    wsPort: 6001,
    wssPort: 6001,
    forceTLS: false,
    enabledTransports: ['ws'],
    authEndpoint: 'http://localhost:8080/broadcasting/auth',
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}

export function useUserNotifications(userId: number) {
  if (!echoIsConfigured()) {
    console.warn('Echo еще не сконфигурирован, подписка не выполнена.');
    return;
  }

  useEchoNotification<INotification>(
    `App.Models.User.${userId}`,
    (notification: INotification) => {
      console.log('Новое уведомление:', notification);
    },
    [],
    [userId],
  );
}
