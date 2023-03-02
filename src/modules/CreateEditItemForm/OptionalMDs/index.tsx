import React from 'react';
import { Box, Typography } from '@mui/material';
import { Options } from 'easymde';
import { IOptionalMDs } from './optional-mds.types';
import { StyledMDe } from '../../../UI';

export function OptionalMDs({
  text1,
  text2,
  text3,
  setText1,
  setText2,
  setText3,
  text3descr,
  text2descr,
  text1descr,
}: IOptionalMDs) {
  const options = React.useMemo(
    (): Options => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: false,
      placeholder: 'Enter your description',
      status: false,
    }),
    []
  );
  return (
    <Box display="flex" flexDirection="column" gap="15px">
      {text1descr && (
        <Box display="flex" flexDirection="column" gap="10px">
          <Typography component="h5" fontWeight="700" color="text.secondary">
            {text1descr}
          </Typography>
          <StyledMDe
            options={options}
            value={text1 || ''}
            onChange={(value) => setText1(value)}
          />
        </Box>
      )}
      {text2descr && (
        <Box display="flex" flexDirection="column" gap="10px">
          <Typography component="h5" fontWeight="700" color="text.secondary">
            {text2descr}
          </Typography>
          <StyledMDe
            options={options}
            value={text2 || ''}
            onChange={(value) => setText2(value)}
          />
        </Box>
      )}
      {text3descr && (
        <Box display="flex" flexDirection="column" gap="10px">
          <Typography component="h5" fontWeight="700" color="text.secondary">
            {text3descr}
          </Typography>
          <StyledMDe
            options={options}
            value={text3 || ''}
            onChange={(value) => setText3(value)}
          />
        </Box>
      )}
    </Box>
  );
}
