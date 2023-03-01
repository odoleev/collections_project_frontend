import React from 'react';
import { AppBar, Button, Container, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks/redux';
import { RolesEnum, IPageLink } from '../../types';
import { BurgerMenu, HeaderButtons, HeaderMenu } from '../../components';

export function Header() {
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
    <AppBar style={{ backgroundColor: 'black' }} position="static">
      <Container>
        <Toolbar
          sx={{ display: 'flex', justifyContent: 'space-between' }}
          disableGutters
        >
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
          <HeaderButtons />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
