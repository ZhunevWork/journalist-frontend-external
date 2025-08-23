import clsx from 'clsx';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

interface DatePickerProps {
  error?: boolean;
  label: string;
  onChange?: (date: Date | null) => void;
  selected?: Date;
  classNames?: string;
}

export default function DatePicker(props: DatePickerProps) {
  const { error, label, onChange, classNames, selected } = props;

  const [date, setDate] = useState<Date | null>(null);
  const [focused, setFocused] = useState(false);

  const hasValue =
    selected !== null && selected instanceof Date && !isNaN(selected.getTime());

  const handleChange = (date: Date | null) => {
    console.log(date);
    setDate(date);
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <label
      className={clsx(
        'relative md:w-auto w-full h-12 flex items-end',
        classNames,
      )}
    >
      <ReactDatePicker
        selected={date}
        dateFormat="dd.MM.yyyy"
        onFocus={() => setFocused(true)}
        onChange={e => handleChange(e)}
        onBlur={e => setFocused(!!(e.target as HTMLInputElement).value)}
        className={clsx(
          'w-full px-3 py-0.5 outline-none peer border rounded-lg focus:ring-black focus:border-black hover:border-black pt-[20px]',
          error ? 'border-red-500' : 'border-(--gray-light)',
        )}
        calendarClassName="rounded-lg shadow-lg border border-(--bg-secondary)"
        popperClassName="z-50"
      />
      {label && (
        <span
          className={`
            absolute left-3 bottom-2.5 text-gray-400 pointer-events-none transition-all duration-200
            ${focused || hasValue ? 'bottom-7 text-[10px]' : ''}
          `}
        >
          {label}
        </span>
      )}
      <div className="h-full right-3.5 flex items-center absolute">
        <img src="./icons/calendar.svg" alt="calendar" />
      </div>
    </label>
  );
}
