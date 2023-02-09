import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyClientsScreen from '../../screens/shopkeeper/MyClientsScreen'
import MainOrderScreen from '../../screens/distributor/MainOrderScreen'
import PlaceOrderScreen from '../../screens/distributor/PlaceOrderScreen'

const myVNavStack=createNativeStackNavigator()

export default function ShopkeeperOrderNavStack () {
    return (
      <myVNavStack.Navigator>
            <myVNavStack.Screen
              name='MyClientsScreen' 
              component={MyClientsScreen}
              options={{headerShown:false}} 
            />
            <myVNavStack.Screen
              name='MainOrderScreen' 
              component={MainOrderScreen}
              options={{headerShown:false}} 
            />
          <myVNavStack.Screen
            name='PlaceOrderScreen' 
            component={PlaceOrderScreen}
            options={{headerShown:false}} 
          />
      </myVNavStack.Navigator>
    )
  }
