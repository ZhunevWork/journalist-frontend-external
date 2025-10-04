import { commonApi } from '~/api/common.api';
import type {
  ILoginArgs,
  ILoginResponse,
  IRegisterArgs,
  IRegisterResponse,
} from '~/api/controllers/auth/types';
import dayjs from 'dayjs';

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
      query: body => {
        const formData = new FormData();

        // Добавляем данные пользователя
        formData.append('user[name]', body.name || '');
        formData.append('user[middle_name]', body.middle_name || '');
        formData.append('user[last_name]', body.last_name || ''); // добавлено
        formData.append('user[phone]', body.phone || '');
        formData.append('user[email]', body.email || '');
        formData.append('user[password]', body.password || '');
        formData.append(
          'user[password_confirmation]',
          body.password_confirmation || '',
        );

        // Добавляем данные профиля
        formData.append(
          'profile[birthday]',
          dayjs(body.birthday).format('YYYY-MM-DD') || '',
        );
        formData.append('profile[passport_series]', body.passport_series || '');
        formData.append('profile[passport_number]', body.passport_number || '');
        formData.append(
          'profile[issue_date]',
          dayjs(body.issue_date).format('YYYY-MM-DD') || '',
        );
        formData.append('profile[who_issues]', body.who_issues || '');
        formData.append('profile[department_code]', body.department_code || '');
        formData.append('profile[birth_place]', body.birth_place || '');
        formData.append(
          'profile[rules_agreement]',
          body.rules_agreement ? '1' : '0',
        );
        formData.append('profile[smi_type]', body.smi_type || '');
        formData.append(
          'profile[accreditation_type]',
          body.accreditation_type || '',
        ); // добавлено
        formData.append('profile[smi_name]', body.smi_name || '');
        formData.append('profile[smi_url]', body.smi_url || '');
        formData.append('profile[fan_id]', body.fan_id || '');

        // Добавляем файл профиля
        if (body.profile_photo) {
          formData.append('profile_photo', body.profile_photo);
        }

        // Добавляем документы
        if (body.documents && Array.isArray(body.documents)) {
          body.documents.forEach(doc => {
            formData.append('documents[]', doc);
          });
        } else if (body.documents) {
          formData.append('documents[]', body.documents);
        }

        return {
          url: '/register',
          method: 'POST',
          body: formData,
        };
      },
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
