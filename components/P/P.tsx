//@Libs
import cn from 'classnames';
//@Types
import { IPProps } from './P.props';
//@Styles
import s from './P.module.css';

export const P = ({ children, size = 'm' }: IPProps): JSX.Element => {
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
