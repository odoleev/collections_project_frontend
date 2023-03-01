import React from 'react';
import { Typography } from '@mui/material';
import { PageContainer } from '../../UI';

export function IncorrectID({ children }: { children: string }) {
  return (
    <PageContainer fontSize="30px" fontWeight={700} component="h1">
      <Typography>{children}</Typography>
    </PageContainer>
  );
}
