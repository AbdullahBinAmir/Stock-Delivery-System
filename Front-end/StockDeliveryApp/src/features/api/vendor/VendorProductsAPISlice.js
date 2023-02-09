import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {globalAPI} from '../../../global/API_Source_URL';

export const VendorProductsApi = createApi({
  reducerPath: 'vendorProductApi',
  baseQuery: fetchBaseQuery({
    baseUrl: globalAPI + '/VendorProduct/',
  }),
  tagTypes: ['Products'],
  endpoints: builder => ({
    getProducts: builder.query({
      query: params => `GetProducts?id=${params.id}`,
      providesTags: ['Products'],
    }),
    getAllProducts: builder.query({
      query: params => `GetProducts`,
      providesTags: ['Products'],
    }),
    addVendorProduct: builder.mutation({
      query: data => ({
        url: 'AddProducts',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    updateVendorProduct: builder.mutation({
      query: data => ({
        url: 'UpdateVendorProduct',
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    updateVendorProduct: builder.mutation({
      query: data => ({
        url: 'UpdateVendorProduct',
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    addVendorStock: builder.mutation({
      query: data => ({
        url: 'AddStock',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddVendorProductMutation,
  useUpdateVendorProductMutation,
  useAddVendorStockMutation,
  useGetAllProductsQuery
} = VendorProductsApi;
