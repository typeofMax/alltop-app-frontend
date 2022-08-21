//@Libs
import cn from 'classnames';
//@Types
import { FC } from 'react';
import { ITagProps } from './Tag.props';
//@Styles
import s from './Tag.module.css';

export const Tag: FC<ITagProps> = ({ children, href, size = 'm', colorType, className, ...props }) => {
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
