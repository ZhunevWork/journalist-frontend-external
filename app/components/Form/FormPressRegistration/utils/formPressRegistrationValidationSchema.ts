import type { IRegisterArgs } from '~/api/controllers/auth/types';
import { toast } from 'sonner';
import * as yup from 'yup';

export const formPressRegistrationValidationSchema = yup
  .object({
    phone: yup
      .string()
      .required('Обязательное поле')
      .matches(
        /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
        'Введите корректный номер телефона',
      ),
    email: yup
      .string()
      .required('Обязательное поле')
      .email('Введите корректную почту'),
    last_name: yup
      .string()
      .required('Обязательное поле')
      .min(1, 'Обязательное поле'),
    name: yup
      .string()
      .required('Обязательное поле')
      .min(1, 'Обязательное поле'),
    middle_name: yup.string().optional(),
    birthday: yup
      .string()
      .required('Обязательное поле')
      .test('is-date', 'Введите корректную дату', value => {
        if (!value) return false;
        const date = new Date(value);
        return !isNaN(date.getTime());
      }),
    passport_series: yup
      .string()
      .required('Обязательное поле')
      .matches(/^\d{4}$/, 'Серия паспорта должна содержать 4 цифры'),
    passport_number: yup
      .string()
      .required('Обязательное поле')
      .matches(/^\d{6}$/, 'Номер паспорта должен содержать 6 цифр'),
    issue_date: yup
      .string()
      .required('Обязательное поле')
      .test('is-date', 'Введите корректную дату', value => {
        if (!value) return false;
        const date = new Date(value);
        return !isNaN(date.getTime());
      }),
    who_issues: yup
      .string()
      .required('Обязательное поле')
      .min(1, 'Обязательное поле'),
    department_code: yup
      .string()
      .required('Обязательное поле')
      .matches(
        /^\d{3}-\d{3}$/,
        'Код подразделения должен быть в формате 000-000',
      ),
    birth_place: yup
      .string()
      .required('Обязательное поле')
      .min(1, 'Обязательное поле'),

    smi_type: yup
      .string()
      .required('Обязательное поле')
      .oneOf(['smi', 'bloger'], 'Выберите тип СМИ'),

    smi_name: yup
      .string()
      .required('Обязательное поле')
      .min(2, 'Название должно содержать минимум 2 символа'),

    smi_url: yup.string().when('smi_type', {
      is: 'bloger',
      then: schema =>
        schema
          .required('Обязательное поле для блогера')
          .url('Введите корректную ссылку')
          .matches(
            /^https?:\/\/.+/,
            'Ссылка должна начинаться с http:// или https://',
          ),
      otherwise: schema => schema.optional(),
    }),

    documents: yup.array().when('smi_type', {
      is: 'smi',
      then: schema =>
        schema
          .min(1, 'Необходимо загрузить хотя бы один документ')
          .test('file-type', 'Допустимы только изображения', files => {
            if (!files || files.length === 0) return false;
            return files.every(file => file.type.startsWith('image/'));
          }),
      otherwise: schema => schema.optional(),
    }),

    profile_photo: yup
      .mixed()
      .test('file-required', 'Личное фото обязательно', value => {
        return value !== null && value !== undefined;
      })
      .test('file-type', 'Допустимы только изображения', value => {
        if (!value) return false;
        if (Array.isArray(value)) {
          return (
            value.length > 0 &&
            value.every(file => file.type.startsWith('image/'))
          );
        }
        return value instanceof File && value.type.startsWith('image/');
      }),

    fan_id: yup.string().optional(),

    accreditation_type: yup
      .string()
      .required('Обязательное поле')
      .oneOf(['press', 'photo'], 'Выберите тип аккредитации'),

    password: yup
      .string()
      .required('Обязательное поле')
      .min(8, 'Пароль должен содержать минимум 8 символов')
      .matches(/[a-zA-Z]/, 'Пароль должен содержать буквы')
      .matches(/\d/, 'Пароль должен содержать цифры'),

    password_confirmation: yup
      .string()
      .required('Обязательное поле')
      .oneOf([yup.ref('password')], 'Пароли должны совпадать'),

    rules_agreement: yup
      .boolean()
      .required('Нужно согласие с правилами сервиса'),
  })
  .required() as yup.ObjectSchema<IRegisterArgs>;

const stepOneSchema = formPressRegistrationValidationSchema.pick([
  'phone',
  'email',
  'last_name',
  'name',
  'middle_name',
  'birthday',
  'passport_series',
  'passport_number',
  'who_issues',
  'issue_date',
  'department_code',
  'birth_place',
]);

const stepTwoSchema = formPressRegistrationValidationSchema.pick([
  'smi_type',
  'smi_name',
  'smi_url',
  'documents',
  'profile_photo',
  'fan_id',
  'accreditation_type',
  'password',
  'password_confirmation',
]);

export { stepOneSchema, stepTwoSchema };
