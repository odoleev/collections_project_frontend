import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import type { RootState } from '../store';
import { IGetQueries, IUsers, IUsersFromApi } from '../../types';

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_SERVER_URL}/users`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authReducer.accessToken;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Users'],
  endpoints: (build) => ({
    getUsers: build.query<IUsersFromApi, IGetQueries>({
      query: ({ limit, page, search, sort }) => ({
        url: '',
        params: {
          limit,
          page,
          search,
          sort,
        },
      }),
      providesTags: (result) => ['Users'],
    }),
    makeRoleUser: build.mutation<IUsers, string>({
      query: (id: string) => ({
        url: `/role-user/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Users'],
    }),
    makeRoleAdmin: build.mutation<IUsers, string>({
      query: (id: string) => ({
        url: `/role-admin/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Users'],
    }),
    blockUser: build.mutation<IUsers, string>({
      query: (id: string) => ({
        url: `/block/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Users'],
    }),
    unblockUser: build.mutation<IUsers, string>({
      query: (id: string) => ({
        url: `/unblock/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: build.mutation<IUsers, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});
