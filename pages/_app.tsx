//Libs
import Head from 'next/head';
//Types
import type { AppProps } from 'next/app';
//Styles
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	return (
		<>
			<Head>
				<title>AllTop - лучший топ</title>
			</Head>
			<Component {...pageProps} />
		</>
	);
};

export default MyApp;
