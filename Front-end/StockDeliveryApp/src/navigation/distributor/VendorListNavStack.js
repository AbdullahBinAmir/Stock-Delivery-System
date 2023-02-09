import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//import VendorListScreen from '../../screens/distributor/VendorListScreen'
import VendorDetailsScreens from '../../screens/distributor/VendorDetailsScreens'
import MainOrderScreen from '../../screens/distributor/MainOrderScreen'
import VendorProductsDetails from '../../screens/distributor/VendorProductsDetails'
import PlaceOrderScreen from '../../screens/distributor/PlaceOrderScreen'
import ProductCatSearchScreen from '../../screens/shopkeeper/ProductCatSearchScreen'

const vLNavStack=createNativeStackNavigator()

export default function VendorListNavStack () {
    return (
      <vLNavStack.Navigator>
            <vLNavStack.Screen
                name='ProductCatSearchScreen'
                component={ProductCatSearchScreen}
                options={{headerShown:false}}
            />
            <vLNavStack.Screen
              name='VendorDetailsScreens'
              component={VendorDetailsScreens}
              options={{headerShown:false}}
            />
            <vLNavStack.Screen
              name='MainOrderScreen' 
              component={MainOrderScreen}
              options={{headerShown:false}} 
            />
            <vLNavStack.Screen
            name='VendorProductsDetails'
            component={VendorProductsDetails}
            options={{headerShown:false}} 
          />
          <vLNavStack.Screen
            name='PlaceOrderScreen' 
            component={PlaceOrderScreen}
            options={{headerShown:false}} 
          />
      </vLNavStack.Navigator>
    )
  }
