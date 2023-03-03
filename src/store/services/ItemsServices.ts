import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { MethodEnum } from '../../helpers/enum';
import {
  IApiItems,
  ICreateItem,
  IEditItem,
  IItem,
  IGetQueries,
  IQueriesAndId,
  ITagsQueries,
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
      invalidatesTags: ['Items'],
    }),
    findByTags: build.mutation<IApiItems, ITagsQueries>({
      query: ({ body, search, limit, page, sort }) => ({
        url: `tags`,
        method: MethodEnum.POST,
        params: {
          limit,
          page,
          search,
          sort,
        },
        body,
      }),
    }),
    getTags: build.mutation({
      query: () => ({
        url: `tags-cloud`,
        method: MethodEnum.POST,
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
