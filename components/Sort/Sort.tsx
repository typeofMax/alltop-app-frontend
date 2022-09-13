//@Libs
import cn from 'classnames';
//@Types
import { FC, KeyboardEvent } from 'react';
import { ISortProps, SortEnum } from './Sort.props';
//@Styles
import s from './Sort.module.css';
//@Images
import SortIcon from './Sort.svg';

export const Sort: FC<ISortProps> = ({ sort, setSort, className, ...props }) => {

	return (
		<div className={cn(s.wrapper, className)} {...props}>
			<button
				onClick={(): void => setSort(SortEnum.Rating)}
				className={cn(s.type, {
					[s.active]: sort == SortEnum.Rating,
				})}

			>
				<SortIcon className={s.icon} />
				По рейтингу
			</button>
			<button
				onClick={(): void => setSort(SortEnum.Price)}
				className={cn(s.type, {
					[s.active]: sort == SortEnum.Price,
				})}
			>
				<SortIcon className={s.icon} />
				По&nbsp;цене
			</button>
		</div>
	);
};
