//Libs
import { Fragment, useEffect, useState, KeyboardEvent } from 'react';
import cn from 'classnames';
//Types
import { RatingProps } from './Rating.props';
//Styles
import styles from './Rating.module.css';
//Images
import StarIcon from './star.svg';

export const Rating = ({
	isEditable = false,
	rating,
	setRating,
	...props
}: RatingProps): JSX.Element => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
		new Array(5).fill(<></>)
	);

	useEffect(() => {
		constructRating(rating);
	}, [rating]);

	const constructRating = (currentRating: number): void => {
		const updatedArray = ratingArray.map((elem: JSX.Element, i: number) => {
			return (
				<span
					key={i}
					className={cn(
						styles.star,
						{ [styles.filled]: i < currentRating },
						{ [styles.editable]: isEditable }
					)}
					onMouseEnter={():void => changeDisplay(i + 1)}
					onMouseLeave={():void => changeDisplay(rating)}
					onClick={():void => clickHandler(i + 1)}
				>
					<StarIcon 
						tabIndex={isEditable ? 0 : -1}
						onKeyDown={(e: KeyboardEvent<SVGElement>):void => handleSpace(i + 1, e)}
					/>
				</span>
			);
		});

		setRatingArray(updatedArray);
	};

	const changeDisplay = (i: number):void => {
		constructRating(i);
	};

	const clickHandler = (i:number):void => {
		if (!isEditable || !setRating) {
			return;
		}
		setRating(i);
	};

	const handleSpace = (i:number, e: KeyboardEvent<SVGElement>):void => {
		if (e.code !== 'Space' || !setRating) {
			return;
		}
		setRating(i);
	};	

	return (
		<div {...props}>
			{ratingArray.map((elem: JSX.Element, i: number) => (
				<Fragment key={i}>{elem}</Fragment>
			))}
		</div>
	);
};
