//@Libs
import cn from 'classnames';
//@Types
import { ITagProps } from './Tag.props';
//@Styles
import s from './Tag.module.css';

export const Tag = ({
	children,
	href,
	size = 'm',
	colorType,
	className,
	...props
}: ITagProps): JSX.Element => {
	return (
		<div
			{...props}
			className={cn(s.tag, className, {
				[s.s]: size === 's',
				[s.m]: size === 'm',
				[s.ghost]: colorType === 'ghost',
				[s.grey]: colorType === 'grey',
				[s.red]: colorType === 'red',
				[s.green]: colorType === 'green',
				[s.primary]: colorType === 'primary',
			})}
		>
			{href ? <a href={href}>{children}</a> : <>{children}</>}
		</div>
	);
};
