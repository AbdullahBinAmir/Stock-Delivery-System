import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {colors} from '../../../global/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useGetPlacedOrdersQuery, useGetRecievedOrdersQuery } from '../../../features/api/vendor/vendorOrdersAPISlice';

const DistributorOrderScreen = ({route,navigation}) => {
  const {userInfo} = useSelector(state => state.user);

  const { uid, id, type, status } = route.params;

  //console.log(route.params)

  const {isLoading, data = []} = type=='recieved'?useGetRecievedOrdersQuery({
    uid: route.params.id,
    bid: route.params.uid,
    status: route.params.status,
  }):useGetPlacedOrdersQuery({
    uid: route.params.id,
    sid: route.params.uid,
    status: route.params.status,
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
        {/*         <TouchableOpacity style={styles.textBarTab}
            onPress={()=>setrefresh('')}
        >
          <Icon name='refresh' size={30} color={colors.buttons} />
        </TouchableOpacity> */}
        <View style={{flex: 1, flexGrow: 1}}>
          <FlatList
            style={{marginTop: 10, marginBottom: 10}}
            horizontal={false}
            showsVerticalScrollIndicator={true}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('OrderDetailsScreen', {
                    odata: item,
                    type: type,
                  })
                }>
                <View
                  style={{
                    borderWidth: 1,
                    marginVertical: 5,
                    marginHorizontal: 10,
                    backgroundColor: '#F5F5F5',
                    borderRadius: 10,
                    borderColor: colors.grey5,
                    padding: 5,
                    flexDirection:'row',
                    justifyContent:'space-evenly'
                  }}>
                  <View style={{justifyContent:'space-evenly',alignItems:'center'}}>
                    <Image 
                      source={require('../../../assets/orderIcon.jpg')}
                      style={{height:60,width:60}}
                    />
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                      <Icon
                        name='truck'
                        size={20}
                        color={colors.buttons}
                      />
                     <Text style={styles.oStatusText} > {item.orderStatus.toLocaleUpperCase()}</Text>
                    </View>
                  </View>
                  <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.oStatusText}>
                      ORDER ID #{item.oid}
                    </Text>
                  </View>
                  <View>
                    <View style={{flexDirection:'row'}}>
                      <Text style={{...styles.ocardText,fontWeight:'500'}}>placed At:</Text>
                      <Text style={{...styles.ocardText}}>{item.orderPlaced}</Text>
                    </View>
                  {
                    item.orderDeliver?(
                    <View style={{flexDirection:'row'}}>
                      <Text style={{...styles.ocardText,fontWeight:'500'}}>Delivered At:</Text>
                      <Text style={{...styles.ocardText}}>{item.orderDeliver}</Text>
                    </View>):null
                  }
                    <View style={{flexDirection:'row'}}>
                      <Text style={styles.ocardText}>Total:</Text>
                      <Text style={{...styles.ocardText,fontSize:16,fontStyle:'italic'}}>PKR {item.totalAmount}</Text>
                    </View>
                  </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }
};

export default DistributorOrderScreen;

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
    backgroundColor:colors.cardbackground
  },
  textBarTab: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: colors.grey5,
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  imgStyle: {
    width: 60,
    height: 50,
    borderRadius: 25,
  },
  cardText: {
    color: colors.grey2,
    fontSize: 18,
  },
  textTop: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.buttons,
  },
  textBarTab: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 5,
    marginTop: 15,
    marginBottom: 10,
    height: 50,
    backgroundColor: colors.grey5,
    padding: 10,
    borderRadius: 10,
  },
  imgStyle: {
    width: 60,
    height: 50,
    borderRadius: 25,
  },
  cardText: {
    color: colors.grey2,
    fontSize: 17,
  },
  oStatusText: {
    textAlign: 'center',
    padding: 1,
    fontSize: 16,
    color: colors.buttons,
    letterSpacing: 1,
    fontWeight: 'bold',
    borderRadius: 5,
    paddingHorizontal: 3,
  },
  ocardText: {
    fontSize: 14,
    color: colors.grey3,
    fontWeight:'bold',
    padding:3,
  },
});
