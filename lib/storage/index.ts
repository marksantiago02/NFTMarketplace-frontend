export type LocalStorageItems = {
    token?: string;
};

export type SessionStorageItems = {};

export const getLocalStorageItem = <T extends keyof LocalStorageItems>(
    key: T
): LocalStorageItems[T] => {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
};

export const setLocalStorageItem = <T extends keyof LocalStorageItems>(
    key: T,
    value: LocalStorageItems[T]
) => {
    if (value === undefined) {
        window.localStorage.removeItem(key);
        return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorageItem = <T extends keyof LocalStorageItems>(
    key: T
) => {
    window.localStorage.removeItem(key);
};
