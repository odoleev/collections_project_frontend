import React, { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
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
    }
  }, [isLogoutSuccess]);
  return (
    <Box sx={{ flexGrow: 0 }}>
      {username ? (
        <LoadingButton
          variant="outlined"
          loading={isLogoutLoading}
          onClick={handleLogout}
        >
          logout
        </LoadingButton>
      ) : (
        <Box display="flex" gap="5px">
          {PUBLICBUTTONS.map((button) => (
            <Button
              key={button.name}
              variant="outlined"
              onClick={() => navigate(button.link)}
            >
              {button.name}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
}
