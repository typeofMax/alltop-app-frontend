//@Components
import { Card } from '..';
//@Types
import { FC } from 'react';
import { IHhDataProps } from './HhData.props';
//@Styles
import s from './HhData.module.css';
//@Images
import RateIcon from './rate.svg';
import { priceRu } from '../../core/helpers/helpers';

export const HhData: FC<IHhDataProps> = ({ count, juniorSalary, middleSalary, seniorSalary }) => {
	return (
		<div className={s.hh}>
			<Card className={s.count}>
				<div className={s.title}>Всего вакансий</div>
				<div className={s.statCount}>{count}</div>
			</Card>
			<Card className={s.salary}>
				<div>
					<div className={s.title}>Начальный</div>
					<div className={s.salaryValue}>{priceRu(juniorSalary)}</div>
					<div className={s.rate}>
						<RateIcon className={s.filled} />
						<RateIcon />
						<RateIcon />
					</div>
				</div>
				<div>
					<div className={s.title}>Средний</div>
					<div className={s.salaryValue}>{priceRu(middleSalary)}</div>
					<div className={s.rate}>
						<RateIcon className={s.filled} />
						<RateIcon className={s.filled}/>
						<RateIcon />
					</div>
				</div>
				<div>
					<div className={s.title}>Профессионал</div>
					<div className={s.salaryValue}>{priceRu(seniorSalary)}</div>
					<div className={s.rate}>
						<RateIcon className={s.filled} />
						<RateIcon className={s.filled}/>
						<RateIcon className={s.filled}/>
					</div>
				</div>
			</Card>
		</div>
	);
};
