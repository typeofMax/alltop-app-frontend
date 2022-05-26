//@Types
import { FooterProps } from './Footer.props';
//@Styles
import styles from './Footer.module.css';

const Footer = ({...props}:FooterProps):JSX.Element => {
	return (
		<div {...props}>Footer</div>
	);
};

export default Footer;