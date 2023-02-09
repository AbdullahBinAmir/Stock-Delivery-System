import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainUserCreditScreens from '../../screens/vendor/credit/MainUserCreditScreens'
import PaymentDetailsScreen from '../../screens/vendor/credit/PaymentDetailsScreen'
import OrderDetailsScreen from '../../screens/vendor/credit/OrderDetailsScreen'
import CreditOrdersScreen from '../../screens/vendor/credit/CreditOrdersScreen'
import NotificationForBuyer from '../../screens/vendor/credit/NotificationForBuyer'
import NotificationForSeller from '../../screens/vendor/credit/NotificationForSeller'

const odnavStack=createNativeStackNavigator()

export default function UserCreditNavStack() {
    return (
      <odnavStack.Navigator>
            <odnavStack.Screen
                name='MainUserCreditScreens'
                component={MainUserCreditScreens}
                options={{headerShown:false}}
            />
            <odnavStack.Screen
                name='PaymentDetailsScreen'
                component={PaymentDetailsScreen}
                options={{headerShown:false}}
            />
            <odnavStack.Screen
                name='OrderDetailsScreen'
                component={OrderDetailsScreen}
                options={{headerShown:false}}
            />
            <odnavStack.Screen
                name='CreditOrdersScreen'
                component={CreditOrdersScreen}
                options={{headerShown:false}}
            />
            <odnavStack.Screen
                name='NotificationForBuyer'
                component={NotificationForBuyer}
                options={{headerShown:false}}
            />
            <odnavStack.Screen
                name='NotificationForSeller'
                component={NotificationForSeller}
                options={{headerShown:false}}
            />
      </odnavStack.Navigator>
    )
  }
