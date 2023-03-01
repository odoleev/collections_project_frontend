import React from 'react';
import { Box, Typography } from '@mui/material';
import { IOptionalStrings } from './optional-strings.types';
import { StyledInput } from '../../../UI';

export function OptionalStrings({
  string1,
  setString1,
  string2,
  setString2,
  string3,
  setString3,
  string1descr,
  string2descr,
  string3descr,
}: IOptionalStrings) {
  return (
    <Box>
      {string1descr && (
        <Box display="flex" flexDirection="column" gap="10px">
          <Typography component="h5" fontWeight="700" color="text.secondary">
            {string1descr}
          </Typography>
          <StyledInput
            value={string1}
            onChange={(event) => setString1(event.target.value)}
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      )}
      {string2descr && (
        <Box display="flex" flexDirection="column" gap="10px">
          <Typography component="h5" fontWeight="700" color="text.secondary">
            {string2descr}
          </Typography>
          <StyledInput
            value={string2}
            onChange={(event) => setString2(event.target.value)}
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      )}
      {string3descr && (
        <Box display="flex" flexDirection="column" gap="10px">
          <Typography component="h5" fontWeight="700" color="text.secondary">
            {string3descr}
          </Typography>
          <StyledInput
            value={string3}
            onChange={(event) => setString3(event.target.value)}
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      )}
    </Box>
  );
}
