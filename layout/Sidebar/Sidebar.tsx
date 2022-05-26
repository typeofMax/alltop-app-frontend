//@Types
import { SidebarProps } from './Sidebar.props';
//@Styles
import styles from './Sidebar.module.css';

const Sidebar = ({...props}:SidebarProps):JSX.Element => {
	return (
		<div {...props}>Sidebar</div>
	);
};

export default Sidebar;