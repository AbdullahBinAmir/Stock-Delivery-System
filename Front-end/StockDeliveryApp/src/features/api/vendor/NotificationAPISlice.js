import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {globalAPI} from '../../../global/API_Source_URL';

export const NotificationAPI = createApi({
  reducerPath: 'NotificationAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: globalAPI + '/Notification/',
  }),
  tagTypes: ['notification','unotification','dnotification'],
  endpoints: builder => ({
    addNotification: builder.mutation({
      query: data => ({
        url: `AddNotification?crId=${data.crId}&amountpaid=${data.amountpaid}&bid=${data.bid}&sid=${data.sid}`,
        method: 'POST',
      }),
      invalidatesTags: ['notification'],
    }),
    updateNotification: builder.mutation({
      query: data => ({
        url: `UpdateNotification?id=${data.id}&status=${data.status}`,
        method: 'PUT',
      }),
      invalidatesTags: ['unotification'],
    }),
    deleteNotification: builder.mutation({
      query: data => ({
        url: `DeleteNotification?id=${data.id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['dnotification'],
    }),
    getNotificationForSeller: builder.query({
      query: params => `GetNotificationForSeller?id=${params.id}`,
      providesTags: ['notification','unotification','dnotification'],
    }),
    getNotificationForBuyer: builder.query({
      query: params => `GetNotificationForBuyer?id=${params.id}`,
      providesTags: ['notification','unotification','dnotification'],
    })
  }),
});

export const {
    useAddNotificationMutation,
    useUpdateNotificationMutation,
    useGetNotificationForBuyerQuery,
    useGetNotificationForSellerQuery,
    useDeleteNotificationMutation
} = NotificationAPI;
