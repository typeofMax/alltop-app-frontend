import { GetStaticProps, NextPage } from 'next';
import { IMenuItem } from '../core/interfaces/menu.interface';
import { withLayout } from '../Layout/Layout';
import axios from 'axios';
import { API } from '../core/api/api';

const Search: NextPage = () => {
	return <></>;
};

export default withLayout(Search);

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
