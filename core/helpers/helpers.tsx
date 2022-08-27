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

export const priceRu = (price: number): string =>
	price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' ₽');
