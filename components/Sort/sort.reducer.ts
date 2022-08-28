import { IProductModel } from './../../core/interfaces/product.interface';
import { SortEnum } from './Sort.props';

export type SortActions = { type: SortEnum.Rating } | { type: SortEnum.Price };

export interface ISortState {
	sort: SortEnum;
	products: IProductModel[];
}

export const sortReducer = (
	state: ISortState,
	action: SortActions
): ISortState => {
	switch (action.type) {
		case SortEnum.Rating:
			return {
				sort: SortEnum.Rating,
				products: state.products.sort((prev, next) =>
					prev.initialRating > next.initialRating ? -1 : 1
				),
			};
		case SortEnum.Price:
			return {
				sort: SortEnum.Price,
				products: state.products.sort((prev, next) =>
					prev.price > next.price ? 1 : -1
				),
			};
		default:
			throw new Error('Не верный тип сортировки');
	}
};
