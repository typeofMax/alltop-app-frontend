//Libs and @Types
import type { GetStaticProps, NextPage } from 'next';
import axios from 'axios';
import { IMenuItem } from '../core/interfaces/menu.interface';
//@Components
import { API } from '../core/api/api';
import { Htag } from '../components';
import { withLayout } from '../Layout/Layout';

const Home: NextPage<IHomeProps> = () => {
	return (
		<>
			<Htag type='h1'>Топ обучающих курсов</Htag>
		</>
	);
};

export default withLayout(Home);

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<IMenuItem[]>(API.topPage.find, {
		firstCategory,
	});

	return {
		props: {
			menu,
			firstCategory,
		},
	};
};

interface IHomeProps extends Record<string, unknown> {
	menu: IMenuItem[];
	firstCategory: number;
}
