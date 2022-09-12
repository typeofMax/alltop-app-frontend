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
		{ isEditable = false, rating, setRating, error, ...props }: IRatingProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
		const ratingArrayRef = useRef<HTMLSpanElement[]>([]);

		useEffect(() => {
			constructRating(rating);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [rating]);

		const computeFocus = (r: number, i: number): number => {
			if (!isEditable) {
				return -1;
			}

			if (!r && i === 0) {
				return 0;
			}

			if (r === i + 1) {
				return 0;
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
						ref={(r) => ratingArrayRef.current?.push(r)}
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
			}

			if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
				e.preventDefault();
				setRating(rating > 1 ? rating - 1 : 1);
			}
		};

		return (
			<div {...props} ref={ref} className={s.wrapper}>
				{ratingArray.map((r: JSX.Element, i: number) => (
					<Fragment key={i}>{r}</Fragment>
				))}
				{error && <span className={s.errorMessage}>{error.message}</span>}
			</div>
		);
	}
);
