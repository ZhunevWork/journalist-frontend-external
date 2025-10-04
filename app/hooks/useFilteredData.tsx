import { useMemo } from 'react';

export const useFilteredData = () => {
  const filterByField = useMemo(() => {
    return <T,>(
      data: T[],
      searchQuery: string,
      fieldSelector: (item: T) => string,
    ): T[] => {
      if (!searchQuery) return data;

      const query = searchQuery.toLowerCase();
      return data.filter(item => {
        const fieldValue = fieldSelector(item);
        return fieldValue.toLowerCase().includes(query);
      });
    };
  }, []);

  const filterByMultipleFields = useMemo(() => {
    return <T,>(
      data: T[],
      searchQuery: string,
      fieldSelectors: ((item: T) => string)[],
    ): T[] => {
      if (!searchQuery) return data;

      const query = searchQuery.toLowerCase();
      return data.filter(item => {
        return fieldSelectors.some(selector => {
          const fieldValue = selector(item);
          return fieldValue.toLowerCase().includes(query);
        });
      });
    };
  }, []);

  return {
    filterByField,
    filterByMultipleFields,
  };
};
