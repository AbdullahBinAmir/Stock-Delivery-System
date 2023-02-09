import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import VendorProductsBottomNav from './VendorProductsBottomNav';
import DrawerContent from '../../components/DrawerContent';
import Icon from 'react-native-vector-icons/FontAwesome';
import VendorDistrbutorNav from './VendorDistrbutorNav';
import VendorOrdersTabNav from './VendorOrdersTabNav';
import UserCreditNavStack from './UserCreditNavStack';
import VendorDashboard from '../../screens/vendor/VendorDashboard';
import ReturnInfoViewScreen from '../../screens/vendor/returnProducts/ReturnInfoViewScreen';

const Drawer = createDrawerNavigator();
export default function VendorDrawer({navigation}) {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {fontSize: 16, marginLeft: -15},
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Manage Products"
        component={VendorProductsBottomNav}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="product-hunt" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Users"
        component={VendorDistrbutorNav}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="users" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
          name="Orders"
          component={VendorOrdersTabNav}
          options={{
            drawerIcon: ({color}) => (
              <Icon name="list-alt" size={24} color={color} />
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
        name="Returns"
        component={ReturnInfoViewScreen}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="cart-arrow-down" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
