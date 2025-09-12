import ModalCellAccreditationApp from '~/components/Modal/ModalCellAccreditationApp';
import type { CalendarDayData } from '~/components/ui/Calendar/types';
import { MONTHS } from '~/mock/months';
import clsx from 'clsx';
import type { Dayjs } from 'dayjs';
import { useState } from 'react';

interface ICellProps {
  date: Dayjs;
  isCurrentMonth: boolean;
  data: CalendarDayData | undefined;
}

const getEventWord = (count: number) => {
  if (count === 0) return 'событий';
  if (count % 10 === 1 && count % 100 !== 11) return 'событие';
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100))
    return 'события';
  return 'событий';
};

export default function Cell(props: ICellProps) {
  const { date, isCurrentMonth, data } = props;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        key={date.format('YYYY-MM-DD')}
        className={clsx(
          'flex flex-col items-center justify-start rounded-lg md:rounded-xl cursor-pointer transition p-1 md:p-2 h-[57px] md:h-[80px] hover:border-black focus-visible:border-black outline-none',
          isCurrentMonth
            ? 'border border-(--gray-light) text-gray-900 hover:bg-blue-50 '
            : 'bg-(--bg-disabled) text-gray-400',
        )}
        tabIndex={isCurrentMonth ? 0 : -1}
        aria-label={`${date.date()} ${MONTHS[date.month()]}, ${date.year()}`}
        onClick={() => data?.content && setModalOpen(true)}
      >
        <div className="w-full flex items-center justify-between mb-auto">
          <span className="text-(--font-halvar) md:text-xl text-base">
            {date.date()}
          </span>

          {data?.content && (
            <div className="h-[10px] w-[10px] rounded-full bg-(--red)"></div>
          )}
        </div>
        <div className="mt-0.5 md:mt-1 text-[14px] w-full overflow-hidden text-ellipsis whitespace-nowrap text-(--txt-secondary)">
          {data?.content} {data?.content && getEventWord(data?.content)}
        </div>
      </div>

      <ModalCellAccreditationApp
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        date={data?.date || date}
        events={data?.events || []}
      />
    </>
  );
}
