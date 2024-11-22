import { useCallback, useSyncExternalStore } from 'react';

export const useLocalStorage = <T>(key: string) => {
	const setStorage = useCallback(
		(value: T) => {
			const newValue =
				typeof value === 'string' ? value : JSON.stringify(value);
			localStorage.setItem(key, newValue);
			dispatchEvent(new StorageEvent('storage', { key: key, newValue }));
		},
		[key],
	);

	const removeStorage = useCallback(() => {
		localStorage.removeItem(key);
		dispatchEvent(new StorageEvent('storage', { key: key }));
	}, [key]);

	const getSnapshot = () => localStorage.getItem(key);

	const subscribe = (listener: () => void) => {
		window.addEventListener('storage', listener);
		return () => window.removeEventListener('storage', listener);
	};

	const store = useSyncExternalStore(subscribe, getSnapshot);

	return { value: store, set: setStorage, remove: removeStorage };
};
