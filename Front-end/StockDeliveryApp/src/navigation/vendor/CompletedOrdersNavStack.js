import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DistributorOrderScreen from '../../screens/vendor/order/DistributorOrderScreen'
import OrderDetailsScreen from '../../screens/vendor/order/OrderDetailScreen'
import CompletedOrderScreen from '../../screens/vendor/order/CompletedOrderScreen'
import FetchByOrderStatusScreen from '../../screens/vendor/order/FetchByOrderStatusScreen'
import DistributorReturnScreen from '../../screens/vendor/returnProducts/DistributorReturnScreen'

const odnavStack=createNativeStackNavigator()

export default function CompletedOrderNavStack() {
    return (
      <odnavStack.Navigator>
            <odnavStack.Screen
                name='CompletedOrderScreen'
                component={CompletedOrderScreen}
                options={{headerShown:false}}
            />
            <odnavStack.Screen
                name='FetchByOrderStatusScreen'
                component={FetchByOrderStatusScreen}
                options={{headerShown:false}}
            />
            <odnavStack.Screen
                name='DistributorOrderScreen'
                component={DistributorOrderScreen}
                options={{headerShown:false}}
            />
            <odnavStack.Screen
                name='OrderDetailsScreen'
                component={OrderDetailsScreen}
                options={{headerShown:false}}
            />
      </odnavStack.Navigator>
    )
  }
