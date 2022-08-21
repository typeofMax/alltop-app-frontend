import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import { IMenuItem } from '../../core/interfaces/menu.interface';
import { withLayout } from '../../Layout/Layout';
import axios from 'axios';
import { firstLevelMenu } from '../../core/helpers/helpers';
import { ParsedUrlQuery } from 'querystring';

const Type: NextPage<ITypeProps> = ({firstCategory}) => {
	return <>{firstCategory}</>;
};

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: firstLevelMenu.map((m) => '/' + m.route),
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<ITypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true,
		};
	}

	const firstCategoryItem = firstLevelMenu.find((m) => m.route == params.type);

	if (!firstCategoryItem) {
		return {
			notFound: true,
		};
	}

	const { data: menu } = await axios.post<IMenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + 'api/top-page/find', {
		firstCategory: firstCategoryItem.id,
	});

	return {
		props: {
			menu,
			firstCategory: firstCategoryItem.id,
		},
	};
};

interface ITypeProps extends Record<string, unknown> {
	menu: IMenuItem[];
	firstCategory: number;
}
