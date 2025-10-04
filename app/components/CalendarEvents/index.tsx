import { useGetEventsQuery } from '~/api/controllers/events';
import type { IEvent } from '~/api/controllers/events/types';
import Calendar from '~/components/ui/Calendar';
import type { CalendarDayData } from '~/components/ui/Calendar/types';
import dayjs, { type Dayjs } from 'dayjs';
import { useCallback, useMemo, useState } from 'react';

export default function CalendarEvents() {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const { data } = useGetEventsQuery({
    month: dayjs(currentDate).format('MM'),
    year: dayjs(currentDate).format('YYYY'),
  });

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

  const dayDataHandler = useCallback(
    (date: Dayjs) => {
      if (!data) return undefined;
      return getDayData(date, data);
    },
    [data, getDayData],
  );

  const handleMonthChange = useCallback((date: Dayjs) => {
    setCurrentDate(date);
  }, []);

  if (!data) return <Calendar />;

  return (
    <Calendar dayData={dayDataHandler} onMonthChange={handleMonthChange} />
  );
}
