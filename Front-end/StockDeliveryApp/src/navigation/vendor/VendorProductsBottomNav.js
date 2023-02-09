import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductUpdateNavStack from './ProductsNavStackUpdate';
import { colors } from '../../global/Styles';
import AddProductsScreen from '../../screens/vendor/AddProductsScreen';

const bottomTab = createBottomTabNavigator();

export default function VendorProductsBottomNav () {
    return (
        <bottomTab.Navigator 
            screenOptions={{
                tabBarActiveTintColor:colors.buttons
            }}
        >
            <bottomTab.Screen name="Products" component={ProductUpdateNavStack}
                    options={
                        {
                            tabBarLabel:"My Products",
                            tabBarIcon:({color,size})=>(
                                <Icon
                                    name='list' 
                                    color={color}
                                    size={size}
                                />
                            ),
                            headerShown:false
                        }
                    }
            />
            <bottomTab.Screen name="AddProducts" component={AddProductsScreen}
                options={
                    {
                        tabBarLabel:"Add Products",
                        tabBarIcon:({color,size})=>(
                            <Icon
                                name='plus-circle' 
                                color={color}
                                size={size}
                            />
                        ),
                        headerShown:false
                    }
                }
            />
      </bottomTab.Navigator>
    )
  }

//const styles = StyleSheet.create({})
