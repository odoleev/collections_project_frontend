import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAuthApi, ILogin, IRegistration } from '../../types';
import { MethodEnum } from '../../helpers/enum';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_SERVER_URL}/auth`,
  }),
  endpoints: (build) => ({
    login: build.mutation<IAuthApi, ILogin>({
      query: (body: ILogin) => ({
        url: `/login`,
        method: MethodEnum.POST,
        body,
      }),
    }),
    registration: build.mutation<string, IRegistration>({
      query: (body: IRegistration) => ({
        url: `/registration`,
        method: MethodEnum.POST,
        body,
        responseHandler: (response) => response.text(),
      }),
    }),
    logout: build.mutation<null, string>({
      query: (token: string) => ({
        url: `/logout`,
        method: MethodEnum.POST,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    refreshToken: build.mutation<null, string>({
      query: (token: string) => ({
        url: `/refresh`,
        method: MethodEnum.POST,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});
