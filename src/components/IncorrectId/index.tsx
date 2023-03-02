import React from 'react';
import { Typography } from '@mui/material';
import { PageContainer } from '../../UI';

export function IncorrectID({ children }: { children: string }) {
  return (
    <PageContainer>
      <Typography component="h1" fontSize="30px" fontWeight={700}>
        {children}
      </Typography>
    </PageContainer>
  );
}
