import { commonApi } from '~/api/common.api';
import type { IGetEventsResponse } from '~/api/controllers/events/types';
import type { IControllerParams } from '~/api/controllers/types';

const CONTROLLER_URL = 'events';

export const eventsController = commonApi.injectEndpoints({
  endpoints: builder => ({
    getEvents: builder.query<IGetEventsResponse, IControllerParams>({
      query: params => ({
        url: CONTROLLER_URL,
        params,
      }),
    }),
  }),
});

export const { useGetEventsQuery } = eventsController;
