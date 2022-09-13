//@Libs and Types
import { FC, KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { ISearchProps } from './Search.props';
//@Components
import { Button, Input } from '..';
//@Styles
import s from './Search.module.css';
//@Images
import GlassIcon from './glass.svg';

export const Search: FC<ISearchProps> = ({ className, ...props }) => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const router = useRouter();

	const goToSearch = (): void => {
		if (searchTerm == '') {
			return;
		}
		router.push({
			pathname: '/search',
			query: {
				q: searchTerm,
			},
		});
	};

	const handleKeyDown = (e: KeyboardEvent): void => {
		if (e.key === 'Enter') {
			goToSearch();
		}
	};

	return (
		<form className={cn(s.wrapper, className)} {...props} role='search'>
			<Input
				placeholder='Поиск...'
				className={s.input}
				value={searchTerm}
				onChange={(e): void => setSearchTerm(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button
				appearance='primary'
				className={s.button}
				onClick={goToSearch}
				aria-label='Искать по сайту'
			>
				<GlassIcon />
			</Button>
		</form>
	);
};
