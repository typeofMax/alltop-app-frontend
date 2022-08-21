//@Libs
import { FC, Fragment, KeyboardEvent, useEffect, useState } from 'react';
import cn from 'classnames';
//@Types
import { IRatingProps } from './Rating.props';
//@Styles
import s from './Rating.module.css';
//@Image
import RatingIcon from './Star.svg';

export const Rating: FC<IRatingProps> = ({ isEditable = false, rating, setRating, ...props }) => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

	useEffect(() => {
		constructRating(rating);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rating]);

	const constructRating = (currentRatingValue: number): void => {
		const updatedRating = ratingArray.map((r: JSX.Element, i: number) => {
			return (
				<span
					key={i}
					onMouseEnter={(): void => changeDisplay(i + 1)}
					onMouseLeave={(): void => changeDisplay(rating)}
					onClick={(): void => clickHandler(i + 1)}
					className={cn(s.star, { [s.filled]: i < currentRatingValue, [s.editable]: isEditable })}
				>
					<RatingIcon
						tabIndex={isEditable ? 0 : -1}
						onKeyDown={(e: KeyboardEvent<SVGAElement>): boolean | void => isEditable && handleSpace(e, i + 1)}
					/>
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

	const handleSpace = (e: KeyboardEvent<SVGAElement>, val: number): void => {
		if (e.code !== 'Space' || !setRating) {
			return;
		}

		setRating(val);
	};

	return (
		<div {...props}>
			{ratingArray.map((r: JSX.Element, i: number) => (
				<Fragment key={i}>{r}</Fragment>
			))}
		</div>
	);
};
