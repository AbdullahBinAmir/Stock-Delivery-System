import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import { DistributorProductAPI } from './src/features/api/distributor/DistributorProductAPI';
import { ReturnProductAPI } from './src/features/api/distributor/ReturnProductAPI';
import {VendorListsApi} from './src/features/api/distributor/VendorListAPISlice';
import { ShopkeeperClientsApi } from './src/features/api/shopkeeper/ShopkeeperClientsAPI';
import { NotificationAPI } from './src/features/api/vendor/NotificationAPISlice';
import {UsersApi} from './src/features/api/vendor/userAPISlice';
import { UserCreditPaymentAPI } from './src/features/api/vendor/UserCreditAPI';
import {VendorOrdersAPI} from './src/features/api/vendor/vendorOrdersAPISlice';
import {VendorProductsApi} from './src/features/api/vendor/VendorProductsAPISlice';
import AuthSlice from './src/features/auth/AuthSlice';
import OrderManagerSlice from './src/features/orderManagement.js/OrderSlice';
import AddProductSlice from './src/features/product/AddProductSlice';
import VendorDistributorSlice from './src/features/vendorDistributor/VendorDistributorSlice';

const rootReducer = combineReducers({
  user: AuthSlice,
  add_product: AddProductSlice,
  vendor_distributor: VendorDistributorSlice,
  order_manager: OrderManagerSlice,
  [UsersApi.reducerPath]: UsersApi.reducer,
  [VendorProductsApi.reducerPath]: VendorProductsApi.reducer,
  [VendorListsApi.reducerPath]: VendorListsApi.reducer,
  [VendorOrdersAPI.reducerPath]: VendorOrdersAPI.reducer,
  [DistributorProductAPI.reducerPath]: DistributorProductAPI.reducer,
  [UserCreditPaymentAPI.reducerPath]: UserCreditPaymentAPI.reducer,
  [ShopkeeperClientsApi.reducerPath]: ShopkeeperClientsApi.reducer,
  [NotificationAPI.reducerPath]: NotificationAPI.reducer,
  [ReturnProductAPI.reducerPath]: ReturnProductAPI.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      UsersApi.middleware,
      VendorProductsApi.middleware,
      VendorListsApi.middleware,
      VendorOrdersAPI.middleware,
      DistributorProductAPI.middleware,
      UserCreditPaymentAPI.middleware,
      ShopkeeperClientsApi.middleware,
      NotificationAPI.middleware,
      ReturnProductAPI.middleware
    ),
});

setupListeners(store.dispatch);
