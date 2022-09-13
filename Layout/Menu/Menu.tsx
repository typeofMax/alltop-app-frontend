//@Libs
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, KeyboardEvent, useContext } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
//@Types
import { IFirstLevelMenu, IPageItem } from '../../core/interfaces/menu.interface';
//@Components
import { firstLevelMenu } from '../../core/helpers/helpers';
import { AppContext } from '../../core/context/app.context';
//@Styles
import s from './Menu.module.css';

export const Menu: FC = () => {
	const { menu, firstCategory, setMenu } = useContext(AppContext);
	const router = useRouter();

	const variants = {
		visible: {
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.1,
			},
		},
		hidden: {},
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
			<>
				{firstLevelMenu.map((firstLevelMenuItem) => (
					<div key={firstLevelMenuItem.route}>
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
					</div>
				))}
			</>
		);
	};

	const constructSecondLevel = (firstLevelMenu: IFirstLevelMenu): JSX.Element => {
		return (
			<div className={s.secondBlock}>
				{menu.map((menuItem) => {
					if (menuItem.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])) {
						menuItem.isOpened = true;
					}

					return (
						<div key={menuItem._id.secondCategory}>
							<div
								onKeyDown={(key: KeyboardEvent): void =>
									openSecondLevelKey(key, menuItem._id.secondCategory)
								}
								tabIndex={0}
								className={s.secondLevel}
								onClick={(): void => openSecondLevel(menuItem._id.secondCategory)}
							>
								{menuItem._id.secondCategory}
							</div>
							<motion.div
								layout
								variants={variants}
								initial={menuItem.isOpened ? 'visible' : 'hidden'}
								animate={menuItem.isOpened ? 'visible' : 'hidden'}
								className={cn(s.secondLevelBlock)}
							>
								{constructThirdLevel(menuItem.pages, firstLevelMenu.route, menuItem.isOpened ?? false)}
							</motion.div>
						</div>
					);
				})}
			</div>
		);
	};

	const constructThirdLevel = (pages: IPageItem[], route: string, isOpened: boolean): JSX.Element[] => {
		return pages.map((page) => (
			<motion.div key={page._id} variants={childVariants}>
				<Link href={`/${route}/${page.alias}`}>
					<a
					tabIndex={isOpened ? 0 : -1}
						className={cn(s.thirdLevel, {
							[s.thirdLevelActive]: router.asPath == `/${route}/${page.alias}`,
						})}
					>
						{page.category}
					</a>
				</Link>
			</motion.div>
		));
	};

	return <nav className={s.wrapper}>{constructFirstLevel()}</nav>;
};
