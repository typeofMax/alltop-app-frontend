import { useEffect, useState } from 'react';

export const useScrollY = (): number => {
	const [scrollY, setScrollY] = useState<number>(0);
	const isBrowser = typeof window !== 'undefined';

	const handleScroll = (): void => {
		const currentScrollY = isBrowser ? window.scrollY : 0;
		setScrollY(currentScrollY);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return scrollY;
};
