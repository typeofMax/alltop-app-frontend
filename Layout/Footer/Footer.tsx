//@Libs
import cn from 'classnames';
import {format} from 'date-fns';
//@Types
import { FC } from 'react';
import { IFooterProps } from "./Footer.props";
//@Styles
import s from './Footer.module.css';

export const Footer: FC<IFooterProps> = ({className, ...props}) => {
  
  return (
    <footer className={cn(className, s.container)} {...props}>
      <div>OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены</div>
      <a href='#' target='_blank'>Пользовательское соглашение</a>
      <a href='#' target='_blank'>Политика конфиденциальности</a>
    </footer>
  );
};
