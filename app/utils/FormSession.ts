export const loadFormFromSession = <T>(key: string): T | null => {
  const raw = sessionStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

export const saveFormToSession = <D>(key: string, data: D) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};
