import clsx from 'clsx';
import { useEffect, useRef, useState, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  label: string;
  classNames?: string;
  iconRight?: React.ReactNode;
}

export default function Input(props: InputProps) {
  const {
    error,
    classNames = '',
    label,
    iconRight,
    value,
    onChange,
    onBlur,
    ...rest
  } = props;
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [autoFilled, setAutoFilled] = useState(false);

  const hasValue = Boolean(
    (typeof value === 'string' && value.length > 0) ||
      (inputRef.current && inputRef.current.value.length > 0) ||
      autoFilled,
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (inputRef.current?.matches(':-webkit-autofill')) {
        setAutoFilled(true);
        setFocused(true);
      }
    });

    if (inputRef.current) {
      observer.observe(inputRef.current, {
        attributes: true,
        attributeFilter: ['class'],
      });

      if (inputRef.current.matches(':-webkit-autofill')) {
        setAutoFilled(true);
        setFocused(true);
      }
    }

    return () => observer.disconnect();
  }, []);

  return (
    <label
      className={clsx(
        'relative md:w-auto w-full h-12 flex items-end',
        classNames,
      )}
    >
      <input
        ref={inputRef}
        value={value}
        onChange={e => {
          onChange?.(e);
          setAutoFilled(false);
          setFocused(!!e.target.value);
        }}
        onBlur={e => {
          onBlur?.(e);
          setFocused(!!e.target.value);
        }}
        onFocus={() => setFocused(true)}
        className={clsx(
          'w-full px-3 py-0.5 pt-[20px] border rounded-lg outline-none',
          rest.disabled
            ? 'bg-(--bg-secondary)'
            : 'focus:border-black focus:ring-black hover:border-black',
          error ? 'border-red-500' : 'border-(--gray-light)',
        )}
        {...rest} // Остальные пропсы в конце!
      />

      {label && (
        <span
          className={clsx(
            'absolute left-3 bottom-2.5 text-gray-400 transition-all duration-200 pointer-events-none',
            focused || hasValue ? 'bottom-7 text-[10px]' : '',
          )}
        >
          {label}
        </span>
      )}

      {iconRight && (
        <div className="h-full right-3.5 flex items-center absolute">
          {iconRight}
        </div>
      )}
    </label>
  );
}
