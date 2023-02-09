import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {globalAPI} from '../../../global/API_Source_URL';

export const UserCreditPaymentAPI = createApi({
  reducerPath: 'UserCreditPaymentAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: globalAPI + '/UserCredit/',
  }),
  tagTypes: ['payment'],
  endpoints: builder => ({
    getCreditUserInfoForSeller: builder.query({
      query: params => `GetCreditUserInfoForSeller?uid=${params.uid}`,
    }),
    getCreditOrderInfoForSeller: builder.query({
      query: params => `GetCreditOrderInfoForSeller?uid=${params.uid}&vid=${params.vid}`,
      providesTags: ['payment'],
    }),
    getCreditUserInfoForBuyer: builder.query({
      query: params => `GetCreditUserInfoForBuyer?uid=${params.uid}`,
    }),
    getCreditOrderInfoForBuyer: builder.query({
      query: params => `GetCreditOrderInfoForBuyer?uid=${params.uid}&vid=${params.vid}`,
      providesTags: ['payment'],
    }),
    addUserPayment: builder.mutation({
      query: data => ({
        url: `AddUserPayment?oid=${data.oid}&amountpaid=${data.amountpaid}`,
        method: 'POST',
      }),
      invalidatesTags: ['payment'],
    }),
    getPayments: builder.query({
      query: params => `GetPayments?oid=${params.oid}`,
      providesTags: ['payment'],
    }),
    getCreditPayments: builder.query({
      query: params => `GetCreditPayments?crId=${params.crId}`,
      providesTags: ['payment'],
    }),
  }),
});

export const {
  useGetCreditUserInfoForSellerQuery,
  useGetCreditOrderInfoForSellerQuery,
  useGetCreditUserInfoForBuyerQuery,
  useGetCreditOrderInfoForBuyerQuery,
  useAddUserPaymentMutation,
  useGetPaymentsQuery,
  useGetCreditPaymentsQuery
} = UserCreditPaymentAPI;
