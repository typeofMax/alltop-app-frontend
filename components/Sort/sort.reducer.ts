import { IProductModel } from './../../core/interfaces/product.interface';
import { SortEnum } from './Sort.props';

export type SortActions =
	| { type: SortEnum.Rating }
	| { type: SortEnum.Price }
	| { type: 'reset'; initialState: IProductModel[] };

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
				products: state.products.sort((a, b) =>
					a.initialRating > b.initialRating ? -1 : 1
				),
			};
		case SortEnum.Price:
			return {
				sort: SortEnum.Price,
				products: state.products.sort((a, b) => (a.price > b.price ? 1 : -1)),
			};
		case 'reset':
			return {
				sort: SortEnum.Rating,
				products: action.initialState,
			};
		default:
			throw new Error('Неверный тип сортировки');
	}
};
