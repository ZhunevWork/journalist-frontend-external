import type {
  StepOneFields,
  StepTwoFields,
} from '~/components/Form/FormPressRegistration/types';

export const stepOneDefaultValues: Partial<StepOneFields> = {};
export const stepTwoDefaultValues: Partial<StepTwoFields> = {};

export const stepOneLabels: Record<keyof StepOneFields, string> = {
  phone: 'Номер телефона',
  email: 'Почта',
  last_name: 'Фамилия',
  name: 'Имя',
  middle_name: 'Отчество',
  birthday: 'Дата рождения',
  passport_series: 'Серия паспорта',
  passport_number: 'Номер паспорта',
  issue_date: 'Дата выдачи',
  who_issues: 'Кем выдан',
  department_code: 'Код подразделения',
  birth_place: 'Место рождения',
};
