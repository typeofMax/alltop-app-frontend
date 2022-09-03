//@Libs
import cn from 'classnames';
//@Types
import { FC } from 'react';
import { ICardProps } from './Card.props';
//@Styles
import s from './Card.module.css';

export const Card: FC<ICardProps> = ({ children, color = 'white', className, ...props }) => {
	return (
		<div
			className={cn(s.card, className, {
				[s.blue]: color == 'blue',
			})}
			{...props}
		>
			{children}
		</div>
	);
};
