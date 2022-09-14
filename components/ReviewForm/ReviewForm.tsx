//@Libs and Types
import cn from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import { FC, useState } from 'react';
import { IReviewFormProps } from './ReviewForm.props';
import { IReviewForm, IReviewSendResponse } from './ReviewForm.interface';
import axios from 'axios';
//@Components
import { Button, Input, Rating, TextArea } from '..';
//@Styles
import s from './ReviewForm.module.css';
//@Images
import CloseIcon from './close.svg';
import { API } from '../../core/api/api';

export const ReviewForm: FC<IReviewFormProps> = ({ productId, className, isOpened, ...props }) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		clearErrors,
	} = useForm<IReviewForm>();

	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const onSubmit = async (formData: IReviewForm): Promise<void> => {
		try {
			const { data } = await axios.post<IReviewSendResponse>(API.review.createDemo, {
				...formData,
				productId,
			});
			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setError('Что то пошло не так...');
			}
		} catch (e) {
			if (typeof e === 'string') {
				setError(e); // works, `e` narrowed to string
			} else if (e instanceof Error) {
				setError(e.message); // works, `e` narrowed to Error
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(s.wrapper, className)} {...props}>
				<Input
					placeholder='Имя'
					{...register('name', {
						required: { value: true, message: 'Заполните имя' },
					})}
					error={errors.name}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.name ? true : false}
				/>
				<Input
					placeholder='Заголовок отзыва'
					className={s.title}
					{...register('title', {
						required: { value: true, message: 'Заполните заголовок' },
					})}
					error={errors.title}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.title ? true : false}
				/>
				<div className={s.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						rules={{ required: { value: true, message: 'Поставьте оценку' } }}
						render={({ field }): JSX.Element => (
							<Rating
								rating={field.value}
								setRating={field.onChange}
								isEditable
								ref={field.ref}
								error={errors.rating}
								tabIndex={isOpened ? 0 : -1}
							/>
						)}
					/>
				</div>
				<TextArea
					placeholder='Текст отзыва'
					className={s.description}
					{...register('description', {
						required: { value: true, message: 'Заполните текст' },
					})}
					error={errors.description}
					tabIndex={isOpened ? 0 : -1}
					aria-label='Текст отзыва'
					aria-invalid={errors.description ? true : false}
				/>
				<div className={s.submit}>
					<Button
						appearance='primary'
						tabIndex={isOpened ? 0 : -1}
						onClick={(): void => clearErrors()}
					>
						Отправить
					</Button>
					<span className={s.info}>
						* Перед публикацией отзыв пройдет предварительную модерацию и проверку
					</span>
				</div>
			</div>
			{isSuccess && (
				<div className={s.success} role='alert'>
					<div className={s.successTitle}>Отзыв отправлен</div>
					<div>Спасибо, Ваш отзыв будет опубликован после проверки.</div>
					<button
						onClick={(): void => setIsSuccess(false)}
						className={s.close}
						aria-label='Закрыть оповещение'
					>
						<CloseIcon />
					</button>
				</div>
			)}
			{error && (
				<div className={s.error} role='alert'>
					Что то пошло не так, попробуйте обновить страницу
					<button
						onClick={(): void => setError('')}
						className={s.close}
						aria-label='Закрыть оповещение'
					>
						<CloseIcon />
					</button>
				</div>
			)}
		</form>
	);
};
