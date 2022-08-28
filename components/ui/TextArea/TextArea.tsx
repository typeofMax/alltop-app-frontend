//@Libs
import cn from 'classnames';
//@Types
import { FC } from 'react';
import { ITextAreaProps } from './TextArea.props';
//@Styles
import s from './TextArea.module.css';

export const TextArea: FC<ITextAreaProps> = ({ className, ...props }) => {
	return (
		<textarea className={cn(s.item, className)} {...props}/>
	);
};
