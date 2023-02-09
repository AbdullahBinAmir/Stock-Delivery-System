import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { globalAPI } from '../../../global/API_Source_URL';

export const UsersApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: globalAPI+'/users/',
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => `getusers?uemail=${params.emailAddress}&password=${params.password}`,
    }),
    getStatistics: builder.query({
      query: (params) => `GetStatistics?vid=${params.id}`,
    }),
  }),
});

export const { useGetUsersQuery, useGetStatisticsQuery } = UsersApi;