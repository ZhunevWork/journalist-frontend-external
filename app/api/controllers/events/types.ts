export interface IEvent {
  name: string;
  location: string;
  type: string;
  date: string;
  finish: string;
  link: string;
  text_link: string;
  is_fan_id: boolean;
}

export interface IGetEventsLinks {
  first: string;
  last: string;
  next: string;
}

export interface IGetEventsMetaLinks {
  url: string | null;
  label: string;
  active: boolean;
  page: number | null;
}

export interface IGetEventsMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  path: string;
  links: IGetEventsMetaLinks[];
}

export interface IGetEventsResponse {
  data: IEvent[];
  links: IGetEventsLinks;
  meta: IGetEventsMeta;
}
