import { useEffect, useState } from "react";

export const useDebounceValue: <T>(value: T, delay: number) => T = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
  const timeoutId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timeoutId);
  }, [delay, value])
  
  return debouncedValue;
};