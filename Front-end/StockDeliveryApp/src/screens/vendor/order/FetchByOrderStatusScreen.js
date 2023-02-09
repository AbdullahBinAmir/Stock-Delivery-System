import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import DistributorOrderScreen from './DistributorOrderScreen';
import {colors} from '../../../global/Styles';
import {useSelector} from 'react-redux';
import {
  useGetBuyersQuery, useGetSellersQuery
} from '../../../features/api/vendor/vendorOrdersAPISlice';
import UserInfoCard from '../../../components/UserInfoCard';
import { CardTitle } from '@rneui/base/dist/Card/Card.Title';

const FetchByOrderStatusScreen = ({navigation, orderStatus}) => {
  const {userInfo} = useSelector(state => state.user);
  const [utypeSelect,setuTypeSelect]=useState('Distributor')

  //console.log(userInfo.roles);

  if (userInfo.roles === 'Vendor') {
    const {isLoading, data = []} = useGetBuyersQuery({
      uid: userInfo.id,
      status: orderStatus,
    });

    const [newdata,setNewData]=useState()

    const filterVendorsUserList = uType => {
      let vList = [];
      for (let v of data) {
          if (v.utype.trim() == uType) {
            vList.push(v);
          }
        }
        setNewData(vList);
      }

    return (
      <View style={{flex:1}}>
        <View style={styles.vendorHeaderTab}>
          <TouchableOpacity style={utypeSelect==='Distributor'?{...styles.vendorHeaderBtn,backgroundColor:colors.lightGreen}
          : styles.vendorHeaderBtn}
            onPress={()=>{
              filterVendorsUserList('Distributor')
              setuTypeSelect('Distributor')
            }}
          >
            <Text
              style={styles.vendorHeaderText}>
              Distributor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={utypeSelect==='ShopKeeper'?{...styles.vendorHeaderBtn,backgroundColor:colors.lightGreen}
            : styles.vendorHeaderBtn
        }
          onPress={()=>{
            filterVendorsUserList('ShopKeeper')
            setuTypeSelect('ShopKeeper')
          }}
          >
            <Text style={styles.vendorHeaderText}>Shopkeeper</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, flexGrow: 1}}>
          <FlatList
            style={{marginTop: 10, marginBottom: 10}}
            horizontal={false}
            showsVerticalScrollIndicator={true}
            data={newdata?newdata:data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={{marginRight: 10}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DistributorOrderScreen', {uid:item.uid,id:userInfo.id,type:"recieved",status:orderStatus})
                  }>
                  <UserInfoCard item={item} uid={item.uid} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    );
  }

  if (userInfo.roles === 'Distributor') {
    const [cat, setCat] = useState('placed');

    const result = useGetSellersQuery({
      uid: userInfo.id,
      status: orderStatus,
    });

    const result1 = useGetBuyersQuery({
      uid: userInfo.id,
      status: orderStatus,
    });

    return (
      <View style={styles.container}>
        <View style={{flex: 0.1, justifyContent: 'center'}}>
          <View style={styles.dView}>
            <TouchableOpacity
              style={
                cat === 'placed'
                  ? {...styles.btndView, backgroundColor: colors.lightGreen}
                  : styles.btndView
              }
              onPress={() => setCat('placed')}>
              <Text style={styles.txtdView}>Placed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                cat === 'recieved'
                  ? {...styles.btndView, backgroundColor: colors.lightGreen}
                  : styles.btndView
              }
              onPress={() => setCat('recieved')}>
              <Text style={styles.txtdView}>Recieved</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, flexGrow: 1}}>
        <FlatList
          style={{marginTop: 10, marginBottom: 10}}
          horizontal={false}
          showsVerticalScrollIndicator={true}
          data={cat=='placed'?result.data:result1.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={{marginRight: 10}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DistributorOrderScreen', {uid:item.uid,id:userInfo.id,type:cat,status:orderStatus})
                }>
                <UserInfoCard item={item} uid={item.uid} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      </View>
    );
  }

  if (userInfo.roles === 'ShopKeeper') {
    const {isLoading, data = []} = useGetSellersQuery({
      uid: userInfo.id,
      status: orderStatus,
    })

    const [newdata,setNewData]=useState()
    const [utypeSelect,setuTypeSelect]=useState('Vendor')

    const filterVendorsUserList = uType => {
      let vList = [];
      for (let v of data) {
          if (v.utype.trim() == uType) {
            vList.push(v);
          }
        }
        setNewData(vList);
      }

    return (
      <View style={{flex:1}}>
        <View style={styles.vendorHeaderTab}>
          <TouchableOpacity style={utypeSelect==='Vendor'?
          {...styles.vendorHeaderBtn,backgroundColor:colors.lightGreen}
          :styles.vendorHeaderBtn}
            onPress={()=>{
              filterVendorsUserList('Vendor')
              setuTypeSelect('Vendor')
            }}
          >
            <Text
              style={styles.vendorHeaderText}>
              Vendor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={utypeSelect==='Distributor'?
          {...styles.vendorHeaderBtn,backgroundColor:colors.lightGreen}
          :styles.vendorHeaderBtn}
            onPress={()=>{
              filterVendorsUserList('Distributor')
              setuTypeSelect('Distributor')
            }}
          >
            <Text style={styles.vendorHeaderText}>Distributor</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, flexGrow: 1}}>
          <FlatList
            style={{marginTop: 10, marginBottom: 10}}
            horizontal={false}
            showsVerticalScrollIndicator={true}
            data={newdata?newdata:data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={{marginRight: 10}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DistributorOrderScreen', {uid:item.uid,id:userInfo.id,type:"placed",status:orderStatus})
                  }>
                  <UserInfoCard item={item} uid={item.uid} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    );
  }

};

export default FetchByOrderStatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cardbackground,
  },
  dView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  btndView: {
    backgroundColor: colors.buttons,
    padding: 7,
    borderRadius: 7,
    width: 100,
  },
  txtdView: {
    fontSize: 18,
    color: colors.cardbackground,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  vendorHeaderTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
    top: 10,
  },
  vendorHeaderBtn: {
    padding: 7, 
    backgroundColor: colors.grey3, 
    borderRadius: 10
  },
  vendorHeaderText:{
    fontSize: 18,
    color: colors.cardbackground,
    fontWeight: 'bold',
    letterSpacing: 1,
  }
});
