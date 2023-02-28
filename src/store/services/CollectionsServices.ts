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
    getCollection: build.query<IApiCollections, string>({
      query: (id: string) => ({
        url: `${id}`,
      }),
    }),
    getMostItemsCollection: build.query<IApiCollections, null>({
      query: () => ({
        url: ``,
      }),
    }),
    createCollection: build.mutation<ICollection, ICreateCollection>({
      query: (body: ICreateCollection) => ({
        url: ``,
        method: MethodEnum.POST,
        body,
      }),
      invalidatesTags: ['Collections'],
    }),
    editCollection: build.mutation<ICollection, IEditCollection>({
      query: ({ body, id }: IEditCollection) => ({
        url: `${id}`,
        method: MethodEnum.PATCH,
        body,
      }),
      invalidatesTags: ['Collections'],
    }),
    deleteCollection: build.mutation<null, string>({
      query: (id: string) => ({
        url: `${id}`,
        method: MethodEnum.DELETE,
      }),
      invalidatesTags: ['Collections'],
    }),
  }),
});
