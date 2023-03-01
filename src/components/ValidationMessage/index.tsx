import React from 'react';
import { IValidationMessage } from './validation-message.types';
import { CustomizedAlert } from '../../UI';

export function ValidationMessage({ children, type }: IValidationMessage) {
  return (
    <CustomizedAlert variant="outlined" severity={type}>
      {children}
    </CustomizedAlert>
  );
}
