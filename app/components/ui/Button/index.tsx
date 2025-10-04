import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  classNames?: string;
  styleType?: 'default' | 'primary' | 'secondary' | 'tertiary';
}

export default function Button(props: ButtonProps) {
  const { children, classNames = '', styleType = 'default', ...rest } = props;

  return (
    <button
      className={clsx(
        'h-12 px-6 rounded-xl disabled:bg-(--bg-disabled) transition-all cursor-pointer disabled:cursor-auto disabled:text-(--text-disabled) hover:opacity-90 font-medium min-w-12 text-center flex justify-center items-center',
        classNames,
        styleType === 'default' && 'text-white bg-(--red)',
        styleType === 'primary' &&
          'bg-white text-black border border-(--gray-light) shadow-lg hover:bg-(--bg-secondary) active:opacity-70',
        styleType === 'secondary' &&
          'bg-(--bg-secondary) hover:bg-white border border-(--gray-light)',
        styleType === 'tertiary' && 'bg-(--bg-brand) text-white',
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
