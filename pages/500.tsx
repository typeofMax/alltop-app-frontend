import { Htag } from '../components';
import { withLayout } from '../Layout/Layout';

function Error500(): JSX.Element {
	return (
		<>
			<Htag type='h1'>Ошибка 500</Htag>
		</>
	);
}

export default withLayout(Error500);
