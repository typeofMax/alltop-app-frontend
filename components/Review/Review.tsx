//@Libs
import cn from 'classnames';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
//@Types
import { FC } from 'react';
import { IReviewProps } from './Review.props';
//@Styles
import s from './Review.module.css';
//@Images
import UserIcon from './user.svg';
import { Rating } from '../Rating/Rating';

export const Review: FC<IReviewProps> = ({ review, className, ...props }) => {
	const { name, rating, description, title, createdAt } = review;

	return (
		<div className={cn(s.review, className)} {...props}>
			<UserIcon className={s.icon} />
			<div className={s.title}>
				<span className={s.name}>{name}:</span>&nbsp;&nbsp;
				<span>{title}</span>
			</div>
			<div className={s.date}>
				{format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}
			</div>
			<div className={s.rating}>
				<Rating rating={rating} />
			</div>
			<div className={s.description}>{description}</div>
		</div>
	);
};
