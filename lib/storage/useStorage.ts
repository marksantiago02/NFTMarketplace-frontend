import { useEffect, useState } from "react";

import type {
  LocalStorageItems,
  SessionStorageItems,
} from "@/lib/storage/index";

type Storage = "localStorage" | "sessionStorage";
type InitialValue<T> = T extends unknown ? T | (() => T) : never;
type ReturnArray<T> = [T, (value: T | null) => void];

const useStorage = <T, K extends string = string>(
  storage: Storage,
  key: K,
  initialValue?: InitialValue<T>
): ReturnArray<T> => {
  const getInitialValue = () => {
    if (typeof initialValue === "function") {
      return initialValue();
    }

    if (initialValue) {
      return initialValue;
    }

    if (typeof window !== "undefined") {
      const value = window[storage].getItem(key);
      return value ? JSON.parse(value) : value;
    }
  };

  const [storedValue, _setStoredValue] = useState(getInitialValue);

  const initialize = () => {
    try {
      setStoredValue(getInitialValue());
    } catch (e) {
      if (e instanceof Error) {
        console.error(
          `Unable to initialize ${storage} with key ${key}. ${e.toString()}`
        );
      }
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const setStoredValue = (value: T | null) => {
    try {
      if (value === undefined) {
        value = null;
      }

      _setStoredValue(value);
      window[storage].setItem(key, JSON.stringify(value));
    } catch (e) {
      if (e instanceof Error) {
        console.error(
          `Unable to set ${storage} ${key} value: ${value}. ${e.toString()}`
        );
      }
    }
  };

  return [storedValue, setStoredValue];
};

export const useLocalStorage = <T extends keyof LocalStorageItems>(
  key: T,
  initialValue?: InitialValue<LocalStorageItems[T]>
): ReturnArray<LocalStorageItems[T]> =>
  useStorage("localStorage", key, initialValue);

export const useSessionStorage = <T extends keyof SessionStorageItems>(
  key: T,
  initialValue?: InitialValue<SessionStorageItems[T]>
): ReturnArray<SessionStorageItems[T]> =>
  useStorage("sessionStorage", key, initialValue);
