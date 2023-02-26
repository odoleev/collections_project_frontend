import React from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';
import { useAppSelector } from '../../store/hooks/redux';
import { RolesEnum, IPageLink } from '../../types';
import { BurgerMenu, HeaderButtons, HeaderMenu } from '../../components';

const AuthPages: IPageLink[] = [
  { name: 'Main', link: '/' },
  { name: 'My Collections', link: '/personal-account' },
];
const AdminPages: IPageLink[] = [
  { name: 'Main', link: '/' },
  { name: 'My Collections', link: '/personal-account' },
  { name: 'Users', link: '/users' },
];

export function Header() {
  const { username, role } = useAppSelector((state) => state.authReducer);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar style={{ backgroundColor: 'black' }} position="static">
      <Container>
        <Toolbar sx={{ display: 'flex', justifyContent: 'end' }} disableGutters>
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
