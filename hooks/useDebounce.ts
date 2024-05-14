import {useEffect, useState} from "react";

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

 // In the above code, we have created a custom hook called  useDebounce  that takes two arguments:  value  and  delay . The  value  is the value that you want to debounce, and the  delay  is the time in milliseconds after which the value will be debounced.
 // The hook uses the  useState  and  useEffect  hooks to debounce the value. It sets the debounced value after the specified delay using  setTimeout .
 // Now, let’s see how we can use this custom hook in a React component.
 // Using the useDebounce Hook in a React Component
 // Here’s an example of how you can use the  useDebounce  hook in a React component:
 // Path: components/DebouncedInput.tsx