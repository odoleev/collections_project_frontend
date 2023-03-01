import React from 'react';
import { Box, Typography } from '@mui/material';
import { IOptionalNumbers } from './optional-numbers.types';
import { StyledInput } from '../../../UI';

export function OptionalNumbers({
  number1,
  number2,
  number3,
  setNumber1,
  setNumber2,
  setNumber3,
  number1descr,
  number2descr,
  number3descr,
}: IOptionalNumbers) {
  return (
    <Box>
      {number1descr && (
        <Box display="flex" flexDirection="column" gap="10px">
          <Typography component="h5" fontWeight="700" color="text.secondary">
            {number1descr}
          </Typography>
          <StyledInput
            value={number1 || 0}
            onChange={(event) => setNumber1(Number(event.target.value))}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      )}
      {number2descr && (
        <Box display="flex" flexDirection="column" gap="10px">
          <Typography component="h5" fontWeight="700" color="text.secondary">
            {number2descr}
          </Typography>
          <StyledInput
            value={number2 || 0}
            onChange={(event) => setNumber2(Number(event.target.value))}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      )}
      {number3descr && (
        <Box display="flex" flexDirection="column" gap="10px">
          <Typography component="h5" fontWeight="700" color="text.secondary">
            {number3descr}
          </Typography>
          <StyledInput
            value={number3 || 0}
            onChange={(event) => setNumber3(Number(event.target.value))}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      )}
    </Box>
  );
}
