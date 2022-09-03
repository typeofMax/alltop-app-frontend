//@Types
import type { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import { Button, Htag, P, Rating, Tag, Input, TextArea } from '../components';
import { withLayout } from '../Layout/Layout';
import axios from 'axios';
import { IMenuItem } from '../core/interfaces/menu.interface';
import { API } from '../core/api/api';

const Home: NextPage<IHomeProps> = ({ menu }) => {
	const [rating, setRating] = useState<number>(0);

	return (
		<>
			<Htag type='h1'>Я заголовок</Htag>
			<Button appearance='primary' arrow='right'>
				Кнопка
			</Button>
			<P size='l'>Big</P>
			<P size='s'>Small</P>
			<P size='m'>Middle</P>
			<Tag colorType='ghost'>ghost</Tag>
			<Tag colorType='primary'>primary</Tag>
			<Tag colorType='green' href='/green'>
				green
			</Tag>
			<Rating isEditable={true} rating={rating} setRating={setRating} />
			<Input placeholder='Имя'/>
			<TextArea placeholder='Текст отзыва'/>
		</>
	);
};

export default withLayout(Home);

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<IMenuItem[]>(API.topPage.find, {
			firstCategory
		}
	);

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
