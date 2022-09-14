import { Htag } from '../components';
import { withLayout } from '../Layout/Layout';

export function Error404(): JSX.Element {
	return (
		<>
			<Htag type='h1'>Ошибка 404</Htag>
		</>
	);
}

export default withLayout(Error404);