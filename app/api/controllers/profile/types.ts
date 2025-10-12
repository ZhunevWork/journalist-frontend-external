import type { FileType } from '~/api/controllers/types';

export enum SmitType {
  MASS_MEDIA = 'mass_media',
  BLOGGER_PHOTOGRAPHER = 'blogger/photographer',
}

export enum AccreditationType {
  PRESS = 'press',
  PHOTO = 'photo',
}

export interface IProfile {
  id: number;
  name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  email: string;
  birthday: string;
  passport_series: string;
  passport_number: string;
  issue_date: string;
  who_issues: string;
  department_code: string;
  birth_place: string;
  rules_agreement: boolean;
  smi_type: SmitType;
  accreditation_type: AccreditationType;
  smi_name: string;
  smi_url: string;
  fan_id: string;
  comment: string;
  profile_photo: FileType;
  documents: FileType[];
  deleted: boolean;
  mailing: boolean;
}

export type UpdateProfileArgs = Partial<
  Omit<IProfile, 'profile_photo' | 'documents'> & {
    profile_photo?: File | null;
    documents?: File[];
  }
>;
