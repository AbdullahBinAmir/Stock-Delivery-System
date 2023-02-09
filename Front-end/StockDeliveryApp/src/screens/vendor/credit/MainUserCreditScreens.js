import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../../../global/Styles';
import Header from '../../../components/Header';
import UserInfoCard from '../../../components/UserInfoCard';
import {useSelector} from 'react-redux';
import {
  useGetCreditOrderInfoForSellerQuery,
  useGetCreditUserInfoForBuyerQuery,
  useGetCreditUserInfoForSellerQuery,
} from '../../../features/api/vendor/UserCreditAPI';
import NotificationHeader from '../../../components/NotificationHeader';
import { useGetNotificationForBuyerQuery, useGetNotificationForSellerQuery } from '../../../features/api/vendor/NotificationAPISlice';

const CreditUserListCompnent = ({data, navigation}) => {
  console.log(data);
  return (
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
              navigation.navigate('CreditOrdersScreen', {
                uid: item.uid,
                userType: item.utype,
                totalCredit:item.totalCredit,
                crId:item.crId,
                amountPaid:item.amountPaid
              })
            }>
            <View style={{backgroundColor:'#F5F5F5'}}>
              <UserInfoCard item={item} uid={item.uid} />
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingVertical:5}}>
                <Text style={{fontSize:16,fontWeight:'bold',letterSpacing:1}}>Amount Remaining: PKR {item.totalCredit}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const VendorCreditComponent = ({uid, navigation, snc, snn, data1}) => {
  const {isLoading, data = []} = useGetCreditUserInfoForSellerQuery({
    uid: uid,
  });

  const [newdata, setNewData] = useState();
  const [cat, setCat] = useState(0);

  const filterVendorsUserList = uType => {
    let vList = [];
    for (let v of data) {
      if (v.utype.trim() == uType) {
        vList.push(v);
      }
    }
    setNewData(vList);
  };

  useEffect(()=>{
      snc(data1.length)
      console.log('vendor',data1)
      snn('NotificationForSeller')
  },[cat])

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator visible={true} />
      </View>
    );
  } else if (data) {
    return (
      <View style={{flex: 1}}>
        <View style={styles.vendorHeaderTab}>
          <TouchableOpacity
            style={styles.vendorHeaderBtn}
            onPress={() => {
              filterVendorsUserList('Distributor')
              setCat(1)
          }}>
            <Text style={styles.vendorHeaderText}>Distributor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.vendorHeaderBtn,
              backgroundColor: colors.lightGreen,
            }}
            onPress={() => {
              filterVendorsUserList('ShopKeeper')
              setCat(2)
            }}>
            <Text style={styles.vendorHeaderText}>Shopkeeper</Text>
          </TouchableOpacity>
        </View>
        <CreditUserListCompnent
          data={newdata ? newdata : data}
          navigation={navigation}
        />
      </View>
    );
  }
};

const DistributorCreditComponent = ({uid, navigation, snc, snn, data, data1}) => {
  const [newdata, setNewData] = useState();
  const [cType,setCType] = useState('Vendor')

  const result = useGetCreditUserInfoForSellerQuery({
    uid: uid,
  });

  const result1 = useGetCreditUserInfoForBuyerQuery({
    uid: uid,
  });

  useEffect(()=>{
    if(cType=='Vendor'){
      setNewData(result1.data)
      snc(data.length)
      snn('NotificationForBuyer')
      console.log(data)
    }
    else{
      setNewData(result.data)
      snc(data1.length)
      snn('NotificationForSeller')
      console.log(data1)
    }
  },[cType])

  return (
    <View style={{flex: 1}}>
      <View style={styles.vendorHeaderTab}>
        <TouchableOpacity
          style={styles.vendorHeaderBtn}
          onPress={() => {
            setCType('Vendor')
          }}>
          <Text style={styles.vendorHeaderText}>Vendor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.vendorHeaderBtn,
            backgroundColor: colors.lightGreen,
          }}
          onPress={() => {
            setCType('Shopkeeper')
          }}>
          <Text style={styles.vendorHeaderText}>Shopkeeper</Text>
        </TouchableOpacity>
      </View>
      <CreditUserListCompnent
        data={newdata ? newdata : result1.data}
        navigation={navigation}
      />
    </View>
  );
};

const ShopkeeperCreditComponent = ({uid, navigation, snc, snn, data1}) => {
  const {isLoading, data = []} = useGetCreditUserInfoForBuyerQuery({
    uid: uid,
  });

  const [newdata, setNewData] = useState();
  const [cat, setCat] = useState(0);

  const filterVendorsUserList = uType => {
    let vList = [];
    for (let v of data) {
      if (v.utype.trim() == uType) {
        vList.push(v);
      }
    }
    setNewData(vList);
  };

  useEffect(()=>{
    snc(data1.length)
    snn('NotificationForBuyer')
  },[cat])

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator visible={true} />
      </View>
    );
  } else if (data) {
    return (
      <View style={{flex: 1}}>
        <View style={styles.vendorHeaderTab}>
          <TouchableOpacity
            style={{
              ...styles.vendorHeaderBtn,
              backgroundColor: colors.lightGreen,
            }}
            onPress={() => {
              filterVendorsUserList('Vendor')
              setCat(1)
            }}>
            <Text style={styles.vendorHeaderText}>Vendor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.vendorHeaderBtn}
            onPress={() => {
              filterVendorsUserList('Distributor')
              setCat(2)
            }}>
            <Text style={styles.vendorHeaderText}>Distributor</Text>
          </TouchableOpacity>
        </View>
        <CreditUserListCompnent
          data={newdata ? newdata : data}
          navigation={navigation}
        />
      </View>
    );
  }
};

const MainUserCreditScreens = ({navigation}) => {

  const {userInfo} = useSelector(state => state.user);
  let [notificationCount, setNotificationCount] = useState(2);
  let [navName, setNavName] = useState('');

  console.log(userInfo.id)

  const {isLoading, data = []} = useGetNotificationForBuyerQuery({
    id: userInfo.id,
  });

  const {isLoading:sellerLoad,data:data1 = []} = useGetNotificationForSellerQuery({
    id: userInfo.id,
  });

  if (isLoading || sellerLoad) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator visible={true} />
      </View>
    );
  } else if (data) {
      return (
        <View style={styles.container}>
          <NotificationHeader navigation={navigation}
          title="Payment Dashboard" notificationCount={notificationCount} 
          navName={navName} data={data} data1={data1}
          />
          {userInfo.roles === 'Vendor' ? (
            <VendorCreditComponent uid={userInfo.id} navigation={navigation} 
            snc={setNotificationCount} snn={setNavName} data1={data1}
            />
          ) : userInfo.roles === 'Distributor' ? (
            <DistributorCreditComponent uid={userInfo.id} navigation={navigation} 
              snc={setNotificationCount} snn={setNavName} data={data} data1={data1}
            />
          ): userInfo.roles === 'ShopKeeper' ? (
            <ShopkeeperCreditComponent uid={userInfo.id} navigation={navigation} 
            snc={setNotificationCount} snn={setNavName} data1={data}
            />
          ) : null}
        </View>
      );
          }
};

export default MainUserCreditScreens;

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
  vendorHeaderTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
    top: 10,
  },
  vendorHeaderBtn: {
    paddingHorizontal: 10,
    backgroundColor: '#FCAE1E',
    borderRadius: 10,
    paddingVertical: 6,
  },
  vendorHeaderText: {
    fontSize: 18,
    color: colors.cardbackground,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
