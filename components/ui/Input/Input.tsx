//@Libs
import cn from 'classnames';
//@Types
import { FC } from 'react';
import { IInputProps } from './Input.props';
//@Styles
import s from './Input.module.css';

export const Input: FC<IInputProps> = ({ className, ...props }) => {
	return (
		<input className={cn(s.item, className)} {...props}/>
	);
};
