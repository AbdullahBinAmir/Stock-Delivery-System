import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import VendorProductsDetails from '../../screens/distributor/VendorProductsDetails'
import ProviderInfoScreen from '../../screens/shopkeeper/ProviderInfoScreen'
import ProductCatSearchScreen from '../../screens/shopkeeper/ProductCatSearchScreen'
import MainOrderScreen from '../../screens/distributor/MainOrderScreen';
import PlaceOrderScreen from '../../screens/distributor/PlaceOrderScreen';

const myVNavStack=createNativeStackNavigator()

export default function ShopkeeperSearchNavStack () {
    return (
      <myVNavStack.Navigator>
            <myVNavStack.Screen
              name='ProductCatSearchScreen' 
              component={ProductCatSearchScreen}
              options={{headerShown:false}} 
            />
            <myVNavStack.Screen
              name='ProviderInfoScreen' 
              component={ProviderInfoScreen}
              options={{headerShown:false}} 
            />
            <myVNavStack.Screen
                name='VendorProductsDetails' 
                component={VendorProductsDetails}
                options={{headerShown:false}} 
            />
            <myVNavStack.Screen
              name="MainOrderScreen"
              component={MainOrderScreen}
              options={{headerShown: false}}
            />
            <myVNavStack.Screen
              name="PlaceOrderScreen"
              component={PlaceOrderScreen}
              options={{headerShown: false}}
            />
      </myVNavStack.Navigator>
    )
  }
