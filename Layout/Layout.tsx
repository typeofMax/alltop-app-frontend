//@Types
import { FunctionComponent } from 'react';
import { ILayoutProps } from './Layout.props';
//@Components
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
//@Styles
import s from './Layout.module.css';

const Layout = ({ children }: ILayoutProps): JSX.Element => {
	return (
		<div className={s.wrapper}>
			<Header className={s.header}/>
			<Sidebar className={s.sidebar}/>
			<main className={s.body} >{children}</main>
			<Footer className={s.footer}/>
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		);
	};
};
