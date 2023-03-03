import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logoutUser } from '../../store/reducers';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { IPageLink } from '../../types';
import { HeaderButtonsText } from '../../UI';

export function HeaderButtons() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const PUBLICBUTTONS: IPageLink[] = [
    { name: t('header.login'), link: '/login' },
    { name: t('header.registration'), link: '/registration' },
  ];

  const { username } = useAppSelector(
    (state) => state.authReducer
  );

  const handleLogout = async () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      {username ? (
        <Button
          variant="contained"
          onClick={handleLogout}
        >
          <Typography>{t('header.logout')}</Typography>
        </Button>
      ) : (
        <Box display="flex" gap="5px">
          {PUBLICBUTTONS.map((button) => (
            <Button
              size="medium"
              key={button.name}
              variant="contained"
              onClick={() => navigate(button.link)}
            >
              <HeaderButtonsText>{button.name}</HeaderButtonsText>
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
}
