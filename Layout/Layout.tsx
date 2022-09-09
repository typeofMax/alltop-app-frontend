//@Types and Li
import { FC, FunctionComponent, KeyboardEvent, useRef, useState } from 'react';
import { ILayoutProps } from './Layout.props';
import cn from 'classnames';
//@Components
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Up } from '../components';
import { AppContextProvider, IAppContext } from '../core/context/app.context';
//@Styles
import s from './Layout.module.css';

const Layout: FC<ILayoutProps> = ({ children }) => {
	const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);
	const bodyRef = useRef<HTMLDivElement>(null);

	const skipContentAction = (key: KeyboardEvent): void => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			bodyRef.current?.focus();
		}
		setIsSkipLinkDisplayed(false);
	};

	return (
		<div className={s.wrapper}>
			<a
				tabIndex={1}
				className={cn(s.skipLink, { [s.displayed]: isSkipLinkDisplayed })}
				onFocus={(): void => setIsSkipLinkDisplayed(true)}
				onKeyDown={skipContentAction}
			>
				Сразу к содержанию
			</a>
			<Header className={s.header} />
			<Sidebar className={s.sidebar} />
			<main className={s.body} ref={bodyRef} tabIndex={0}>
				{children}
			</main>
			<Footer className={s.footer} />
			<Up />
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
