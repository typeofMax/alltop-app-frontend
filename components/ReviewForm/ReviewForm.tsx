//@Libs and Types
import cn from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import { FC } from 'react';
import { IReviewFormProps } from './ReviewForm.props';
import { IReviewForm } from './ReviewForm.interface';
//@Components
import { Button, Input, Rating, TextArea } from '..';
//@Styles
import s from './ReviewForm.module.css';
//@Images
import CloseIcon from './close.svg';

export const ReviewForm: FC<IReviewFormProps> = ({
	productId,
	className,
	...props
}) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IReviewForm>();

	const onSubmit = (data: IReviewForm): void => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(s.reviewForm, className)} {...props}>
				<Input
					placeholder='Имя'
					{...register('name', {
						required: { value: true, message: 'Заполните имя' },
					})}
					error={errors.name}
				/>
				<Input
					placeholder='Заголовок отзыва'
					className={s.title}
					{...register('title')}
				/>
				<div className={s.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						render={({ field }): JSX.Element => (
							<Rating
								rating={field.value}
								setRating={field.onChange}
								isEditable
								ref={field.ref}
							/>
						)}
					/>
				</div>
				<TextArea
					placeholder='Текст отзыва'
					className={s.description}
					{...register('description')}
				/>
				<div className={s.submit}>
					<Button appearance='primary'>Отправить</Button>
					<span className={s.info}>
						* Перед публикацией отзыв пройдет предварительную модерацию и
						проверку
					</span>
				</div>
			</div>
			<div className={s.success}>
				<div className={s.successTitle}>Отзыв отправлен</div>
				<div>Спасибо, Ваш отзыв будет опубликован после проверки.</div>
				<CloseIcon className={s.close} />
			</div>
		</form>
	);
};
