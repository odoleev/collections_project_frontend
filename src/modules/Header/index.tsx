import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  createTheme,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAppSelector } from '../../store/hooks/redux';
import { RolesEnum, IPageLink } from '../../types';
import { BurgerMenu, HeaderButtons, HeaderMenu } from '../../components';
import { SearchInput } from './SearchInput';
import { ColorModeContext } from '../../context/theme-context';

export function Header() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const navigate = useNavigate();
  const { username, role, id } = useAppSelector((state) => state.authReducer);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const AuthPages: IPageLink[] = [
    { name: `${username} Collections`, link: `/personal-account/${id}` },
  ];
  const AdminPages: IPageLink[] = [
    { name: `${username} Collections`, link: `/personal-account/${id}` },
    { name: 'Users', link: '/users' },
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
          <Box display="flex" gap="25px" alignItems="center">
            {!username && (
              <Button
                onClick={() => {
                  navigate('/');
                }}
                sx={{ my: 2, color: 'mintcream', display: 'block' }}
              >
                Main
              </Button>
            )}
            {username && (
              <BurgerMenu
                handleClose={handleCloseNavMenu}
                options={role === RolesEnum.ADMIN ? AdminPages : AuthPages}
                handleOpen={handleOpenNavMenu}
                anchor={anchorElNav}
              />
            )}
            {username && (
              <HeaderMenu
                options={role === RolesEnum.ADMIN ? AdminPages : AuthPages}
                handleClose={handleCloseNavMenu}
              />
            )}
            <Box>
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
            </Box>
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
