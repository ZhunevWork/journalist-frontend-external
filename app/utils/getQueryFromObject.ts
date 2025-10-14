export const getQueryFromObject = <T>(
  params?: Partial<Record<keyof T, unknown>>,
): string => {
  if (!params) return '';

  return Object.entries(params).reduce((acc, [key, value]) => {
    if (value == undefined || value == null) return acc;

    if (!Array.isArray(value))
      return acc
        ? `${acc}&${key}=${value.toString()}`
        : `?${key}=${value.toString()}`;

    const newValue: string = value.reduce((accStr, it, index) => {
      if (!it) return accStr;
      if (index === 0) {
        accStr += `${key}=${it.toString()}`;

        return accStr;
      }
      accStr += `&${key}=${it.toString()}`;

      return accStr;
    }, '');

    return acc ? `${acc}&${newValue}` : `?${newValue}`;
  }, '');
};
