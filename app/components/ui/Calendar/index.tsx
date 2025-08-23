import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';

import 'dayjs/locale/ru';

import { getMonthMatrix } from '~/components/ui/Calendar/lib';

dayjs.locale('ru');

const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

interface CalendarDayData {
  date: Dayjs;
  content?: React.ReactNode;
}

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
      <div className="flex items-center justify-start gap-2 md:gap-4 mb-2 md:mb-4">
        <button
          className="p-1 md:p-2 rounded hover:rounded-full hover:bg-gray-100 transition cursor-pointer"
          onClick={handlePrev}
          aria-label="Предыдущий месяц"
        >
          <img src="./icons/round-arrow-back.svg" alt="arrow back" />
        </button>
        <div className="font-semibold text-lg md:text-2xl">
          {MONTHS[month]}, {year}
        </div>
        <button
          className="p-1 md:p-2 rounded hover:rounded-full hover:bg-gray-100 transition cursor-pointer"
          onClick={handleNext}
          aria-label="Следующий месяц"
        >
          <img src="./icons/round-arrow-next.svg" alt="arrow next" />
        </button>
      </div>
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
              <div
                key={date.format('YYYY-MM-DD')}
                className={clsx(
                  'flex flex-col items-center justify-start rounded-lg md:rounded-xl cursor-pointer transition p-1 md:p-2 h-[40px] md:h-[80px] hover:border-black focus-visible:border-black outline-none',
                  isCurrentMonth
                    ? 'border border-(--gray-light) text-gray-900 hover:bg-blue-50 '
                    : 'bg-(--bg-disabled) text-gray-400',
                )}
                tabIndex={isCurrentMonth ? 0 : -1}
                aria-label={`${date.date()} ${MONTHS[date.month()]}, ${date.year()}`}
              >
                <div className="font-semibold w-full text-xs md:text-base">
                  {date.date()}
                </div>
                <div className="mt-0.5 md:mt-1 text-[9px] md:text-xs w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {data?.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
