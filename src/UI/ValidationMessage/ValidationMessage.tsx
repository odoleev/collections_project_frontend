import React from 'react';
import { Alert } from '@mui/material';
import styled from '@emotion/styled';
import { IValidationMessage } from './validation-message.types';

const CustomizedAlert = styled(Alert)`
  width: 50ch;
  margin-bottom: 5px;
  margin-left: 8px;
`;

export function ValidationMessage({ children, type }: IValidationMessage) {
  return (
    <CustomizedAlert variant="outlined" severity={type}>
      {children}
    </CustomizedAlert>
  );
}
