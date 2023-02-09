import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DistributorProductScreen from '../../screens/distributor/DistributorProductScreen'
import DistributorProductDetail from '../../screens/distributor/DistributorProductDetail'

const myVNavStack=createNativeStackNavigator()

export default function DistributorProductsNavStack () {
    return (
      <myVNavStack.Navigator>
            <myVNavStack.Screen
              name='DistributorProductScreen' 
              component={DistributorProductScreen}
              options={{headerShown:false}} 
            />
            <myVNavStack.Screen
              name='DistributorProductDetail' 
              component={DistributorProductDetail}
              options={{headerShown:false}} 
            />
      </myVNavStack.Navigator>
    )
  }
