import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

export const useChangeParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Функция для изменения одного параметра
  const changeParam = useCallback(
    (key: string, value: string | number | boolean | null) => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (value === null || value === '' || value === false) {
        // Удаляем параметр если значение null, пустая строка или false
        newSearchParams.delete(key);
      } else {
        // Преобразуем значение в строку и устанавливаем параметр
        newSearchParams.set(key, String(value));
      }

      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams],
  );

  // Функция для изменения нескольких параметров одновременно
  const changeMultipleParams = useCallback(
    (params: Record<string, string | number | boolean | null>) => {
      const newSearchParams = new URLSearchParams(searchParams);

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === '' || value === false) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      });

      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams],
  );

  // Функция для удаления параметра
  const removeParam = useCallback(
    (key: string) => {
      changeParam(key, null);
    },
    [changeParam],
  );

  // Функция для получения значения параметра
  const getParam = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams],
  );

  // Функция для получения всех параметров в виде объекта
  const getAllParams = useCallback(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  // Функция для очистки всех параметров
  const clearAllParams = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  return {
    changeParam,
    changeMultipleParams,
    removeParam,
    getParam,
    getAllParams,
    clearAllParams,
  };
};
