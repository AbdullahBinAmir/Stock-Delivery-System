import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {Badge, withBadge} from '@rneui/base';
import {colors} from '../global/Styles';

export default function NotificationHeader({navigation,title,notificationCount,navName,data,data1}) {
  const BadgeIcon = withBadge(notificationCount)(Icon1);

  return (
    <View style={styles.titleBar}>
      <View style={{flex: 0.2, marginLeft: 10, padding: 10}}>
        <Icon
          name="navicon"
          color={colors.cardbackground}
          size={30}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </View>
      <View style={{flex: 0.8}}>
        <Text style={styles.titleText}>{title} </Text>
      </View>
      <View style={{marginRight:15}}>
        <BadgeIcon
          name="ios-notifications"
          color={colors.cardbackground}
          size={30}
          onPress={() => {
            navigation.navigate(navName,{data:navName=='NotificationForBuyer'?data:data1})
          }}
        />
      </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.cardbackground,
    letterSpacing:.5
  },
});
