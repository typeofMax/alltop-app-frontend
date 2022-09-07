//@Types
import { FC, useEffect, useReducer } from 'react';
import { ITopPageComponentProps } from './TopPageComponent.props';
import { TopLevelCategory } from '../../core/interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
//@Components
import { Advantages, HhData, Htag, Product, Sort, Tag } from '../../components';
import { sortReducer } from './sort.reducer';
//@Styles
import s from './TopPageComponent.module.css';

export const TopPageComponent: FC<ITopPageComponentProps> = ({
	page,
	products,
	firstCategory,
}) => {
	const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
		sortReducer,
		{ products, sort: SortEnum.Rating }
	);

	const setSort = (sort: SortEnum): void => {
		dispatchSort({ type: sort });
	};

	useEffect(() => {
		dispatchSort({ type: 'reset', initialState: products });
	}, [products]);

	return (
		<div className={s.wrapper}>
			<div className={s.titleWrapper}>
				{page && (
					<Htag type='h1' className={s.title}>
						{page.title}
					</Htag>
				)}
				{products && (
					<Tag colorType='grey' size='m' className={s.titleTag}>
						{products.length}
					</Tag>
				)}
				<Sort sort={sort} setSort={setSort} className={s.sort} />
			</div>
			<div>
				{sortedProducts &&
					sortedProducts.map((p) => (
						<Product layout key={p._id} product={p}></Product>
					))}
			</div>
			{page?.hh && (
				<div className={s.hhTitle}>
					{page && <Htag type='h2'>Вакансии - {page.category}</Htag>}
					<Tag colorType='red' size='m'>
						hh.ru
					</Tag>
				</div>
			)}
			{firstCategory == TopLevelCategory.Courses && page.hh && (
				<HhData {...page.hh} />
			)}
			{page?.advantages && page?.advantages.length > 0 && (
				<>
					<Htag type='h2'>Преимущества</Htag>
					<Advantages advantages={page.advantages} />
				</>
			)}
			{page?.seoText && (
				<div
					className={s.text}
					dangerouslySetInnerHTML={{ __html: page.seoText }}
				/>
			)}
			{page?.tags && (
				<>
					<Htag type='h2'>Получаемые навыки</Htag>
					{page.tags.map((t) => (
						<Tag key={t} colorType='primary'>
							{t}
						</Tag>
					))}
				</>
			)}
		</div>
	);
};
