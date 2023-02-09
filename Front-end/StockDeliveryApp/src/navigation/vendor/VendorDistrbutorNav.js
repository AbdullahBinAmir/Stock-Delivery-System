import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import VendorDistributorsScreen from '../../screens/vendor/VendorDistributorsScreen'
import DistributorsDetails from '../../screens/vendor/DistributorsDetails'

const vdnavStack=createNativeStackNavigator()

export default function VendorDistrbutorNav () {
    return (
      <vdnavStack.Navigator>
            <vdnavStack.Screen
                name='VendorDistributorsScreen'
                component={VendorDistributorsScreen}
                options={{headerShown:false}}
            />
            <vdnavStack.Screen
                name='DistributorsDetails'
                component={DistributorsDetails}
                options={{headerShown:false}}
             />
      </vdnavStack.Navigator>
    )
  }
