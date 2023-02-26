import React from 'react';
import { IPageLink } from '../../types';

export interface IBurgerMenu {
  handleClose: () => void;
  handleOpen: (event: React.MouseEvent<HTMLElement>) => void;
  anchor: null | HTMLElement;
  options: IPageLink[];
}
