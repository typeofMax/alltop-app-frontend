//@Libs
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useContext } from 'react';
import cn from 'classnames';
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
	
	const constructFirstLevel = (): JSX.Element => {
		return (
			<>
				{firstLevelMenu.map((firstLevelMenuItem) => (
					<div key={firstLevelMenuItem.route}>
						<Link href={`/${firstLevelMenuItem.route}`}>
							<a>
								<div className={cn(s.firstLevel, { [s.firstLevelActive]: firstLevelMenuItem.id == firstCategory })}>
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
							<div className={s.secondLevel} onClick={(): void => openSecondLevel(menuItem._id.secondCategory)}>
								{menuItem._id.secondCategory}
							</div>
							<div className={cn(s.secondLevelBlock, { [s.secondLevelBlockOpened]: menuItem.isOpened })}>
								{constructThirdLevel(menuItem.pages, firstLevelMenu.route)}
							</div>
						</div>
					);
				})}
			</div>
		);
	};

	const constructThirdLevel = (pages: IPageItem[], route: string): JSX.Element[] => {
		return pages.map((page) => (
			<Link href={`/${route}/${page.alias}`} key={page._id}>
				<a className={cn(s.thirdLevel, { [s.thirdLevelActive]: router.asPath == `/${route}/${page.alias}` })}>
					{page.category}
				</a>
			</Link>
		));
	};

	return <div className={s.wrapper}>{constructFirstLevel()}</div>;
};
