import clsx from 'clsx';
import React, { type ReactNode } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  classNames?: string;
  error?: boolean;
}

export default function Checkbox(props: CheckboxProps) {
  const { label, classNames, error, ...rest } = props;

  return (
    <label
      className={clsx(
        'flex items-center cursor-pointer select-none',
        classNames,
      )}
    >
      <input type="checkbox" className={`peer sr-only`} {...rest} />
      <span
        className={clsx(
          'w-4 h-4 flex items-center justify-center border-2 border-black rounded transition-all peer-checked:bg-black mr-2',
          error ? 'border-red-500' : 'border-(--gray-light)',
        )}
      >
        <img src="./icons/check.svg" alt="check" />
      </span>
      {label && <span className="text-gray-800">{label}</span>}
    </label>
  );
}
