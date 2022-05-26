//@Types
import { FunctionComponent } from 'react';
import { LayoutProps } from './Layout.props';
//@Components
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Footer from './Footer/Footer';
//@Styles
import styles from './Layout.module.css';

const Layout = ({ children }: LayoutProps):JSX.Element => {
	return (
		<>
			<Header />
			<div>
				<Sidebar />
				<div>{children}</div>
			</div>
			<Footer />
		</>
	);
};

const withLayout =  <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
	return function componentWithLayout(props: T):JSX.Element {
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		);
	};
};

export default withLayout;