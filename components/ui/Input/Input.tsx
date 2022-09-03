/* eslint-disable react/display-name */
//@Libs
import cn from 'classnames';
//@Types
import { ForwardedRef, forwardRef } from 'react';
import { IInputProps } from './Input.props';
//@Styles
import s from './Input.module.css';

export const Input = forwardRef(
	(
		{ className, error, ...props }: IInputProps,
		ref: ForwardedRef<HTMLInputElement>
	): JSX.Element => {
		return (
			<div className={cn(s.inputWrapper, className)}>
				<input
					className={cn(s.item, { [s.error]: error })}
					{...props}
					ref={ref}
				/>
				{error && <span className={s.errorMessage}>{error.message}</span>}
			</div>
		);
	}
);
