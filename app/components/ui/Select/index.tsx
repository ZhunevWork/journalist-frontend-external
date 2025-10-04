import clsx from 'clsx';
import { useState } from 'react';
import ReactSelect, { type SingleValue } from 'react-select';

import './styles.css';

interface OptionType {
  value: string;
  label: string;
}

interface CustomSelectProps {
  error?: boolean;
  label?: string;
  classNames?: string;
  defaultValue?: string;
  isClearable?: boolean;
  onChange?: (value: string) => void;
}

const options: OptionType[] = [
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'delayed', label: 'Delayed' },
  { value: 'canceled', label: 'Canceled' },
];

export default function Select(props: CustomSelectProps) {
  const {
    error,
    classNames = '',
    label,
    defaultValue,
    isClearable,
    onChange,
    ...rest
  } = props;

  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState<OptionType | null>(
    options.find(opt => opt.value === defaultValue) || null,
  );

  const hasValue = !!selected;

  const handleChange = (option: SingleValue<OptionType>) => {
    setSelected(option);
    if (onChange && option) onChange(option.value);
  };

  return (
    <div className={clsx('relative w-full', classNames)}>
      {label && (
        <span
          className={clsx(
            'absolute left-3 text-gray-400 pointer-events-none transition-all duration-200 z-10 bg-white px-1 text-nowrap',
            focused || hasValue
              ? 'top-1 text-[10px]'
              : 'top-1/2 -translate-y-1/2 text-base',
          )}
        >
          {label}
        </span>
      )}
      <ReactSelect
        options={options}
        value={selected}
        onChange={e => handleChange(e)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        classNamePrefix="custom-select"
        className={clsx('w-full')}
        styles={{
          control: (base, state) => ({
            ...base,
            minHeight: '48px',
            borderRadius: '0.5rem',
            borderColor: error ? '#ef4444' : 'var(--gray-light)',
            border: state.isFocused ? '0 0 0 1px #000' : undefined,
            boxShadow: 'none',
            paddingLeft: '4px',
            backgroundColor: 'white',
          }),
          valueContainer: base => ({
            ...base,
            paddingTop: label ? '12px' : undefined,
          }),
          placeholder: base => ({
            ...base,
            color: '#9ca3af',
          }),
          dropdownIndicator: (base, state) => ({
            ...base,
            color: '#9ca3af',
            transition: 'transform 0.2s',
            transform: state.selectProps.menuIsOpen
              ? 'rotate(180deg)'
              : undefined,
          }),
        }}
        isClearable={isClearable}
        placeholder=""
        {...rest}
      />
    </div>
  );
}
