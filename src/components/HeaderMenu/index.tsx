import React from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IHeaderMenu } from './header-menu.types';

export function HeaderMenu({
  options,
  handleClose,
  changeLanguage,
  language,
}: IHeaderMenu) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      <Tooltip arrow title={t('header.language')}>
        <Button
          onClick={changeLanguage}
          sx={{ my: 2, color: 'mintcream', display: 'block' }}
        >
          {language}
        </Button>
      </Tooltip>

      <Button
        onClick={() => {
          navigate('/');
          handleClose();
        }}
        sx={{ my: 2, color: 'mintcream', display: 'block' }}
      >
        {t('header.main')}
      </Button>
      {options &&
        options.map((page) => (
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
