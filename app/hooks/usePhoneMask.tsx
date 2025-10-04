import { useCallback, useMemo, useState } from 'react';

export const usePhoneMask = (initialValue: string = '') => {
  const [phone, setPhone] = useState(initialValue);

  const formatPhone = useCallback((inputValue: string): string => {
    // Удаляем все нецифровые символы
    const numbers = inputValue.replace(/\D/g, '');

    // Если номер пустой
    if (!numbers) return '';

    // Обрабатываем российские номера
    let formattedNumber = numbers;

    // Если номер начинается с 8, заменяем на 7
    if (formattedNumber.startsWith('8')) {
      formattedNumber = '7' + formattedNumber.slice(1);
    }

    // Если номер не начинается с 7, добавляем 7 в начало
    if (!formattedNumber.startsWith('7') && formattedNumber.length > 0) {
      formattedNumber = '7' + formattedNumber;
    }

    // Ограничиваем длину (11 цифр)
    formattedNumber = formattedNumber.slice(0, 11);

    // Форматируем по шаблону
    if (formattedNumber.length <= 1) {
      return `+7`;
    }
    if (formattedNumber.length <= 4) {
      return `+7 (${formattedNumber.slice(1)}`;
    }
    if (formattedNumber.length <= 7) {
      return `+7 (${formattedNumber.slice(1, 4)}) ${formattedNumber.slice(4)}`;
    }
    if (formattedNumber.length <= 9) {
      return `+7 (${formattedNumber.slice(1, 4)}) ${formattedNumber.slice(4, 7)}-${formattedNumber.slice(7)}`;
    }

    return `+7 (${formattedNumber.slice(1, 4)}) ${formattedNumber.slice(4, 7)}-${formattedNumber.slice(7, 9)}-${formattedNumber.slice(9)}`;
  }, []);

  const onChange = useCallback(
    (value: string) => {
      const formattedValue = formatPhone(value);
      setPhone(formattedValue);
    },
    [formatPhone],
  );

  const isValid = useMemo(() => {
    const numbers = phone.replace(/\D/g, '');
    return numbers.length === 11;
  }, [phone]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Разрешаем только цифры и управляющие клавиши
      const isNumber = /^\d$/.test(e.key);
      const isControlKey = [
        'Backspace',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'Tab',
        'Home',
        'End',
        'Enter',
      ].includes(e.key);
      const isModifierKey = e.ctrlKey || e.metaKey || e.altKey;

      // Получаем текущее количество цифр
      const currentDigits = phone.replace(/\D/g, '').length;

      // Блокируем если:
      // 1. Не цифра и не управляющая клавиша
      // 2. Или если уже 11 цифр и пользователь пытается ввести еще одну цифру
      if (
        (!isNumber && !isControlKey && !isModifierKey) ||
        (isNumber && currentDigits >= 11)
      ) {
        e.preventDefault();
      }
    },
    [phone],
  );

  const pattern = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;

  return {
    phone,
    pattern,
    onChange,
    onKeyDown,
    isValid,
  };
};
