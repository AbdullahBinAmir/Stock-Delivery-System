import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import DrawerContent from '../../components/DrawerContent';
import ShopkeeperSearchNavStack from './ShopkeeperSearchNavStack';
import ShopkeeperOrderNavStack from './ShopkeeperOrderNavStack';
import VendorOrdersTabNav from '../vendor/VendorOrdersTabNav';
import UserCreditNavStack from '../vendor/UserCreditNavStack';

const Drawer = createDrawerNavigator();

export default function ShopkeeperDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {fontSize: 16, marginLeft: -15},
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Search"
        component={ShopkeeperSearchNavStack}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="search" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Providers"
        component={ShopkeeperOrderNavStack}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="user-circle" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={VendorOrdersTabNav}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="shopping-cart" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Payments"
        component={UserCreditNavStack}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="credit-card" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
