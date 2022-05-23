import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode;
	size: 's' | 'm';
	color: 'ghost' | 'green' | 'red' | 'primary' | 'gray';
	href?: string;
}