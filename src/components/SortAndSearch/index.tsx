import React from 'react';
import { Box, MenuItem, Select, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ISortAndSearch } from './sort-and-search.types';
import {ResponsiveWrapper} from "../../UI";

export function SortAndSearch({
  disableSearch = false,
  setSearch,
  setSort,
  options,
  sort,
}: ISortAndSearch) {
  const { t } = useTranslation();
  return (
    <ResponsiveWrapper>
      {!disableSearch && setSearch && (
        <TextField
          onChange={(event) => setSearch(event.target.value)}
          id="standard-basic"
          label={t('search')}
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
    </ResponsiveWrapper>
  );
}
