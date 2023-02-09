import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import VendorProductScreen from '../../screens/vendor/VendorProductScreen'
import ProductsManagerScreen from '../../screens/vendor/ProductsManagerScreen'
import AddNewStockScreen from '../../screens/vendor/AddNewStockScreen'

const odnavStack=createNativeStackNavigator()

export default function ProductUpdateNavStack() {
    return (
      <odnavStack.Navigator>
            <odnavStack.Screen
                name='ProductScreen'
                component={VendorProductScreen}
                options={{headerShown:false}}
            />
            <odnavStack.Screen
                name='ProductsManagerScreen'
                component={ProductsManagerScreen}
                options={{headerShown:false}}
            />
            <odnavStack.Screen
                name='AddNewStockScreen'
                component={AddNewStockScreen}
                options={{headerShown:false}}
            />
      </odnavStack.Navigator>
    )
  }
