import {
  configureEcho,
  echoIsConfigured,
  useEchoNotification,
} from '@laravel/echo-react';
import { useGetNotificationsQuery } from '~/api/controllers/notifications';
import type { INotification } from '~/api/controllers/notifications/types';

export function initializeEcho() {
  const token = localStorage.getItem('userToken');
  if (!token) {
    return;
  }

  if (echoIsConfigured()) return;

  configureEcho({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    wsHost: import.meta.env.VITE_PUSHER_HOST,
    wsPort: 8080,
    wssPort: import.meta.env.VITE_PUSHER_PORT,
    forceTLS: false,
    encrypted: true,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: `${import.meta.env.VITE_API_BASE_URL}/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}

export function useUserNotifications(userId: number) {
  const { refetch } = useGetNotificationsQuery({ page: 1 });

  if (!userId || !echoIsConfigured()) return;

  useEchoNotification<INotification>(
    `App.Models.User.${userId}`,
    (notification: INotification) => {
      refetch();
    },
    [],
    [userId],
  );
}
