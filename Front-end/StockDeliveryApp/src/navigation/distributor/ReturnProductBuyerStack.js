import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DistributorReturnScreen from '../../screens/vendor/returnProducts/DistributorReturnScreen'
import ProductReturnScreen from '../../screens/vendor/returnProducts/ProductReturnScreen'
import OrderedProductScreen from '../../screens/vendor/returnProducts/OrderedProductScreen'
import ReturnReasonScreen from '../../screens/vendor/returnProducts/ReturnReasonScreen'

const returnProductBuyerNavStack=createNativeStackNavigator()

export default function ReturnProductBuyerNavStack () {
    return (
        <returnProductBuyerNavStack.Navigator>
            <returnProductBuyerNavStack.Screen
              name='DistributorReturnScreen' 
              component={DistributorReturnScreen}
              options={{headerShown:false}} 
            />
            <returnProductBuyerNavStack.Screen
              name='ProductReturnScreen' 
              component={ProductReturnScreen}
              options={{headerShown:false}} 
            />
            <returnProductBuyerNavStack.Screen
              name='OrderedProductScreen' 
              component={OrderedProductScreen}
              options={{headerShown:false}} 
            />
            <returnProductBuyerNavStack.Screen
              name='ReturnReasonScreen' 
              component={ReturnReasonScreen}
              options={{headerShown:false}} 
            />
        </returnProductBuyerNavStack.Navigator>
    )
  }
