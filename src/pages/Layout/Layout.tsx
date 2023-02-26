import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../modules';
import { SnackbarAlert } from '../../components';

export function Layout() {
  return (
    <main>
      <Header />
      <SnackbarAlert />
      <Outlet />
    </main>
  );
}
