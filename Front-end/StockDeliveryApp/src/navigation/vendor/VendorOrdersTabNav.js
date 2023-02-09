import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Header from '../../components/Header';
import { colors } from '../../global/Styles';
import ActiveOrderNavStack from './ActiveOrdersNavStack';
import CancelledOrderNavStack from './CancelledOrderNavStack';
import CompletedOrderNavStack from './CompletedOrdersNavStack';
import PendingOrderNavStack from './PendingOrderNavStack';
import { View } from 'react-native';

const OrdersTabNav = createMaterialTopTabNavigator();

export default function VendorOrdersTabNav({navigation}) {
  return (
    <View style={{flex:1}}>
    <Header navigate={navigation} title={'Orders Dashboard'} />
    <OrdersTabNav.Navigator
        screenOptions={{
            tabBarLabelStyle:{fontSize:11,fontWeight:'bold',color:colors.buttons},
            tabBarStyle:{backgroundColor:colors.cardbackground},
        }}
    >
      <OrdersTabNav.Screen name="Pending" component={PendingOrderNavStack} />
      <OrdersTabNav.Screen name="Active" component={ActiveOrderNavStack} />
      <OrdersTabNav.Screen name="Complete" component={CompletedOrderNavStack} />
      <OrdersTabNav.Screen name="Cancelled" component={CancelledOrderNavStack} />
    </OrdersTabNav.Navigator>
    </View>
  );
}