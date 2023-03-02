import React from 'react';
import { Box, Typography } from '@mui/material';
import { IOptionalDates } from './optional-dates.types';

export function OptionalDates({
  date1,
  date2,
  date3,
  setDate1,
  setDate2,
  setDate3,
  date3descr,
  date2descr,
  date1descr,
}: IOptionalDates) {
  return (
    <Box display="flex" flexDirection="column" gap="15px">
      {date1descr && (
        <Box display="flex" flexDirection="column" gap="10px">
          <Typography component="h5" fontWeight="700" color="text.secondary">
            {date1descr}
          </Typography>
          <Box maxWidth="500px">
            <input
              type="date"
              value={date1 || ''}
              onChange={(event) => setDate1(event.target.value)}
            />
          </Box>
        </Box>
      )}
      {date2descr && (
        <Box display="flex" flexDirection="column" gap="10px">
          <Typography component="h5" fontWeight="700" color="text.secondary">
            {date2descr}
          </Typography>
          <Box maxWidth="500px">
            <input
              type="date"
              value={date2 || ''}
              onChange={(event) => setDate2(event.target.value)}
            />
          </Box>
        </Box>
      )}
      {date3descr && (
        <Box display="flex" flexDirection="column" gap="10px">
          <Typography component="h5" fontWeight="700" color="text.secondary">
            {date3descr}
          </Typography>
          <Box maxWidth="500px">
            <input
              type="date"
              value={date3 || ''}
              onChange={(event) => setDate3(event.target.value)}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
