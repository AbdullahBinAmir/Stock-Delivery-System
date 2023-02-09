import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DistributorOrderScreen from '../../screens/vendor/order/DistributorOrderScreen'
import OrderDetailsScreen from '../../screens/vendor/order/OrderDetailScreen'
import CancelledOrderScreen from '../../screens/vendor/order/CancelledOrderScreen'
import FetchByOrderStatusScreen from '../../screens/vendor/order/FetchByOrderStatusScreen'

const odnavStack=createNativeStackNavigator()

export default function CancelledOrderNavStack() {
    return (
      <odnavStack.Navigator>
            <odnavStack.Screen
                name='CancelledOrderScreen'
                component={CancelledOrderScreen}
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
