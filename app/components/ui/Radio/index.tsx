import clsx from 'clsx';
import React from 'react';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  error?: boolean;
}

export function Radio(props: RadioProps) {
  const { checked, onChange, label, error, ...rest } = props;

  return (
    <label
      className={clsx(
        'inline-flex items-center gap-2',
        rest.disabled ? 'cursor-auto' : 'cursor-pointer',
      )}
    >
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
        {...rest}
      />
      <span
        className={clsx(
          'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
          error ? 'border-red-500' : 'border-(--gray-light)',
          rest.disabled
            ? 'peer-checked:bg-(--icon-inactive) border-(--icon-inactive)'
            : 'peer-checked:bg-black border-black',
        )}
      >
        <span className="w-4 h-4 rounded-full border border-white" />
      </span>
      {label && label}
    </label>
  );
}
