import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  View,
  StyleSheet,
} from 'react-native';

import {
  Title,
  Paragraph,
  Menu,
} from 'react-native-paper';
import { colors } from '../global/Styles';

const MenuItem = ({realData,setData}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 })

  const openMenu = () => setShowMenu(true);

  const closeMenu = () => setShowMenu(false);

  const onIconPress = (event) => {
    const { nativeEvent } = event;
    const anchor = {
      x: nativeEvent.pageX,
      y: nativeEvent.pageY,
    };

    setMenuAnchor(anchor);
    openMenu();
  }

  const filterVendorsList = cat => {
    console.log(realData)
    let vList = [];
    for (let v of realData) {
        if (v.status.trim() == cat) {
          vList.push(v);
        }
    }
    //console.log(vList)
    setData(vList);
  };

  return(
    <View style={styles.card}>
      <Icon
        name="ellipsis-v"
        size={24}
        color={colors.cardbackground}
        style={{padding:5}}
        onPress={onIconPress}
      />
      <Menu
        visible={showMenu}
        onDismiss={closeMenu}
        anchor={menuAnchor}
      >
        <Menu.Item onPress={() => {
            setData(realData)
            closeMenu()
        }} title="All" />
        <Menu.Item onPress={() => {
            filterVendorsList('Allow')
            closeMenu()
        }} title="Allowed" />
        <Menu.Item onPress={() => {
            filterVendorsList('Block')
            closeMenu()
        }} title="Blocked" />
        <Menu.Item onPress={() => {
            filterVendorsList('Pending')
            closeMenu()
        }} title="Pending" />
      </Menu>
    </View>
  )
};

const styles = StyleSheet.create({
  card: {
    marginRight: 10,
    backgroundColor: colors.buttons,
    borderRadius: 5,

  }
});

export default MenuItem;