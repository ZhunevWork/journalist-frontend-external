import { useCallback, useMemo, useState } from 'react';

export const useEmailMask = (initialValue: string = '') => {
  const [email, setEmail] = useState(initialValue);

  const onChange = useCallback((value: string) => {
    // Убираем все пробелы из значения
    const cleanedValue = value.replace(/\s/g, '');
    setEmail(cleanedValue);
  }, []);

  const isValid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, [email]);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    // Блокируем пробел и другие недопустимые символы
    const blockedKeys = [
      ' ',
      '<',
      '>',
      '(',
      ')',
      '[',
      ']',
      '{',
      '}',
      ';',
      ':',
      ',',
      '?',
      '/',
      '\\',
      '|',
      '`',
      '~',
      '!',
      '#',
      '$',
      '%',
      '^',
      '&',
      '*',
      '+',
      '=',
    ];

    if (blockedKeys.includes(e.key)) {
      e.preventDefault();
    }
  }, []);

  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return {
    email,
    pattern,
    onChange,
    onKeyDown,
    isValid,
  };
};
