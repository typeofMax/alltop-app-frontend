//@Types
import { FC, useReducer } from 'react';
import { ITopPageComponentProps } from './TopPageComponent.props';
import { TopLevelCategory } from '../../core/interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
//@Components
import { Advantages, HhData, Htag, Sort, Tag } from '../../components';
import { sortReducer } from '../../components/Sort/sort.reducer';
//@Styles
import s from './TopPageComponent.module.css';

export const TopPageComponent: FC<ITopPageComponentProps> = ({
	page,
	products,
	firstCategory,
}) => {
	const [{ products: sortedProduct, sort }, dispatch] = useReducer(
		sortReducer,
		{ sort: SortEnum.Rating, products }
	);

	const setSort = (sort: SortEnum): void => {
		dispatch({ type: sort });
	};

	return (
		<div className={s.wrapper}>
			<div className={s.title}>
				{page && <Htag type='h1'>{page.title}</Htag>}
				{products && (
					<Tag colorType='grey' size='m'>
						{products.length}
					</Tag>
				)}
				<Sort sort={sort} setSort={setSort} />
			</div>
			<div>
				{sortedProduct &&
					sortedProduct.map((p) => <div key={p._id}>{p.title}</div>)}
			</div>
			<div className={s.hhTitle}>
				{page && <Htag type='h2'>Вакансии - {page.category}</Htag>}
				<Tag colorType='red' size='m'>
					hh.ru
				</Tag>
			</div>
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
