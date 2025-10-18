import { configureEcho, echoIsConfigured, useEcho } from '@laravel/echo-react';
import { useGetNotificationsQuery } from '~/api/controllers/notifications';

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
    wsPort: import.meta.env.VITE_PUSHER_PORT,
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

  useEcho(
    `App.Models.User.${userId}`,
    '.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated',
    (data: any) => {
      refetch();
    },
    [userId],
  );
}
