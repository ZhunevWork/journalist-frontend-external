import { commonApi } from '~/api/common.api';
import type { GetNotificationsArgs } from '~/api/controllers/notifications/types';
import type { IControllerParams } from '~/api/controllers/types';

const CONTROLLER_URL = 'me/notifications';

export const notificationsController = commonApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<GetNotificationsArgs, IControllerParams>({
      query: params => ({
        url: CONTROLLER_URL,
        params,
      }),
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationsController;
