/* eslint-disable react/display-name */
//@Libs and Types
import Image from 'next/image';
import { declOfNum, priceRu } from '../../core/helpers/helpers';
import { ForwardedRef, forwardRef, Fragment, useRef, useState } from 'react';
import { IProductProps } from './Product.props';
import cn from 'classnames';
import { motion } from 'framer-motion';
//@Components
import { Button, Card, Divider, Rating, Review, ReviewForm, Tag } from '..';
//@Styles
import s from './Product.module.css';

export const Product = motion(
	forwardRef(
		(
			{ product, className, ...props }: IProductProps,
			ref: ForwardedRef<HTMLDivElement>
		): JSX.Element => {
			const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
			const reviewRef = useRef<HTMLDivElement>(null);

			const variants = {
				visible: { opacity: 1, height: 'auto' },
				hidden: { opacity: 0, height: 0 },
			};

			const scrollToReview = (): void => {
				setIsReviewOpened(true);
				reviewRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});

				reviewRef.current?.focus();
			};

			return (
				<div className={className} {...props} ref={ref}>
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
						<div className={s.rateTitle} onClick={scrollToReview}>
							<a tabIndex={0}>
								{product.reviewCount}{' '}
								{declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
							</a>
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
							<Button
								appearance='ghost'
								arrow={isReviewOpened ? 'down' : 'right'}
								className={s.reviewButton}
								onClick={(): void => setIsReviewOpened(!isReviewOpened)}
							>
								Читать отзывы
							</Button>
						</div>
					</Card>
					<motion.div
						animate={isReviewOpened ? 'visible' : 'hidden'}
						variants={variants}
						initial='hidden'
					>
						<Card ref={reviewRef} color='blue' className={s.reviews} tabIndex={isReviewOpened ? 0 : 1}>
							{product.reviews.map((r) => {
								return (
									<Fragment key={r._id}>
										<Review review={r} />
										<Divider />
									</Fragment>
								);
							})}
							<ReviewForm productId={product._id} isOpened={isReviewOpened}/>
						</Card>
					</motion.div>
				</div>
			);
		}
	)
);
