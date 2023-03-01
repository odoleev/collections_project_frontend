import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export function Loader() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <CircularProgress />
    </Box>
  );
}
