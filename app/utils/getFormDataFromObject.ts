export function getFormDataFromObject<T extends Record<string, any>>(data: T) {
  const formData = new FormData();

  function appendFormData(key: string, value: any) {
    if (value === null || value === undefined) {
      return;
    }

    if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } else if (value instanceof File) {
      formData.append(key, value);
    } else if (value instanceof Blob) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        appendFormData(`${key}[${index}]`, item);
      });
    } else if (typeof value === 'object') {
      Object.keys(value).forEach(prop => {
        appendFormData(`${key}[${prop}]`, value[prop]);
      });
    } else {
      formData.append(key, value.toString());
    }
  }

  Object.keys(data).forEach(key => {
    appendFormData(key, data[key]);
  });

  return formData;
}
