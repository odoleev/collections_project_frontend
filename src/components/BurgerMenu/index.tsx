import React from 'react';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { IBurgerMenu } from './burger-menu.types';

export function BurgerMenu({
  options,
  handleClose,
  handleOpen,
  anchor,
}: IBurgerMenu) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { color: 'mintcream', xs: 'flex', md: 'none' },
      }}
    >
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpen}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchor)}
        onClose={handleClose}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.name}
            onClick={() => {
              handleClose();
              navigate(option.link);
            }}
          >
            <Typography textAlign="center">{option.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
