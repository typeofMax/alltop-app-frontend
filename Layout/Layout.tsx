//@Types
import { FC, FunctionComponent } from 'react';
import { ILayoutProps } from './Layout.props';
//@Components
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Up } from '../components';
import { AppContextProvider, IAppContext } from '../core/context/app.context';
//@Styles
import s from './Layout.module.css';

const Layout: FC<ILayoutProps> = ({ children }) => {
	return (
		<div className={s.wrapper}>
			<Header className={s.header} />
			<Sidebar className={s.sidebar} />
			<main className={s.body}>{children}</main>
			<Footer className={s.footer} />
			<Up/>
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
	Component: FunctionComponent<T>
) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
				<Layout>
					<Component {...props} />
				</Layout>
			</AppContextProvider>
		);
	};
};
