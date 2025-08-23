import { commonApi } from '~/api/common.api';
import type { IEvent } from '~/api/controllers/events/types';
import type { IControllerParams } from '~/api/controllers/types';

const CONTROLLER_URL = 'events';

export const eventsController = commonApi.injectEndpoints({
  endpoints: builder => ({
    getEvents: builder.query<IEvent[], IControllerParams>({
      query: params => ({
        url: CONTROLLER_URL,
        params,
      }),
      transformResponse: (response: { items: IEvent[] }) => {
        return response.items;
      },
    }),
  }),
});

export const { useGetEventsQuery } = eventsController;
