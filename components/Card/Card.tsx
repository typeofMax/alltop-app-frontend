/* eslint-disable react/display-name */
//@Libs
import cn from 'classnames';
//@Types
import { ForwardedRef, forwardRef } from 'react';
import { ICardProps } from './Card.props';
//@Styles
import s from './Card.module.css';

export const Card = forwardRef(
	(
		{ children, color = 'white', className, ...props }: ICardProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		return (
			<div
				className={cn(s.card, className, {
					[s.blue]: color == 'blue',
				})}
				{...props}
				ref={ref}
			>
				{children}
			</div>
		);
	}
);
