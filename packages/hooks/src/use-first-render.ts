import { useRef, useEffect } from 'react';

export type Callback = () => void;

/**
 * 컴포넌트가 처음 렌더링될 때 특정 콜백을 실행합니다.
 * @param callback 처음 렌더링될 때 실행할 콜백 함수입니다.
 */
export function useFirstRender(callback: Callback): void {
	const firstRender = useRef(true);

	useEffect(() => {
		if (firstRender.current) {
			callback();
			firstRender.current = false;
		}
	}, [callback]);
}
