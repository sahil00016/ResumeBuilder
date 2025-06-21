import { useState, useEffect } from 'react';

export function useSessionStorageState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const storedValue = sessionStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error("Error reading from sessionStorage", error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Error writing to sessionStorage", error);
    }
  }, [key, state]);

  return [state, setState];
} 