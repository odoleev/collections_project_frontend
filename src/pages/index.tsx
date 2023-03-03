import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Login } from './Login';
import { Users } from './Users';
import NotFound from './NotFound';
import { Home } from './Home';
import { AdminElement, PublicElement, UserElement } from './Routes';
import { PersonalAccount } from './PersonalAccount';
import { useAppDispatch } from '../store/hooks/redux';
import { setUser } from '../store/reducers';
import { Registration } from './Registration';
import { Collection } from './Collection';
import { ItemPage } from './Item';
import { Search } from './Search';
import { CreateCollection } from './CreateCollection';
import { CreateItem } from './CreateItem';
import {Tags} from "./Tags";

export function Routing() {
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={
            <PublicElement>
              <Home />
            </PublicElement>
          }
        />
        <Route
          path="login"
          element={
            <PublicElement>
              <Login />
            </PublicElement>
          }
        />
        <Route
          path="registration"
          element={
            <PublicElement>
              <Registration />
            </PublicElement>
          }
        />

        <Route
          path="personal-account/:id"
          element={
            <PublicElement>
              <PersonalAccount />
            </PublicElement>
          }
        />

        <Route
          path="collection/:id"
          element={
            <PublicElement>
              <Collection />
            </PublicElement>
          }
        />

        <Route
          path="item/:id"
          element={
            <PublicElement>
              <ItemPage />
            </PublicElement>
          }
        />

        <Route
          path="search"
          element={
            <PublicElement>
              <Search />
            </PublicElement>
          }
        />
        <Route
          path="tags"
          element={
            <PublicElement>
              <Tags />
            </PublicElement>
          }
        />

        <Route
          path="*"
          element={
            <PublicElement>
              <NotFound />
            </PublicElement>
          }
        />

        <Route
          path="create-collection/:id"
          element={
            <UserElement>
              <CreateCollection />
            </UserElement>
          }
        />

        <Route
          path="create-item/:id"
          element={
            <UserElement>
              <CreateItem />
            </UserElement>
          }
        />

        <Route
          path="users"
          element={
            <AdminElement>
              <Users />
            </AdminElement>
          }
        />
      </Route>
    </Routes>
  );
}
