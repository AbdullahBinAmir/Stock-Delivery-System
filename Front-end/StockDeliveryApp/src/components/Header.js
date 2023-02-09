import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import {Badge, withBadge} from '@rneui/base';
import {colors} from '../global/Styles';

export default function Header(props) {
  let [cartCount, setCartCount] = useState(2);
  const BadgeIcon = withBadge(cartCount)(Icon1);

  //console.log(props.navigation)
  return (
    <View style={styles.titleBar}>
      <View style={{flex: 0.2, marginLeft: 10, padding: 10}}>
        <Icon
          name="navicon"
          color={colors.cardbackground}
          size={36}
          onPress={() => {
            props.navigate.toggleDrawer();
          }}
        />
      </View>
      <View style={{flex: 0.8}}>
        <Text style={styles.titleText}>{props.title} </Text>
      </View>
      {
       /*  props.cart?(
      <View style={{marginRight:15}}>
        <BadgeIcon
          name="shopping-cart"
          color={colors.cardbackground}
          size={30}
          onPress={() => {
            props.cart-navigation.navigate('PlaceOrderScreen')
          }}
        />
      </View>):null */
        }
    </View>
  );
}

const styles = StyleSheet.create({
  titleBar: {
    width: '100%',
    height: 70,
    backgroundColor: colors.buttons,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-evenly',
    paddingHorizontal: 15,
  },
  titleText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: colors.cardbackground,
  },
});
