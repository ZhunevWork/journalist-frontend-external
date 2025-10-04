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

export interface IProfileData {
  accreditation_type: 'Пресса' | 'Фото';
  birth_place: string;
  birthday: string;
  department_code: string;
  fan_id: string | null;
  issue_date: string;
  passport_number: string;
  passport_series: string;
  rules_agreement: boolean;
  smi_name: string;
  smi_type: 'Сми' | 'Блогер/Фотограф';
  smi_url: string;
  who_issues: string;
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
