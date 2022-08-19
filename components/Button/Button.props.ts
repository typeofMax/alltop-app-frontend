import { ReactNode, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

export interface IButtonProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	appearance: 'primary' | 'ghost';
	children: ReactNode;
	arrow?: 'right' | 'down' | 'none'
}
