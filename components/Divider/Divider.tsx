//@Libs
import cn from 'classnames';
//@Types
import { FC } from 'react';
import { IDividerProps } from './Divider.props';
//@Styles
import s from './Divider.module.css';

export const Divider: FC<IDividerProps> = ({ className, ...props }) => {
	return <hr className={cn(s.item, className)} {...props}/>;
};
