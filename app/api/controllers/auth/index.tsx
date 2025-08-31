import { commonApi } from '~/api/common.api';
import type {
  ILoginArgs,
  ILoginResponse,
  IRegisterArgs,
  IRegisterResponse,
} from '~/api/controllers/auth/types';

export const authController = commonApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<ILoginResponse, ILoginArgs>({
      query: body => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<IRegisterResponse, IRegisterArgs>({
      query: body => ({
        url: '/register',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authController;
