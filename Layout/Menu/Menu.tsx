//@Libs
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, KeyboardEvent, useContext, useState } from 'react';
import cn from 'classnames';
import { motion, useReducedMotion } from 'framer-motion';
//@Types
import { IFirstLevelMenu, IPageItem } from '../../core/interfaces/menu.interface';
//@Components
import { firstLevelMenu } from '../../core/helpers/helpers';
import { AppContext } from '../../core/context/app.context';
//@Styles
import s from './Menu.module.css';

export const Menu: FC = () => {
	const { menu, firstCategory, setMenu } = useContext(AppContext);
	const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
	const router = useRouter();
	const shouldReduceMotion = useReducedMotion();

	const variants = {
		visible: {
			transition: shouldReduceMotion
				? {}
				: {
						when: 'beforeChildren',
						staggerChildren: 0.1,
				},
		},
		hidden: { marginBottom: 0 },
	};

	const childVariants = {
		visible: {
			opacity: 1,
			height: 'auto',
		},
		hidden: {
			opacity: 0,
			height: 0,
		},
	};

	const openSecondLevel = (secondCategory: string): void => {
		setMenu &&
			setMenu(
				menu.map((item) => {
					if (item._id.secondCategory == secondCategory) {
						setAnnounce(item.isOpened ? 'closed' : 'opened');
						item.isOpened = !item.isOpened;
					}
					return item;
				})
			);
	};

	const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string): void => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			openSecondLevel(secondCategory);
		}
	};

	const constructFirstLevel = (): JSX.Element => {
		return (
			<ul className={s.firsLevelList}>
				{firstLevelMenu.map((firstLevelMenuItem) => (
					<li key={firstLevelMenuItem.route} aria-expanded={firstLevelMenuItem.id == firstCategory}>
						<Link href={`/${firstLevelMenuItem.route}`}>
							<a>
								<div
									className={cn(s.firstLevel, {
										[s.firstLevelActive]: firstLevelMenuItem.id == firstCategory,
									})}
								>
									{firstLevelMenuItem.icon}
									<span>{firstLevelMenuItem.name}</span>
								</div>
							</a>
						</Link>
						{firstLevelMenuItem.id == firstCategory && constructSecondLevel(firstLevelMenuItem)}
					</li>
				))}
			</ul>
		);
	};

	const constructSecondLevel = (firstLevelMenu: IFirstLevelMenu): JSX.Element => {
		return (
			<ul className={s.secondBlock}>
				{menu.map((menuItem) => {
					if (menuItem.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])) {
						menuItem.isOpened = true;
					}

					return (
						<li key={menuItem._id.secondCategory}>
							<button
								onKeyDown={(key: KeyboardEvent): void =>
									openSecondLevelKey(key, menuItem._id.secondCategory)
								}
								className={s.secondLevel}
								onClick={(): void => openSecondLevel(menuItem._id.secondCategory)}
								aria-expanded={menuItem.isOpened}
							>
								{menuItem._id.secondCategory}
							</button>
							<motion.ul
								layout
								variants={variants}
								initial={menuItem.isOpened ? 'visible' : 'hidden'}
								animate={menuItem.isOpened ? 'visible' : 'hidden'}
								className={cn(s.secondLevelBlock)}
							>
								{constructThirdLevel(
									menuItem.pages,
									firstLevelMenu.route,
									menuItem.isOpened ?? false
								)}
							</motion.ul>
						</li>
					);
				})}
			</ul>
		);
	};

	const constructThirdLevel = (
		pages: IPageItem[],
		route: string,
		isOpened: boolean
	): JSX.Element[] => {
		return pages.map((page) => (
			<motion.li key={page._id} variants={childVariants}>
				<Link href={`/${route}/${page.alias}`}>
					<a
						tabIndex={isOpened ? 0 : -1}
						className={cn(s.thirdLevel, {
							[s.thirdLevelActive]: router.asPath == `/${route}/${page.alias}`,
						})}
						aria-current={router.asPath == `/${route}/${page.alias}` ? 'page' : false}
					>
						{page.category}
					</a>
				</Link>
			</motion.li>
		));
	};

	return (
		<nav className={s.wrapper}>
			{announce && (
				<span className='visuallyHidden' role='log'>
					{announce == 'opened' ? 'развернуто' : 'свернуто'}
				</span>
			)}
			{constructFirstLevel()}
		</nav>
	);
};
