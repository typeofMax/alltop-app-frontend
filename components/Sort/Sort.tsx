/* eslint-disable jsx-a11y/role-supports-aria-props */
//@Libs
import cn from 'classnames';
//@Types
import { FC } from 'react';
import { ISortProps, SortEnum } from './Sort.props';
//@Styles
import s from './Sort.module.css';
//@Images
import SortIcon from './Sort.svg';

export const Sort: FC<ISortProps> = ({ sort, setSort, className, ...props }) => {
	return (
		<div className={cn(s.wrapper, className)} {...props}>
			<div className={s.sortName} id='sort'>
				Сортировка
			</div>
			<button
				id='rating'
				onClick={(): void => setSort(SortEnum.Rating)}
				className={cn(s.type, {
					[s.active]: sort == SortEnum.Rating,
				})}
				aria-selected={sort == SortEnum.Rating}
				aria-labelledby='sort rating'
			>
				<SortIcon className={s.icon} />
				По рейтингу
			</button>
			<button
				id='price'
				onClick={(): void => setSort(SortEnum.Price)}
				className={cn(s.type, {
					[s.active]: sort == SortEnum.Price,
				})}
				aria-selected={sort == SortEnum.Price}
				aria-labelledby='sort price'
			>
				<SortIcon className={s.icon} />
				По&nbsp;цене
			</button>
		</div>
	);
};
