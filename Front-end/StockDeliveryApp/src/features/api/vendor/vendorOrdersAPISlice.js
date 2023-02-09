import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {globalAPI} from '../../../global/API_Source_URL';

export const VendorOrdersAPI = createApi({
  reducerPath: 'VendorOrderAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: globalAPI + '/UserOrder/',
  }),
  tagTypes: ['orders','rating'],
  endpoints: builder => ({
    getRecievedOrders: builder.query({
      query: params => `GetOrdersRecieved?uid=${params.uid}&bid=${params.bid}&status=${params.status}`,
      providesTags: ['orders'],
    }),
    getPlacedOrders: builder.query({
      query: params => `GetOrdersPlaced?uid=${params.uid}&sid=${params.sid}&&status=${params.status}`,
      providesTags: ['orders'],
    }),
    getSellers: builder.query({
      query: params => `GetSellers?uid=${params.uid}&&status=${params.status}`,
      providesTags: ['orders'],
    }),
    getBuyers: builder.query({
      query: params => `GetBuyers?uid=${params.uid}&&status=${params.status}`,
      providesTags: ['orders'],
    }),
    getOrderDetail: builder.query({
        query: params => `GetOrderDetail?oid=${params.id}`,
        providesTags: ['orders'],
      }),
      getDistributorOrderDetail: builder.query({
        query: params => `GetDistributorOrderDetail?oid=${params.id}`,
        providesTags: ['orders'],
      }),
      getUserRating: builder.query({
        query: params => `GetUserRating?uid=${params.id}`,
        providesTags: ['rating'],
      }),
    updateOrderStatus: builder.mutation({
      query: data => ({
        url: `UpdateOrderStatus?orderstatus=${data.status}&oid=${data.oid}`,
        method: 'PUT'
      }),
      invalidatesTags: ['orders'],
    }),
    updateOrderType: builder.mutation({
        query: data => ({
          url: `UpdateOrderType?oid=${data.oid}`,
          method: 'PUT'
        }),
        invalidatesTags: ['orders'],
      }),
      saveUserRating: builder.mutation({
        query: data => ({
          url: `SaveUserRating`,
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: data,
        }),
        invalidatesTags: ['rating'],
      }),
  }),
});

export const {
  useGetRecievedOrdersQuery,
  useGetPlacedOrdersQuery,
  useGetOrderDetailQuery,
  useUpdateOrderStatusMutation,
  useUpdateOrderTypeMutation,
  useGetUserRatingQuery,
  useSaveUserRatingMutation,
  useGetDistributorOrderDetailQuery,
  useGetBuyersQuery,
  useGetSellersQuery
} = VendorOrdersAPI;
