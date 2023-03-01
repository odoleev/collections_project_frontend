import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { MethodEnum } from '../../helpers/enum';
import { IApiItems, ICreateItem, IEditItem, IItem } from '../../types/items';
import {
  IGetQueries,
  IQueriesAndId,
} from '../../types';

export const itemsAPI = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_SERVER_URL}/items`,
  }),
  tagTypes: ['Items'],
  endpoints: (build) => ({
    getCollectionItems: build.query<IApiItems, IQueriesAndId>({
      query: ({ limit, page, search, sort, id }) => ({
        url: `collection/${id}`,
        params: {
          limit,
          page,
          search,
          sort,
        },
      }),
      providesTags: (result) => ['Items'],
    }),
    getItem: build.query<IItem, string>({
      query: (id: string) => ({
        url: `${id}`,
      }),
      providesTags: (result) => ['Items'],
    }),
    getSearchItems: build.query<IApiItems, IGetQueries>({
      query: ({ limit, page, search, sort }) => ({
        url: ``,
        params: {
          limit,
          page,
          search,
          sort,
        },
      }),
      providesTags: (result) => ['Items'],
    }),
    getLastItems: build.mutation<IApiItems, null>({
      query: () => ({
        url: `last`,
        method: MethodEnum.POST,
      }),
    }),
    createItem: build.mutation<IItem, { body: ICreateItem; token: string }>({
      query: ({ body, token }) => ({
        url: ``,
        method: MethodEnum.POST,
        body,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    findByTags: build.mutation<IApiItems, { body: string[] }>({
      query: ({ body }) => ({
        url: `tags`,
        method: MethodEnum.POST,
        body,
      }),
    }),
    likeItem: build.mutation<
      null,
      { body: { userId: string; itemId: string }; token: string }
    >({
      query: ({ body, token }) => ({
        url: `like`,
        method: MethodEnum.POST,
        body,
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ['Items'],
    }),
    editItem: build.mutation<
      IItem,
      { body: IEditItem; id: string; token: string }
    >({
      query: ({ body, id, token }) => ({
        url: `${id}`,
        method: MethodEnum.PATCH,
        body,
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ['Items'],
    }),
    deleteItem: build.mutation<null, { id: string; token: string }>({
      query: ({ id, token }) => ({
        url: `${id}`,
        method: MethodEnum.DELETE,
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ['Items'],
    }),
  }),
});
