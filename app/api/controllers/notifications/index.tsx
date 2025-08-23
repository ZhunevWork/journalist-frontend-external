import { commonApi } from '~/api/common.api';
import type { INotification } from '~/api/controllers/notifications/types';

const CONTROLLER_URL = 'notifications';

export const notificationsController = commonApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<
      INotification[],
      { search?: string; page: number }
    >({
      query: params => ({
        url: CONTROLLER_URL,
        params,
      }),
      transformResponse: (response: { items: INotification[] }) => {
        return response.items;
      },
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationsController;
