import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
export interface IPProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  children: ReactNode,
  size?: 'm' | 's' | 'l'
}