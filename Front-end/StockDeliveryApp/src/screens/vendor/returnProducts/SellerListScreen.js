import {View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useGetSellersQuery} from '../../../features/api/vendor/vendorOrdersAPISlice';
import UserInfoCard from '../../../components/UserInfoCard';
import { colors } from '../../../global/Styles';

const SellerListScreen = ({navigation}) => {
  const {userInfo} = useSelector(state => state.user);

  const {isLoading, data} = useGetSellersQuery({
    uid: userInfo.id,
    status: 'delivered',
  });

  console.log(data)

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator visible={true} />
      </View>
    );
  } else if (data) {
    return (
      <View style={styles.container}>
          <FlatList
            style={{marginTop: 10, marginBottom: 10}}
            horizontal={false}
            showsVerticalScrollIndicator={true}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={{marginRight: 10}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductReturnScreen', {
                      uid: item.uid,
                      id: userInfo.id,
                      status: 'delivered',
                    })
                  }>
                  <UserInfoCard item={item} uid={item.uid} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
    );
  }
};

export default SellerListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cardbackground,
    flexGrow:1
  },
});
