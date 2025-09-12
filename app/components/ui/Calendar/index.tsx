import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

import 'dayjs/locale/ru';

import Cell from '~/components/ui/Calendar/Cell';
import { getMonthMatrix } from '~/components/ui/Calendar/lib';
import type { CalendarDayData } from '~/components/ui/Calendar/types';
import DateTabs from '~/components/ui/DateTabs';
import { MONTHS } from '~/mock/months';

dayjs.locale('ru');

interface CalendarProps {
  value?: Dayjs;
  onMonthChange?: (date: Dayjs) => void;
  dayData?: (date: Dayjs) => CalendarDayData | undefined;
}

export default function Calendar({
  value,
  onMonthChange,
  dayData,
}: CalendarProps) {
  const [current, setCurrent] = useState<Dayjs>(() => value || dayjs());

  const year = current.year();
  const month = current.month();

  const matrix = getMonthMatrix(year, month);

  const handlePrev = () => {
    const prev = current.subtract(1, 'month').startOf('month');
    setCurrent(prev);
    onMonthChange?.(prev);
  };

  const handleNext = () => {
    const next = current.add(1, 'month').startOf('month');
    setCurrent(next);
    onMonthChange?.(next);
  };

  return (
    <div className="w-full max-w-[960px] md:rounded-3xl rounded-xl shadow bg-(--bg-secondary) p-2 md:p-4">
      <DateTabs
        date={`${MONTHS[month]}, ${year}`}
        onNext={handleNext}
        onPrev={handlePrev}
      />
      <div className="rounded-lg md:rounded-xl bg-white border border-(--gray-light) p-2 md:p-5">
        {/* Days of week */}
        <div className="grid grid-cols-7 mb-2 md:mb-4.5 text-center text-(--gray) text-[10px] md:text-xs font-medium border-b border-(--gray-light) pb-2 md:pb-4">
          <div>Пн</div>
          <div>Вт</div>
          <div>Ср</div>
          <div>Чт</div>
          <div>Пт</div>
          <div>Сб</div>
          <div>Вс</div>
        </div>
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 md:gap-2.5">
          {matrix.flat().map(({ date, isCurrentMonth }) => {
            const data = dayData?.(date);

            return (
              <Cell data={data} isCurrentMonth={isCurrentMonth} date={date} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
