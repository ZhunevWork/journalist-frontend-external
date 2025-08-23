import type { StepOneFields } from '~/components/Form/FormPressRegistration/types';

export const stepOneDefaultValues: StepOneFields = {
  phone: '',
  email: '',
  lastName: '',
  firstName: '',
  middleName: '',
  birthDate: '',
  passportSeries: '',
  passportNumber: '',
  passportIssueDate: '',
  passportIssuedBy: '',
  passportDivisionCode: '',
  birthPlace: '',
};

export const stepOneLabels: Record<keyof StepOneFields, string> = {
  phone: 'Номер телефона',
  email: 'Почта',
  lastName: 'Фамилия',
  firstName: 'Имя',
  middleName: 'Отчество',
  birthDate: 'Дата рождения',
  passportSeries: 'Серия паспорта',
  passportNumber: 'Номер паспорта',
  passportIssueDate: 'Дата выдачи',
  passportIssuedBy: 'Кем выдан',
  passportDivisionCode: 'Код подразделения',
  birthPlace: 'Место рождения',
};
