import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import closeIcon from './crossIcon.svg';
import menuIcon from './menuIcon.svg';
import upIcon from './upArrow.svg';

export const icons = {
	closeIcon,
	menuIcon,
	upIcon,
};

export type IconName = keyof typeof icons;

export interface IButtonIconProps
	extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	icon: IconName;
	appearance: 'primary' | 'white';
}
