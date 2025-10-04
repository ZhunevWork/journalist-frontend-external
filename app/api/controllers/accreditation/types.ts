import type { IEvent } from '~/api/controllers/events/types';
import type { PaginationLinks, PaginationMeta } from '~/api/controllers/types';

export interface ICreateAccreditationArgs {
  event_id: number;
  journalist_id: number | undefined;
  accreditation_applications: File[];
}

export interface IJournalist {
  id: number;
  name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  email: string;
  is_approved: boolean;
  role: string;
}

export interface IAccreditation {
  id: number;
  rules_agreed: boolean;
  is_approved_by_ps: boolean | null;
  is_approved_by_ss: boolean | null;
  approved_by_ps_at: string;
  approved_by_ss_at: string;
  event: IEvent;
  journalist: IJournalist;
  securityWorker: IJournalist | null;
  pressWorker: IJournalist | null;
}

export interface GetAccreditationsResponse {
  data: IAccreditation[];
  links: PaginationLinks;
  meta: PaginationMeta;
}
