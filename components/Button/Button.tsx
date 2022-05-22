//Libs
import cn from 'classnames';
//Types
import { ButtonProps } from './Button.props';
//Styles
import styles from './Button.module.css';
//Images
import ArrowIcon from './arrow.svg';

export const Button = ({
	children,
	appearance,
	arrow = 'none',
	className,
	...props
}: ButtonProps): JSX.Element => {
	return (
		<button
			className={cn(
				styles.button, className,
				{ [styles.primary]: appearance === 'primary' },
				{ [styles.ghost]: appearance === 'ghost' }
			)}
			{...props}
		>
			{children}
			{arrow !== 'none' && (
				<span className={cn(styles.arrow, { [styles.down]: arrow === 'down' })}>
					<ArrowIcon />
				</span>
			)}
		</button>
	);
};
