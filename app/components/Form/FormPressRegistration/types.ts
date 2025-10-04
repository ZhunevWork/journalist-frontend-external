import type { IRegisterArgs } from '~/api/controllers/auth/types';

export type StepOneFields = Pick<
  IRegisterArgs,
  | 'phone'
  | 'email'
  | 'last_name'
  | 'name'
  | 'middle_name'
  | 'birthday'
  | 'passport_series'
  | 'passport_number'
  | 'who_issues'
  | 'issue_date'
  | 'department_code'
  | 'birth_place'
>;

export type StepTwoFields = Pick<
  IRegisterArgs,
  | 'smi_type'
  | 'smi_name'
  | 'smi_url'
  | 'documents'
  | 'profile_photo'
  | 'fan_id'
  | 'accreditation_type'
  | 'password'
  | 'password_confirmation'
>;
