import React, { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/reducers';
import { authAPI } from '../../store/services';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { IPageLink } from '../../types';

const PUBLICBUTTONS: IPageLink[] = [
  { name: 'Sign in', link: '/login' },
  { name: 'Sign up', link: '/registration' },
];

export function HeaderButtons() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { username, accessToken } = useAppSelector(
    (state) => state.authReducer
  );
  const [
    logout,
    {
      error: logoutError,
      isSuccess: isLogoutSuccess,
      isLoading: isLogoutLoading,
      isError: isLogoutError,
    },
  ] = authAPI.useLogoutMutation();
  const handleLogout = async () => {
    if (accessToken) {
      await logout(accessToken);
    }
  };

  useEffect(() => {
    if (isLogoutSuccess) {
      dispatch(logoutUser());
      navigate('/');
    }
  }, [isLogoutSuccess]);
  return (
    <Box sx={{ flexGrow: 0 }}>
      {username ? (
        <LoadingButton
          variant="contained"
          loading={isLogoutLoading}
          onClick={handleLogout}
        >
          <Typography>logout</Typography>
        </LoadingButton>
      ) : (
        <Box display="flex" gap="5px">
          {PUBLICBUTTONS.map((button) => (
            <Button
              key={button.name}
              variant="contained"
              onClick={() => navigate(button.link)}
            >
              <Typography>{button.name}</Typography>
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
}
