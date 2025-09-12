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
      transformResponse: (res: any) => res.data,
    }),
    register: builder.mutation<IRegisterResponse, IRegisterArgs>({
      query: body => ({
        url: '/register',
        method: 'POST',
        body: {
          user: {
            name: body.name,
            middle_name: body.middle_name,
            phone: body.phone,
            email: body.email,
            password: body.password,
            password_confirmation: body.password_confirmation,
          },
          profile: {
            birthday: body.birthday,
            passport_series: body.passport_series,
            passport_number: body.passport_number,
            who_issues: body.who_issues,
            department_code: body.department_code,
            birth_place: body.birth_place,
            rules_agreement: body.rules_agreement,
            smi_type: body.smi_type,
            smi_name: body.smi_name,
            smi_url: body.smi_url,
          },
          profile_photo: body.profile_photo,
          documents: body.documents,
        },
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
