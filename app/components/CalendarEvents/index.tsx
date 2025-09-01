import { useGetEventsQuery } from '~/api/controllers/events';
import type { IEvent } from '~/api/controllers/events/types';
import Calendar from '~/components/ui/Calendar';
import type { CalendarDayData } from '~/components/ui/Calendar/types';
import dayjs, { type Dayjs } from 'dayjs';

export default function CalendarEvents() {
  const { data } = useGetEventsQuery({ page: 1 });

  const getDayData = (
    date: Dayjs,
    data: IEvent[],
  ): CalendarDayData | undefined => {
    const dateStr = date.format('YYYY-MM-DD');

    const dayEvents = data.filter(
      event => dayjs(event.date).format('YYYY-MM-DD') === dateStr,
    );

    if (!dayEvents.length) return undefined;

    return {
      date,
      content: dayEvents.length,
      events: dayEvents,
    };
  };

  if (!data) return <Calendar />;

  return (
    <Calendar
      dayData={date => {
        return getDayData(date, data.data);
      }}
    />
  );
}
