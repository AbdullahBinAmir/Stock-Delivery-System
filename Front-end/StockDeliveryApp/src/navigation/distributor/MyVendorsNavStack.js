import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyVendorScreen from '../../screens/distributor/MyVendorScreen'
import MainOrderScreen from '../../screens/distributor/MainOrderScreen'
import VendorProductsDetails from '../../screens/distributor/VendorProductsDetails'
import PlaceOrderScreen from '../../screens/distributor/PlaceOrderScreen'
import DistributorsDetails from '../../screens/vendor/DistributorsDetails'

const myVNavStack=createNativeStackNavigator()

export default function MyVendorsNavStack () {
    return (
      <myVNavStack.Navigator>
            <myVNavStack.Screen
              name='MyVendorScreen' 
              component={MyVendorScreen}
              options={{headerShown:false}} 
            />
            <myVNavStack.Screen
              name='MainOrderScreen' 
              component={MainOrderScreen}
              options={{headerShown:false}} 
            />
            <myVNavStack.Screen
            name='VendorProductsDetails'
            component={VendorProductsDetails}
            options={{headerShown:false}} 
          />
          <myVNavStack.Screen
            name='PlaceOrderScreen' 
            component={PlaceOrderScreen}
            options={{headerShown:false}} 
          />
          <myVNavStack.Screen
            name='DistributorsDetails' 
            component={DistributorsDetails}
            options={{headerShown:false}} 
          />
      </myVNavStack.Navigator>
    )
  }
