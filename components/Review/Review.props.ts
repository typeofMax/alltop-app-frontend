import { IReviewModel } from './../../core/interfaces/product.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IReviewProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	review: IReviewModel;
}
