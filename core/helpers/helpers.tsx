//@Types
import { IFirstLevelMenu } from '../interfaces/menu.interface';
import { TopLevelCategory } from '../interfaces/page.interface';
//@Images
import CoursesIcon from './icons/courses.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/goods.svg';
import ServicesIcon from './icons/services.svg';

export const firstLevelMenu: IFirstLevelMenu[] = [
	{
		route: 'courses',
		name: 'Курсы',
		icon: <CoursesIcon />,
		id: TopLevelCategory.Courses,
	},
	{
		route: 'services',
		name: 'Сервисы',
		icon: <ServicesIcon />,
		id: TopLevelCategory.Services,
	},
	{
		route: 'books',
		name: 'Книги',
		icon: <BooksIcon />,
		id: TopLevelCategory.Books,
	},
	{
		route: 'products',
		name: 'Продукты',
		icon: <ProductsIcon />,
		id: TopLevelCategory.Products,
	},
];

//Деление числа на сотни, тысячи и т.д.
export const priceRu = (price: number): string =>
	price
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
		.concat(' ₽');

//Склонение слов

export const declOfNum = (
	value: number,
	titles: [string, string, string]
): string => {
	const cases = [2, 0, 1, 1, 1, 2];

	return titles[
		value % 100 > 4 && value % 100 < 20
			? 2
			: cases[value % 10 < 5 ? value % 10 : 5]
	];
};
