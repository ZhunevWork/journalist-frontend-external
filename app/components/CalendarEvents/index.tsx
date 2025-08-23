import { useGetEventsQuery } from '~/api/controllers/events';
import type { IEvent } from '~/api/controllers/events/types';
import Calendar from '~/components/ui/Calendar';
import type { Dayjs } from 'dayjs';

export default function CalendarEvents() {
  const { data } = useGetEventsQuery({ page: 1 });

  console.log(data);

  const getDayData = (date: Dayjs, data: IEvent[]) => {
    const dateStr = date.format('YYYY-MM-DD');
    const dayEvent = data.find(event => event.date === dateStr);

    if (!dayEvent) return undefined;

    return {
      date,
      content: dayEvent.name,
    };
  };

  if (!data) return null;

  return (
    <Calendar
      dayData={date => {
        return getDayData(date, data);
      }}
    />
  );
}
