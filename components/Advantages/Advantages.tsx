//@Types
import { FC } from 'react';
import { IAdvantagesProps } from './Advantages.props';
//@Styles
import s from './Advantages.module.css';
//@Images
import CheckIcon from './checkIcon.svg';

export const Advantages: FC<IAdvantagesProps> = ({ advantages }) => {
	return (
		<>
			{advantages.map(a => (
				<div key={a._id} className={s.advantage}>
					<div className={s.round}>
					<CheckIcon />
					</div>
					<div className={s.title}>{a.title}</div>
					<hr className={s.vline}/>
					<div className={s.description}>{a.description}</div>
				</div>
			))}
		</>
	);
};
