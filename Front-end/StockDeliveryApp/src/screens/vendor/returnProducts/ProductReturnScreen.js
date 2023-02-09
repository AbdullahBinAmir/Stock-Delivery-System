import {StyleSheet, Text, View, ActivityIndicator, Image, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {useGetPlacedOrdersQuery} from '../../../features/api/vendor/vendorOrdersAPISlice';
import {colors} from '../../../global/Styles';
import Header from '../../../components/Header';

const ProductReturnScreen = ({route, navigation}) => {
  const {isLoading, data = []} = useGetPlacedOrdersQuery({
    uid: route.params.id,
    sid: route.params.uid,
    status: route.params.status,
  });

  console.log(data);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator visible={true} />
      </View>
    );
  } else if (data) {
    return (
      <View style={styles.container}>
        <Header navigate={navigation} title={'Your Orders List'} />
        <FlatList
        style={{marginTop: 10, marginBottom: 10}}
        horizontal={false}
        showsVerticalScrollIndicator={true}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.cardView}
            onPress={()=>navigation.navigate('OrderedProductScreen',
            {oid:item.oid,uname:item.uname,sid:route.params.uid,bid:route.params.id})}
          >
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../../assets/complete_order.jpg')}
                style={styles.imageView}
              />
              <View style={{marginLeft: 7,marginTop:3}}>
                <Text style={styles.text1}>ORDER ID: #0{item.oid}</Text>
                <Text style={styles.text2}>PLACED AT: {item.orderPlaced}</Text>
                <Text style={styles.text2}>DELIVERED AT: {item.orderDeliver}</Text>
                <Text style={styles.text2}>TOTAL AMOUNT: PKR {item.totalAmount}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        />
      </View>
    );
  }
};

export default ProductReturnScreen;

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
  cardView: {
    shadowColor: colors.grey2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal:7,
    right:2,
    marginVertical:10,
    padding:3,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  imageView:{
    height: 90,
    width: 100,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  text1:{
    fontSize: 16,
    fontWeight: '600', 
    color: colors.grey1
  },
  text2:{
    fontSize: 14,
    fontWeight: '400', 
    color: colors.grey2
  }
});
