import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  useTheme,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks/redux';
import { RolesEnum, IPageLink } from '../../types';
import { BurgerMenu, HeaderButtons, HeaderMenu } from '../../components';
import { SearchInput } from './SearchInput';
import { ColorModeContext } from '../../context/theme-context';
import i18n from '../../i18next';

export function Header() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState<'en' | 'ru'>('en');

  const changeLanguage = () => {
    if (language === 'ru') {
      setLanguage('en');
      i18n.changeLanguage('en');
    } else {
      setLanguage('ru');
      i18n.changeLanguage('ru');
    }
  };

  useEffect(() => {
    setLanguage('en');
    i18n.changeLanguage('en');
  }, []);

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const { username, role, id } = useAppSelector((state) => state.authReducer);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const AuthPages: IPageLink[] = [
    {
      name: `${username} ${t('header.collections')}`,
      link: `/personal-account/${id}`,
    },
  ];
  const AdminPages: IPageLink[] = [
    {
      name: `${username} ${t('header.collections')}`,
      link: `/personal-account/${id}`,
    },
    { name: `${t('header.users')}`, link: '/users' },
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar color="secondary" position="static">
      <Container>
        <Toolbar
          sx={{ display: 'flex', justifyContent: 'space-between' }}
          disableGutters
        >
          <Box display="flex" gap="5px" alignItems="center">
            {!username && (
              <HeaderMenu
                changeLanguage={changeLanguage}
                language={language}
                handleClose={handleCloseNavMenu}
              />
            )}
            {!username && (
              <BurgerMenu
                changeLanguage={changeLanguage}
                language={language}
                handleClose={handleCloseNavMenu}
                handleOpen={handleOpenNavMenu}
                anchor={anchorElNav}
              />
            )}
            {username && (
              <BurgerMenu
                changeLanguage={changeLanguage}
                language={language}
                handleClose={handleCloseNavMenu}
                options={role === RolesEnum.ADMIN ? AdminPages : AuthPages}
                handleOpen={handleOpenNavMenu}
                anchor={anchorElNav}
              />
            )}
            {username && (
              <HeaderMenu
                changeLanguage={changeLanguage}
                language={language}
                options={role === RolesEnum.ADMIN ? AdminPages : AuthPages}
                handleClose={handleCloseNavMenu}
              />
            )}
            <Box>
              <Tooltip arrow title={t('header.change_theme')}>
                <IconButton
                  onClick={colorMode.toggleColorMode}
                  color="inherit"
                  size="small"
                >
                  {theme.palette.mode === 'dark' ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
            <Box />
          </Box>

          <Box display="flex" alignItems="center" gap="10px">
            <SearchInput />
            <HeaderButtons />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
