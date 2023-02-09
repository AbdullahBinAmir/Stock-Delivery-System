import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {globalAPI} from '../../../global/API_Source_URL';

export const VendorListsApi = createApi({
  reducerPath: 'vendorListApi',
  baseQuery: fetchBaseQuery({
    baseUrl: globalAPI + '/VendorDistributors/',
  }),
  tagTypes: ['VendorsList', 'MyVendors', 'getDistributors'],
  endpoints: builder => ({
    getVendorsList: builder.query({
      query: (params) => `GetVendorList?did=${params.id}`,
      providesTags: ['VendorsList'],
    }),
    getVendors: builder.query({
      query: params => `GetVendors?vid=${params.vid}&did=${params.did}`,
      providesTags: ['MyVendors'],
    }),
    getMyVendors: builder.query({
      query: params => `GetMyVendors?did=${params.id}`,
      providesTags: ['MyVendors'],
    }),
    getDistributors: builder.query({
      query: params => `GetDistributors?vid=${params.id}`,
      providesTags: ['getDistributors'],
    }),
    addVendorDistributor: builder.mutation({
      query: data => ({
        url: 'AddDistributorsForVendor',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: data,
      }),
      invalidatesTags: ['VendorsList'],
    }),
    updateVendorDistrubutor: builder.mutation({
      query: data => ({
        url: 'UpdateDistributorStatus',
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: data,
      }),
      invalidatesTags: ['MyVendors', 'getDistributors'],
    }),
  }),
});

export const {
  useGetVendorsListQuery,
  useGetDistributorsQuery,
  useGetVendorsQuery,
  useAddVendorDistributorMutation,
  useUpdateVendorDistrubutorMutation,
  useGetMyVendorsQuery
} = VendorListsApi;
