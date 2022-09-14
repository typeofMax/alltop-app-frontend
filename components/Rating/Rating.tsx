/* eslint-disable react/display-name */
//@Libs and Types
import {
	ForwardedRef,
	forwardRef,
	Fragment,
	KeyboardEvent,
	useEffect,
	useState,
	useRef,
} from 'react';
import cn from 'classnames';
import { IRatingProps } from './Rating.props';
//@Styles
import s from './Rating.module.css';
//@Image
import RatingIcon from './Star.svg';

export const Rating = forwardRef(
	(
		{ isEditable = false, rating, setRating, error, tabIndex, ...props }: IRatingProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
		const ratingArrayRef = useRef<HTMLSpanElement[]>([]);

		useEffect(() => {
			constructRating(rating);
			// eslint-disable-next-line
		}, [rating, tabIndex]);

		const computeFocus = (r: number, i: number): number => {
			if (!isEditable) {
				return -1;
			}

			if (!r && i === 0) {
				return tabIndex ?? 0;
			}

			if (r === i + 1) {
				return tabIndex ?? 0;
			}

			return -1;
		};

		const constructRating = (currentRatingValue: number): void => {
			const updatedRating = ratingArray.map((r: JSX.Element, i: number) => {
				return (
					<span
						key={i}
						onMouseEnter={(): void => changeDisplay(i + 1)}
						onMouseLeave={(): void => changeDisplay(rating)}
						onClick={(): void => clickHandler(i + 1)}
						className={cn(s.star, {
							[s.filled]: i < currentRatingValue,
							[s.editable]: isEditable,
						})}
						tabIndex={computeFocus(rating, i)}
						onKeyDown={(e: KeyboardEvent): void => handleKey(e)}
						ref={(r: HTMLSpanElement): number => ratingArrayRef.current?.push(r)}
						role={isEditable ? 'slider' : ''}
						aria-valuenow={rating}
						aria-valuemax={5}
						aria-valuemin={1}
						aria-label={isEditable ? 'Укажите рейтинг' : 'рейтинг' + rating}
						aria-invalid={error ? true : false}
					>
						<RatingIcon />
					</span>
				);
			});

			setRatingArray(updatedRating);
		};

		const changeDisplay = (val: number): void => {
			if (!isEditable) {
				return;
			}
			constructRating(val);
		};

		const clickHandler = (val: number): void => {
			if (!isEditable || !setRating) {
				return;
			}

			setRating(val);
		};

		const handleKey = (e: KeyboardEvent): void => {
			if (!isEditable || !setRating) {
				return;
			}

			if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
				if (!rating) {
					setRating(1);
				} else {
					e.preventDefault();
					setRating(rating < 5 ? rating + 1 : 5);
				}
				ratingArrayRef.current[rating]?.focus();
			}

			if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
				e.preventDefault();
				setRating(rating > 1 ? rating - 1 : 1);
				ratingArrayRef.current[rating - 2]?.focus();
			}
		};

		return (
			<div {...props} ref={ref} className={s.wrapper}>
				{ratingArray.map((r: JSX.Element, i: number) => (
					<Fragment key={i}>{r}</Fragment>
				))}
				{error && (
					<span role='alert' className={s.errorMessage}>
						{error.message}
					</span>
				)}
			</div>
		);
	}
);
