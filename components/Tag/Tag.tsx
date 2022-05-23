//Libs
import cn from 'classnames';
//Types
import { TagProps } from './Tag.props';
//Styles
import styles from './Tag.module.css';

export const Tag = ({
	size,
	children,
	color,
	className,
	...props
}: TagProps): JSX.Element => {
	return (
		<div
			className={cn(
				styles.tag,
				className,
				{ [styles.s]: size === 's' },
				{ [styles.m]: size === 'm' },
				{ [styles.ghost]: color === 'ghost' },
				{ [styles.green]: color === 'green' },
				{ [styles.red]: color === 'red' },
				{ [styles.primary]: color === 'primary' },
				{ [styles.gray]: color === 'gray' }
			)}
			{...props}
		>
			{children}
		</div>
	);
};
