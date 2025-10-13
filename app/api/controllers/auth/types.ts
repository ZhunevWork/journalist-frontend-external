import type { FileType } from '~/api/controllers/types';

export interface ILoginArgs {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: IUserData;
  profile: IProfileData;
}

export interface IUserData {
  id: number;
  last_name: string;
  name: string;
  middle_name?: string;
  phone: string;
  email: string;
  profile_id: number;
  roles: string[];
}

export enum SmitType {
  MASS_MEDIA = 'mass_media',
  BLOGGER_PHOTOGRAPHER = 'blogger/photographer',
}

export enum AccreditationType {
  PRESS = 'press',
  PHOTO = 'photo',
}

export interface IProfileData {
  id: number;
  accreditation_type: AccreditationType;
  birth_place: string;
  birthday: string;
  department_code: string;
  fan_id: string | null;
  issue_date: string;
  passport_number: string;
  passport_series: string;
  rules_agreement: boolean;
  smi_name: string;
  smi_type: SmitType;
  smi_url: string;
  who_issues: string;
  deleted: boolean;
  is_approved: boolean | null;
  profile_photo: FileType;
  documents: FileType[];
  mailing: boolean;
  email_confirm: boolean;
}

export interface IRegisterArgs {
  name: string;
  middle_name?: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
  birthday: string;
  passport_series: string;
  passport_number: string;
  issue_date: string;
  who_issues: string;
  department_code: string;
  birth_place: string;
  rules_agreement: boolean;
  smi_type: string;
  accreditation_type: string;
  smi_name: string;
  smi_url: string;
  fan_id?: string;
  profile_photo?: File;
  documents?: File[];
}
export interface IRegisterResponse {
  message: string;
  token: string;
  user: IUserData;
  profile: IProfileData;
}
