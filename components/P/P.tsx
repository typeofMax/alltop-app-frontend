//Libs
import cn from 'classnames';
//Types
import { PProps } from './P.props';
//Styles
import styles from './P.module.css';

export const P = ({
	size,
	children,
	className,
	...props
}: PProps): JSX.Element => {
	return (
		<p
			className={cn(
				className,
				{ [styles.s]: size === 's' },
				{ [styles.m]: size === 'm' },
				{ [styles.l]: size === 'l' }
			)}
			{...props}
		>
			{children}
		</p>
	);
};
