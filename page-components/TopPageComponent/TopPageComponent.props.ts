import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IProductModel } from './../../core/interfaces/product.interface';
import { ITopPageModel } from './../../core/interfaces/page.interface';
import { TopLevelCategory } from "../../core/interfaces/page.interface";

export interface ITopPageComponentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	firstCategory: TopLevelCategory;
	page: ITopPageModel;
	products: IProductModel[];
}
