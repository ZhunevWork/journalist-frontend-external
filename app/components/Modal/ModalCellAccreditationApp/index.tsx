import { useGetEventsQuery } from '~/api/controllers/events';
import type { IEvent } from '~/api/controllers/events/types';
import FormAccreditationApp from '~/components/Form/FormAccreditationApp';
import ModalWrapper, {
  type ModalWrapperProps,
} from '~/components/Modal/ModalWrapper';
import DateTabs from '~/components/ui/DateTabs';
import dayjs, { type Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

interface ModalCellAccreditationAppProps extends ModalWrapperProps {
  date: Dayjs;
  events: IEvent[];
}

export default function ModalCellAccreditationApp(
  props: ModalCellAccreditationAppProps,
) {
  const { events, date, open, onClose } = props;

  const [currentDate, setCurrentDate] = useState<Dayjs>(date);
  const [activeEvents, setActiveEvents] = useState<IEvent[]>(events);

  const { data } = useGetEventsQuery({
    month: dayjs(currentDate).format('MM'),
    year: dayjs(currentDate).format('YYYY'),
  });

  // Создаем список всех дат с событиями для текущего месяца
  const datesWithEvents = useMemo(() => {
    if (!data) return [];

    const datesMap = new Map<string, IEvent[]>();

    data.forEach(event => {
      const dateKey = dayjs(event.date).format('YYYY-MM-DD');
      if (!datesMap.has(dateKey)) {
        datesMap.set(dateKey, []);
      }
      datesMap.get(dateKey)!.push(event);
    });

    return Array.from(datesMap.entries())
      .map(([dateKey, events]) => ({
        date: dayjs(dateKey),
        events,
      }))
      .sort((a, b) => a.date.valueOf() - b.date.valueOf());
  }, [data]);

  // Функция для поиска следующей даты с событиями
  const findNextDateWithEvents = (fromDate: Dayjs): Dayjs | null => {
    const currentIndex = datesWithEvents.findIndex(item =>
      item.date.isSame(fromDate, 'day'),
    );

    if (currentIndex === -1 || currentIndex === datesWithEvents.length - 1) {
      return null; // текущей даты нет в списке или это последняя дата
    }

    return datesWithEvents[currentIndex + 1].date;
  };

  // Функция для поиска предыдущей даты с событиями
  const findPrevDateWithEvents = (fromDate: Dayjs): Dayjs | null => {
    const currentIndex = datesWithEvents.findIndex(item =>
      item.date.isSame(fromDate, 'day'),
    );

    if (currentIndex <= 0) {
      return null; // текущей даты нет в списке или это первая дата
    }

    return datesWithEvents[currentIndex - 1].date;
  };

  // Обновляем activeEvents при изменении данных или даты
  useEffect(() => {
    if (data) {
      const newEvents = getDateEvents(currentDate, data);
      setActiveEvents(newEvents);
    }
  }, [data, currentDate]);

  // Сбрасываем на исходную дату при открытии модалки
  useEffect(() => {
    if (open) {
      setCurrentDate(date);
      setActiveEvents(events);
    }
  }, [open, date, events]);

  const getDateEvents = (date: Dayjs, data: IEvent[]): IEvent[] => {
    const dateStr = date.format('YYYY-MM-DD');
    return data.filter(
      event => dayjs(event.date).format('YYYY-MM-DD') === dateStr,
    );
  };

  const handleNext = () => {
    const nextDate = findNextDateWithEvents(currentDate);
    if (nextDate) {
      setCurrentDate(nextDate);
    }
  };

  const handlePrev = () => {
    const prevDate = findPrevDateWithEvents(currentDate);
    if (prevDate) {
      setCurrentDate(prevDate);
    }
  };

  // Проверяем, есть ли следующая/предыдущая дата с событиями
  const hasNextDate = !!findNextDateWithEvents(currentDate);
  const hasPrevDate = !!findPrevDateWithEvents(currentDate);

  const handleClose = () => {
    setCurrentDate(date);
    onClose();
  };

  if (!open) return null;

  return (
    <ModalWrapper
      open={open}
      onClose={handleClose}
      title={
        <DateTabs
          date={currentDate.format('DD MMMM YYYY')}
          onNext={handleNext}
          onPrev={handlePrev}
          disabledNext={!hasNextDate}
          disabledPrev={!hasPrevDate}
        />
      }
      classNames="lg:max-w-[1080px]"
      styles={{ backgroundColor: 'var(--bg-secondary)', maxHeight: 'none' }}
    >
      <FormAccreditationApp
        date={currentDate}
        events={activeEvents}
        onClose={onClose}
      />
    </ModalWrapper>
  );
}
