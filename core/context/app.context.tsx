import { TopLevelCategory } from '../interfaces/page.interface';
import { IMenuItem } from '../interfaces/menu.interface';
import { createContext, FC, PropsWithChildren, useState } from 'react';

export interface IAppContext {
	menu: IMenuItem[];
	firstCategory: TopLevelCategory;
	setMenu?: (newMenu: IMenuItem[]) => void;
}

export const AppContext = createContext<IAppContext>({
	menu: [],
	firstCategory: TopLevelCategory.Courses,
});

export const AppContextProvider: FC<PropsWithChildren<IAppContext>> = ({
	menu,
	firstCategory,
	children,
}) => {
	const [menuState, setMenuState] = useState<IMenuItem[]>(menu);

	const setMenu = (newMenu: IMenuItem[]): void => {
		setMenuState(newMenu);
	};

	return (
		<AppContext.Provider value={{ menu: menuState, firstCategory, setMenu }}>
			{children}
		</AppContext.Provider>
	);
};
