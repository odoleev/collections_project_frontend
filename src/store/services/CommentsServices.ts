import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IComment, ICreateComment } from '../../types';
import { MethodEnum } from '../../helpers/enum';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

export const commentsAPI = createApi({
  reducerPath: 'commentsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_SERVER_URL}/comments`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authReducer.accessToken;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getComments: build.query<IComment[], string>({
      query: (id) => ({
        url: `${id}`,
      }),
    }),
    createComment: build.mutation<IComment, ICreateComment>({
      query: (body) => ({
        url: ``,
        method: MethodEnum.POST,
        body,
      }),
    }),
  }),
});
