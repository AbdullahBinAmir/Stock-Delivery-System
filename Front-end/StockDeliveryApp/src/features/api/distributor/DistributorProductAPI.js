import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {globalAPI} from '../../../global/API_Source_URL';

export const DistributorProductAPI = createApi({
  reducerPath: 'DistributorProductApi',
  baseQuery: fetchBaseQuery({
    baseUrl: globalAPI + '/DistributorProduct/',
  }),
  tagTypes: ['DProducts'],
  endpoints: builder => ({
    getDistributorProducts: builder.query({
      query: params => `GetDistributorProducts?did=${params.uid}`,
      providesTags: ['DProducts'],
    }),
    getAllDistributorProducts: builder.query({
      query: params => `GetAllDistributorProducts`,
      providesTags: ['DProducts'],
    }),
    updateDistrubutorProductInfo: builder.mutation({
      query: params => ({
        url: `UpdateDistributorProductInfo?dpid=${params.dpid}&saleprice=${params.saleprice}`,
        method: 'PUT'
      }),
      invalidatesTags: ['DProducts'],
    }),
  }),
});

export const {
  useGetDistributorProductsQuery,
  useGetAllDistributorProductsQuery,
  useUpdateDistrubutorProductInfoMutation
} = DistributorProductAPI;
