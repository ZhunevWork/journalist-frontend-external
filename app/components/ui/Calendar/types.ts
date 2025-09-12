import type { IEvent } from '~/api/controllers/events/types';
import type { Dayjs } from 'dayjs';

export interface CalendarDayData {
  date: Dayjs;
  content?: number;
  events?: IEvent[];
}
