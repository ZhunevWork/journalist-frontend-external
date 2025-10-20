import { configureEcho, echo, echoIsConfigured } from '@laravel/echo-react';
import { useGetNotificationsQuery, useLazyGetNotificationsQuery } from '~/api/controllers/notifications';
import { useEffect } from 'react';
import { useAppDispatch } from '~/hooks/redux';
import { setNotifications } from '~/store/notificationSlice';

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

export function useUserNotifications(userId?: number) {
  const dispatch = useAppDispatch();
  const [fetchNotifications] = useLazyGetNotificationsQuery();

  useEffect(() => {
    if (!userId || !echoIsConfigured()) {
      return;
    }

    const echoInstance = echo();
    const channel = echoInstance.private(`App.Models.User.${userId}`);
    channel.listen(
      '.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated',
      async (data: any) => {
        try {
          const response = await fetchNotifications({ page: 1 }).unwrap();
          dispatch(setNotifications(response.data));
        } catch (err) {
          console.error('Ошибка при обновлении уведомлений:', err);
        }
      }
    );

    return () => {
      echoInstance.leaveChannel(`private-App.Models.User.${userId}`);
    };
  }, [userId, ]);
}
