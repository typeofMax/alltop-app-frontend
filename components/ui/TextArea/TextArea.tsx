/* eslint-disable react/display-name */
//@Libs and Types
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import { ITextAreaProps } from './TextArea.props';
//@Styles
import s from './TextArea.module.css';

export const TextArea = forwardRef(
	(
		{ className, error, ...props }: ITextAreaProps,
		ref: ForwardedRef<HTMLTextAreaElement>
	): JSX.Element => {
		return (
			<div className={cn(className, s.wrapper)}>
				<textarea
					className={cn(s.item, { [s.error]: error })}
					{...props}
					ref={ref}
				/>
				{error && <span className={s.errorMessage}>{error.message}</span>}
			</div>
		);
	}
);
