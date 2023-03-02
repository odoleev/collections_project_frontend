import React from 'react';
import { Box, Checkbox, Typography } from '@mui/material';
import { IOptionalBooleans } from './optional-booleans.types';

export function OptionalBooleans({
  boolean1,
  boolean2,
  boolean3,
  setBoolean1,
  setBoolean2,
  setBoolean3,
  boolean3descr,
  boolean2descr,
  boolean1descr,
}: IOptionalBooleans) {
  return (
    <Box display="flex" flexDirection="column" gap="15px">
      {boolean1descr && (
        <Box display="flex" gap="10px" alignItems="center">
          <Typography component="h5" fontWeight="700" color="text.secondary">
            {boolean1descr}
          </Typography>
          <Checkbox
            value={boolean1}
            onChange={(event, checked) => setBoolean1(checked)}
          />
        </Box>
      )}
      {boolean2descr && (
        <Box display="flex" gap="10px" alignItems="center">
          <Typography component="h5" fontWeight="700" color="text.secondary">
            {boolean2descr}
          </Typography>
          <Checkbox
            value={boolean2}
            onChange={(event, checked) => setBoolean2(checked)}
          />
        </Box>
      )}
      {boolean3descr && (
        <Box display="flex" gap="10px" alignItems="center">
          <Typography component="h5" fontWeight="700" color="text.secondary">
            {boolean3descr}
          </Typography>
          <Checkbox
            value={boolean3}
            onChange={(event, checked) => setBoolean3(checked)}
          />
        </Box>
      )}
    </Box>
  );
}
