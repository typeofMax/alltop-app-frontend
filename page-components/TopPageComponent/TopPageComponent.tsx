//@Types
import { FC } from 'react';
import { ITopPageComponentProps } from './TopPageComponent.props';
import { TopLevelCategory } from '../../core/interfaces/page.interface';
//@Components
import { HhData, Htag, Tag } from '../../components';
//@Styles
import s from './TopPageComponent.module.css';

export const TopPageComponent: FC<ITopPageComponentProps> = ({
	page,
	products,
	firstCategory,
}) => {
	return (
		<div className={s.wrapper}>
			<div className={s.title}>
				<Htag type='h1'>{page.title}</Htag>
				{products && (
					<Tag colorType='grey' size='m'>
						{products.length}
					</Tag>
				)}
				<span>Сортировка</span>
			</div>
			<div>
				{products && products.map((p) => <div key={p._id}>{p.title}</div>)}
			</div>
			<div className={s.hhTitle}>
				<Htag type='h2'>Вакансии - {page.category}</Htag>
				<Tag colorType='red' size='m'>
					hh.ru
				</Tag>
			</div>
      {firstCategory == TopLevelCategory.Courses && <HhData {...page.hh}/>}
		</div>
	);
};
