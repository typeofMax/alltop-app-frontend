//@Libs
import cn from 'classnames';
//@Types
import { FC } from 'react';
import { IButtonIconProps, icons } from './ButtonIcon.props';
//@Styles
import s from './ButtonIcon.module.css';

export const ButtonIcon: FC<IButtonIconProps> = ({ appearance, className, icon, ...props }) => {
	const IconComponent = icons[icon];
	
	return (
		<button
			className={cn(s.button, className, {
				[s.primary]: appearance === 'primary',
				[s.white]: appearance === 'white',
			})}
			{...props}
		>
			<IconComponent />
		</button>
	);
};
