export interface ILoginArgs {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
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
  id: number;
  profile_photo_url: string;
  documents_count: number;
}

export interface IRegisterArgs {
  last_name: string;
  name: string;
  middle_name?: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
  birthday?: string;
  passport_series?: string;
  passport_number?: string;
  issue_date?: string;
  who_issues?: string;
  department_code?: string;
  birth_place?: string;
  rules_agreement: boolean;
  smi_type?: string;
  accreditation_type?: string;
  smi_name?: string;
  smi_url?: string;
  fan_id?: string;
  profile_photo?: string;
  documents?: string[];
}
export interface IRegisterResponse {
  message: string;
  token: string;
  user: IUserData;
  profile: IProfileData;
}
