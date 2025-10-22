import { commonApi } from '~/api/common.api';
import type { UpdateProfileArgs } from '~/api/controllers/profile/types';
import { getFormDataFromObject } from '~/utils/getFormDataFromObject';

const CONTROLLER_URL = 'profiles';

export const profilesController = commonApi.injectEndpoints({
  endpoints: builder => ({
    updateProfile: builder.mutation<
      void,
      { id: number; body: UpdateProfileArgs }
    >({
      query: ({ id, body }) => ({
        url: `${CONTROLLER_URL}/${id}`,
        method: 'POST',
        body: getFormDataFromObject<UpdateProfileArgs & { _method: 'put' }>({
          ...body,
          _method: 'put',
        }),
      }),
    }),
    subscribeProfile: builder.mutation<void, number>({
      query: id => ({
        url: `${CONTROLLER_URL}/${id}/subscribe`,
        method: 'POST',
      }),
    }),
    unsubscribeProfile: builder.mutation<void, number>({
      query: id => ({
        url: `${CONTROLLER_URL}/${id}/unsubscribe`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useSubscribeProfileMutation,
  useUnsubscribeProfileMutation,
} = profilesController;
