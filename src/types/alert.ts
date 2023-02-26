import { AlertColor } from '@mui/material';

export interface IAlert {
  isOpen: boolean;
  text: string;
  type?: AlertColor;
}
