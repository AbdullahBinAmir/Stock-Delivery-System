import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '../../components/DrawerContent';
import Icon from 'react-native-vector-icons/FontAwesome';
import VendorListNavStack from './VendorListNavStack';
import MyVendorsNavStack from './MyVendorsNavStack';
import VendorOrdersTabNav from '../vendor/VendorOrdersTabNav';
import DistributorProductsNavStack from './DistributorProductNavStack';
import UserCreditNavStack from '../vendor/UserCreditNavStack';
import ReturnProductBuyerNavStack from './ReturnProductBuyerStack';

const Drawer = createDrawerNavigator();

export default function DistributorDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {fontSize: 16, marginLeft: -15},
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Vendors"
        component={VendorListNavStack}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="list-alt" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Clients"
        component={MyVendorsNavStack}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="user-circle" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
      name="My Products"
      component={DistributorProductsNavStack}
      options={{
        drawerIcon: ({color}) => (
          <Icon name="folder" size={24} color={color} />
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
    <Drawer.Screen
      name="Return Products"
      component={ReturnProductBuyerNavStack}
      options={{
        drawerIcon: ({color}) => (
          <Icon name="cart-arrow-down" size={24} color={color} />
        ),
      }}
    />
    </Drawer.Navigator>
  );
}
