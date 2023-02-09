import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { globalAPI } from '../../../global/API_Source_URL';

export const ShopkeeperClientsApi = createApi({
  reducerPath: 'ShopkeeperClientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: globalAPI + '/ShopkeeperClients/',
  }),
  tagTypes: ['GetClients','Shopkeeper'],
  endpoints: builder => ({
    getProvidersForShopkeeper: builder.query({
      query: (params) => `GetProvidersForShopkeeper?uid=${params.uid}`,
      providesTags: ['GetClients'],
    }),
    getUniqueBuyerForProvider: builder.query({
      query: (params) => `GetUniqueBuyerForProvider?rid=${params.id}`,
      providesTags: ['GetClients'],
    }),
    getVendorForShopkeeper: builder.query({
      query: (params) => `GetVendorForShopkeeper?pid=${params.pid}`,
      providesTags: ['GetClients'],
    }),
    getDistributorForShopkeeper: builder.query({
      query: (params) => `GetDistributorForShopkeeper?pid=${params.pid}`,
      providesTags: ['GetClients'],
    }),
    getDistributorDataForShopkeeper: builder.query({
      query: (params) => `GetDistributorDataForShopkeeper?uid=${params.uid}`,
      providesTags: ['GetClients'],
    }),
    getDistributorProducts: builder.query({
      query: (params) => `GetDistributorProducts?id=${params.uid}`,
    }),
    getBuyersForProvider: builder.query({
      query: (params) => `GetBuyersForProvider?uid=${params.uid}`,
      providesTags: ['Shopkeeper'],
    }),
    getDistributors: builder.query({
      query: (params) => `GetDistributors?uid=${params.uid}`,
    }),
    getVendors: builder.query({
      query: (params) => `GetVendors?uid=${params.uid}`,
    }),
    addShopkeeperClients: builder.mutation({
      query: data => ({
        url: 'AddShopkeeperClients',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: data,
        }),
        invalidatesTags: ['GetClients'],
    }),
    updateShopkeeperClients: builder.mutation({
        query: data => ({
          url: `UpdateShopkeeperClients?sid=${data.sid}&bid=${data.bid}&security_amount=${data.security_amount}&status=${data.status}`,
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }),
        invalidatesTags: ['Shopkeeper'],
    }),
  }),
});

export const {
    useGetProvidersForShopkeeperQuery,
    useAddShopkeeperClientsMutation,
    useGetDistributorProductsQuery,
    useGetBuyersForProviderQuery,
    useGetDistributorForShopkeeperQuery,
    useGetVendorForShopkeeperQuery,
    useUpdateShopkeeperClientsMutation,
    useGetVendorsQuery,
    useGetDistributorsQuery,
    useGetDistributorDataForShopkeeperQuery,
    useGetUniqueBuyerForProviderQuery
} = ShopkeeperClientsApi;
