//Libs
import Head from 'next/head';
//Types
import type { AppProps } from 'next/app';
//Styles
import '../styles/globals.css';

const MyApp = ({ Component, pageProps, router }: AppProps): JSX.Element => {
	return (
		<>
			<Head>
				<link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
				<title>AllTop - лучший топ</title>
				<meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
				<meta property='og:locale' content='ru_RU'/>
			</Head>
			<Component {...pageProps} />
		</>
	);
};

export default MyApp;
