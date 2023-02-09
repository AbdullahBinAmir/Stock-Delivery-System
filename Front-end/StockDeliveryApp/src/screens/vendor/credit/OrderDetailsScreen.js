import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {colors} from '../../../global/Styles';
import Icon from 'react-native-vector-icons/Entypo';
import {useGetOrderDetailQuery} from '../../../features/api/vendor/vendorOrdersAPISlice';
import OrderInfoCard from '../../../components/OrderInfoCard';

const OrderDetailsScreen = ({route, navigation}) => {
  const {data1} = route.params;
  const {isLoading, data = []} = useGetOrderDetailQuery({
    id: data1.oid,
  });
  console.log(data1)
  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator visible={true} />
      </View>
    );
  } else if (data) {
    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <View style={{flex: 0.2, marginLeft: 10, padding: 10}}>
            <Icon
              name="arrow-with-circle-left"
              color={colors.cardbackground}
              size={30}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
          <View style={{flex: 0.8}}>
            <Text style={styles.titleText}>Order Details</Text>
          </View>
        </View>
        <View style={styles.orderInfoCard}>
          <Text style={styles.text2}>Order ID: {data1.oid} </Text>
          <Text style={styles.text2}>Order Type: {data1.orderType}</Text>
          <Text style={styles.text2}>
            Cash Status: {data1.orderState === 0 ? 'unpaid' : 'paid'}
          </Text>
          <Text style={styles.text2}>Delivered At: {data1.deliverDate}</Text>
          <Text style={styles.text2}>Total Bill: {data1.totalAmount}</Text>
        </View>
        <View style={styles.textBarTab}>
          <Text style={styles.textTop}> Products Odered </Text>
        </View>
        <View style={{flex: 1, flexGrow: 1}}>
          <FlatList
            style={{marginTop: 10, marginBottom: 10}}
            horizontal={true}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View style={{marginRight: 10}}>
                <OrderInfoCard item={item} />
              </View>
            )}
          />
        </View>
      </View>
    );
  }
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  container: {
    flex: 1,
    backgroundColor: colors.cardbackground,
  },
  titleBar: {
    width: '100%',
    height: 80,
    backgroundColor: colors.buttons,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-evenly',
    paddingHorizontal: 15,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.cardbackground,
  },
  orderInfoCard: {
    margin: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#F5F5F5',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  text2: {
    fontSize: 16,
    color: colors.grey1,
    padding: 5,
  },
  textBarTab: {
    marginTop: 10,
    marginBottom: 5,
    padding: 10,
    backgroundColor: colors.buttons,
  },
  textTop: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.cardbackground,
    textAlign: 'center',
  },
});
