import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface ITagProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode;
	href?: string;
	size?: 's' | 'm';
	colorType: 'ghost' | 'grey' | 'red' | 'green' | 'primary';
}
