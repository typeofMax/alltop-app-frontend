//@Libs
import cn from 'classnames';
//@Types
import { FC } from 'react';
import { IButtonProps } from './Button.props';
//@Styles
import s from './Button.module.css';
//@Images
import ArrowIcon from './arrow.svg';

export const Button: FC<IButtonProps> = ({
	appearance,
	arrow = 'none',
	children,
	className,
	...props
}) => {
	return (
		<button
			className={cn(s.button, className, {
				[s.primary]: appearance === 'primary',
				[s.ghost]: appearance === 'ghost',
			})}
			{...props}
		>
			{children}
			{arrow !== 'none' && (
				<span className={cn(s.arrow, { [s.down]: arrow === 'down' })}>
					<ArrowIcon />
				</span>
			)}
		</button>
	);
};
