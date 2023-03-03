import React, { useState } from 'react';
import { IconButton, InputBase, Paper } from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../store/hooks/redux';
import { setSearch, setTag } from '../../../store/reducers';

export function SearchInput() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');

  const handleClick = () => {
    dispatch(setTag({ tag: '' }));
    dispatch(setSearch({ search: searchValue }));
    setSearchValue('');
    navigate('/search');
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(event.target.value);
  };
  return (
    <Paper
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        maxWidth: 200,
        height: 35,
      }}
    >
      <InputBase
        value={searchValue}
        onChange={handleChange}
        size="small"
        sx={{ ml: 1, flex: 1 }}
        placeholder={`${t('search')}`}
      />
      <IconButton
        onClick={handleClick}
        disabled={searchValue.trim() === ''}
        type="button"
        sx={{ p: '10px' }}
        aria-label="search"
      >
        <SearchRounded />
      </IconButton>
    </Paper>
  );
}
