//@Libs
import cn from 'classnames';
//@Types
import { FC } from 'react';
import { ISidebarProps } from './Sidebar.props';
//@Components
import { Menu } from '../Menu/Menu';
//@Styles
import s from './Sidebar.module.css';
//@Images
import Logo from '../logo.svg';

export const Sidebar: FC<ISidebarProps> = ({ className, ...props }) => {
	
	return (
		<aside className={cn(className, s.wrapper)} {...props}>
			<Logo className={s.logo} />
			<Menu />
		</aside>
	);
};
