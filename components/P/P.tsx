//@Libs
import cn from 'classnames';
//@Types
import { FC } from 'react';
import { IPProps } from './P.props';
//@Styles
import s from './P.module.css';

export const P: FC<IPProps> = ({ children, size = 'm' }) => {
	return (
		<p
			className={cn({
				[s.small]: size === 's',
				[s.big]: size === 'l',
				[s.middle]: size === 'm',
			})}
		>
			{children}
		</p>
	);
};
