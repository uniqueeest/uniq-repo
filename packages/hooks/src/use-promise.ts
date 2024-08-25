import { useState, useEffect, DependencyList } from 'react';

export type PromiseResult<T> =
	| PromisePendingResult<T>
	| (PromiseSettledResult<T> & { refresh: () => void });

export interface PromisePendingResult<T> {
	status: 'pending';
	value?: T;
}

export type PromiseFactoryFn<T> = (signal: AbortSignal) => T | Promise<T>;

/**
 * @param factory Promise를 생성하는 함수입니다.
 * @param deps 존재하는 경우, 이 리스트의 값들이 변경되면 Promise가 재생성됩니다.
 */
export function usePromise<T>(
	factory: PromiseFactoryFn<T>,
	deps: DependencyList = [],
): PromiseResult<T> {
	const [result, setResult] = useState<PromiseResult<T>>({ status: 'pending' });

	useEffect(function effect() {
		if (result.status === 'pending') {
			setResult((s) => ({
				...s,
				status: 'pending',
			}));
		}

		const controller = new AbortController();
		const { signal } = controller;

		const handlePromise = async () => {
			const [promiseResult] = await Promise.allSettled([factory(signal)]);

			if (!signal.aborted) {
				setResult({ ...promiseResult, refresh: effect });
			}
		};

		handlePromise();

		return () => controller.abort();
	}, deps);

	return result;
}
