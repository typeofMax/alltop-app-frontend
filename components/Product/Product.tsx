//@Libs and Types
import Image from 'next/image';
import { declOfNum, priceRu } from '../../core/helpers/helpers';
import { FC } from 'react';
import { IProductProps } from './Product.props';
import cn from 'classnames';
//@Components
import { Button, Card, Divider, Rating, Tag } from '..';
//@Styles
import s from './Product.module.css';

export const Product: FC<IProductProps> = ({ product, ...props }) => {
	return (
		<Card className={s.product}>
			<div className={s.logo}>
				<Image
					src={process.env.NEXT_PUBLIC_DOMAIN + product.image.slice(1)}
					alt={product.title}
					width={70}
					height={70}
				/>
			</div>
			<div className={s.title}>{product.title}</div>
			<div className={s.price}>
				{priceRu(product.price)}
				{product.oldPrice && (
					<Tag colorType='green' className={s.discount}>
						{priceRu(product.price - product.oldPrice)}
					</Tag>
				)}
			</div>
			<div className={s.credit}>
				{priceRu(product.credit)}
				<span className={s.month}>/мес</span>{' '}
			</div>
			<div className={s.rating}>
				<Rating rating={product.reviewAvg ?? product.initialRating} />
			</div>
			<div className={s.tags}>
				{product.categories.map((c) => (
					<Tag key={c} colorType='ghost' className={s.category}>
						{c}
					</Tag>
				))}
			</div>
			<div className={s.priceTitle}>цена</div>
			<div className={s.creditTitle}>кредит</div>
			<div className={s.rateTitle}>
				{product.reviewCount}{' '}
				{declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
			</div>
			<Divider className={cn(s.hr, s.hr2)} />
			<div className={s.description}>{product.description}</div>
			<div className={s.features}>
				{product.characteristics.map((c) => (
					<div key={c.name} className={s.characteristics}>
						<span className={s.characteristicsName}>{c.name}</span>
						<span className={s.characteristicsDots}></span>
						<span className={s.characteristicsValue}>{c.value}</span>
					</div>
				))}
			</div>
			<div className={s.advBlock}>
				{product.advantages && (
					<div className={s.advantages}>
						<div className={s.advTitle}>Преимущества</div>
						<div>{product.advantages}</div>
					</div>
				)}
				{product.disadvantages && (
					<div className={s.disadvantages}>
						<div className={s.advTitle}>Недостатки</div>
						<div>{product.disadvantages}</div>
					</div>
				)}
			</div>
			<Divider className={s.hr} />
			<div className={s.actions}>
				<Button appearance='primary'>Узнать подробнее</Button>
				<Button appearance='ghost' arrow='right' className={s.reviewButton}>
					Читать отзывы
				</Button>
			</div>
		</Card>
	);
};
