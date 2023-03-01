import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IHeaderMenu } from './header-menu.types';

export function HeaderMenu({ options, handleClose }: IHeaderMenu) {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      <Button
        onClick={() => {
          navigate('/');
          handleClose();
        }}
        sx={{ my: 2, color: 'mintcream', display: 'block' }}
      >
        Main
      </Button>
      {options.map((page) => (
        <Button
          key={page.name}
          onClick={() => {
            navigate(page.link);
            handleClose();
          }}
          sx={{ my: 2, color: 'mintcream', display: 'block' }}
        >
          {page.name}
        </Button>
      ))}
    </Box>
  );
}
