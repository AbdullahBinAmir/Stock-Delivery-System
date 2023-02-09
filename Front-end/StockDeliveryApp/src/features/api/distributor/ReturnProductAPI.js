import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {globalAPI} from '../../../global/API_Source_URL';

export const ReturnProductAPI = createApi({
  reducerPath: 'ReturnProductAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: globalAPI + '/ReturnProduct/',
  }),
  tagTypes: ['RProduct'],
  endpoints: builder => ({
    getReasonForSeller: builder.query({
      query: params => `GetReasonForSeller?sid=${params.uid}`,
      providesTags: ['RProduct'],
    }),
    getReasonForBuyer: builder.query({
      query: params => `GetReasonForBuyer?bid=${params.uid}`,
      providesTags: ['RProduct'],
    }),
    updateReturnReason: builder.mutation({
      query: params => ({
        url: `UpdateReturnReason?rid=${params.rid}&status=${params.status}`,
        method: 'PUT'
      }),
      invalidatesTags: ['RProduct'],
    }),
  }),
});

export const {
  useGetReasonForSellerQuery,
  useGetReasonForBuyerQuery,
  useUpdateReturnReasonMutation
} = ReturnProductAPI;
