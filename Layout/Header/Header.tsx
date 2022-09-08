import { FC, useEffect, useState } from 'react';
import { IHeaderProps } from './Header.props';
import cn from 'classnames';
import s from './Header.module.css';
import Logo from '../logo.svg';
import { ButtonIcon } from '../../components';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar/Sidebar';
import { useRouter } from 'next/router';

export const Header: FC<IHeaderProps> = ({ className, ...props }) => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpened(false);
  }, [router]);

	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: {
				stiffness: 20,
			},
		},
		closed: {
			opacity: 0,
			x: '100%',
		},
	};

	return (
		<header className={cn(className, s.wrapper)} {...props}>
			<Logo />
			<ButtonIcon appearance='white' icon='menuIcon' onClick={(): void => setIsOpened(true)} />
			<motion.div
				className={s.mobileMenu}
				variants={variants}
				initial='closed'
				animate={isOpened ? 'opened' : 'closed'}
			>
				<Sidebar />
				<ButtonIcon
					className={s.menuClose}
					appearance='white'
					icon='closeIcon'
					onClick={(): void => setIsOpened(false)}
				/>
			</motion.div>
		</header>
	);
};
