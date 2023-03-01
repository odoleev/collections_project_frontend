import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {
  IQueriesAndId,
  IApiCollections,
  ICollection,
  ICreateCollection,
  IEditCollection,
} from '../../types';
import { MethodEnum } from '../../helpers/enum';

export const collectionsAPI = createApi({
  reducerPath: 'collectionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_SERVER_URL}/collections`,
  }),
  tagTypes: ['Collections'],
  endpoints: (build) => ({
    getUserCollections: build.query<IApiCollections, IQueriesAndId>({
      query: ({ limit, page, search, sort, id }) => ({
        url: `user-collections/${id}`,
        params: {
          limit,
          page,
          search,
          sort,
        },
      }),
      providesTags: (result) => ['Collections'],
    }),
    getCollection: build.query<ICollection, string>({
      query: (id: string) => ({
        url: `${id}`,
      }),
      providesTags: (result) => ['Collections'],
    }),
    getMostItemsCollection: build.query<IApiCollections, null>({
      query: () => ({
        url: ``,
      }),
      providesTags: (result) => ['Collections'],
    }),
    createCollection: build.mutation<
      ICollection,
      { body: ICreateCollection; token: string }
    >({
      query: ({ body, token }) => ({
        url: ``,
        method: MethodEnum.POST,
        body,
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ['Collections'],
    }),
    editCollection: build.mutation<ICollection, IEditCollection>({
      query: ({ body, id, token }: IEditCollection) => ({
        url: `${id}`,
        method: MethodEnum.PATCH,
        body,
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ['Collections'],
    }),
    deleteCollection: build.mutation<null, { id: string; token: string }>({
      query: ({ id, token }) => ({
        url: `${id}`,
        method: MethodEnum.DELETE,
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ['Collections'],
    }),
  }),
});
