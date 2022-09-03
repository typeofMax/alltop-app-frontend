/* eslint-disable react/display-name */
//@Libs and Types
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import { ITextAreaProps } from './TextArea.props';
//@Styles
import s from './TextArea.module.css';

export const TextArea = forwardRef(
	(
		{ className, ...props }: ITextAreaProps,
		ref: ForwardedRef<HTMLTextAreaElement>
	): JSX.Element => {
		return <textarea className={cn(s.item, className)} {...props} ref={ref} />;
	}
);
