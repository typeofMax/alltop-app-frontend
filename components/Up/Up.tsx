//@Libs and Types
import { useAnimation, motion } from 'framer-motion';
import { IUpProps } from './Up.props';
import { FC, useEffect } from 'react';
import { useScrollY } from '../../core/hooks/useScrollY';
//@Styles
import s from './Up.module.css';
//@Images
import UpIcon from './upArrow.svg';

export const Up: FC<IUpProps> = () => {
	const controls = useAnimation();
	const y = useScrollY();

	useEffect(() => {
		controls.start({ opacity: y / document.body.scrollHeight });
	}, [y, controls]);

	const scrollToTop = (): void => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<motion.button className={s.wrapper} onClick={scrollToTop} animate={controls} initial={{opacity: 0}}>
			<UpIcon />
		</motion.button>
	);
};
