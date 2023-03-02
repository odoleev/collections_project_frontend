import React from 'react';
import { Box, MenuItem, Select, TextField } from '@mui/material';
import { ISortAndSearch } from './sort-and-search.types';

export function SortAndSearch({
  disableSearch = false,
  setSearch,
  setSort,
  options,
  sort,
}: ISortAndSearch) {
  return (
    <Box marginBottom="35px" alignItems="center" display="flex" gap="15px">
      {!disableSearch && setSearch && (
        <TextField
          onChange={(event) => setSearch(event.target.value)}
          id="standard-basic"
          label="Search"
          variant="outlined"
          size="small"
        />
      )}

      <Select
        label="Sort"
        size="small"
        value={sort.join(',')}
        onChange={(e) => setSort(e.target.value.split(',') as [string, -1 | 1])}
      >
        {options.map((option) => (
          <MenuItem key={option.title} value={option.sort.join(',')}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
