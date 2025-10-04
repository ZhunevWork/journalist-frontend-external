import { commonApi } from '~/api/common.api';
import type {
  IEvent,
  IGetEventsArgs,
  IGetEventsResponse,
} from '~/api/controllers/events/types';

const CONTROLLER_URL = 'events';

export const eventsController = commonApi.injectEndpoints({
  endpoints: builder => ({
    getEvents: builder.query<IEvent[], IGetEventsArgs>({
      query: params => ({
        url: CONTROLLER_URL,
        params,
      }),
      transformResponse: (response: IGetEventsResponse) => response.data,
    }),
    getEventsById: builder.query<IEvent[], { id: number }>({
      query: ({ id }) => ({
        url: `${CONTROLLER_URL}/${id}`,
      }),
    }),
  }),
});

export const { useGetEventsQuery } = eventsController;
