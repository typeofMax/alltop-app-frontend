//@Types
import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import { withLayout } from '../../Layout/Layout';
import axios from 'axios';
import { IMenuItem } from '../../core/interfaces/menu.interface';
import { ITopPageModel, TopLevelCategory } from '../../core/interfaces/page.interface';
import { ParsedUrlQuery } from 'querystring';
import { IProductModel } from '../../core/interfaces/product.interface';
import { firstLevelMenu } from '../../core/helpers/helpers';
import { TopPageComponent } from '../../page-components';
import { API } from '../../core/api/api';
import Head from 'next/head';
import { Error404 } from '../404';

const TopPage: NextPage<ITopPageProps> = ({ products, firstCategory, page }) => {
	if (!page || !products) {
		return <Error404 />;
	}
	return (
		<>
			<Head>
				<title>{page.metaTitle}</title>
				<meta name='description' content={page.metaDescription} />
				<meta property='og:title' content={page.metaTitle} />
				<meta property='og:description' content={page.metaDescription} />
				<meta property='og:type' content='article' />
			</Head>
			<TopPageComponent products={products} page={page} firstCategory={firstCategory} />
		</>
	);
};

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];

	for (const menuItem of firstLevelMenu) {
		const { data: menu } = await axios.post<IMenuItem[]>(
			process.env.NEXT_PUBLIC_DOMAIN + 'api/top-page/find',
			{
				firstCategory: menuItem.id,
			}
		);

		paths = paths.concat(menu.flatMap((m) => m.pages.map((p) => `/${menuItem.route}/${p.alias}`)));
	}

	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<ITopPageProps> = async ({
	params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
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

	try {
		const { data: menu } = await axios.post<IMenuItem[]>(API.topPage.find, {
			firstCategory: firstCategoryItem.id,
		});

		const { data: page } = await axios.get<ITopPageModel>(
			process.env.NEXT_PUBLIC_DOMAIN + 'api/top-page/byAlias/' + params.alias
		);

		const { data: products } = await axios.post<IProductModel[]>(API.product.find, {
			category: page.category,
			limit: 10,
		});
		return {
			props: {
				menu,
				firstCategory: firstCategoryItem.id,
				page,
				products,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

interface ITopPageProps extends Record<string, unknown> {
	menu: IMenuItem[];
	firstCategory: TopLevelCategory;
	page: ITopPageModel;
	products: IProductModel[];
}
