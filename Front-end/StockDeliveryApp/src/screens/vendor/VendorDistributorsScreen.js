import React, {useState,useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import UserInfoCard from '../../components/UserInfoCard';
//import {vendorDistributors} from '../../global/VDistributorsData';
import {colors} from '../../global/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import MenuItem from '../../components/MenuItem';
import { useGetBuyersForProviderQuery } from '../../features/api/shopkeeper/ShopkeeperClientsAPI';

export default function VendorDistributorsScreen({navigation}) {
  const [mydata, setMyData] = useState(null);
  const [userType, setUserType] = useState("All");
  const [userData, setUserData] = useState();
  const {userInfo} = useSelector(state => state.user);
  const {isLoading,data=[]} = useGetBuyersForProviderQuery({uid:userInfo.id})

  console.log(data)

 const filterUserData=(utype)=>{
    let arr=[]
    for(let user of data){
      if(user.utype==utype){
        arr.push(user)
      }
    }
    setUserData(arr)
 }

  useEffect(()=>{
      setMyData('')
  })

   if ( isLoading) {
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
          name="navicon"
          color={colors.cardbackground}
          size={30}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </View>
      <View style={{flex: 0.6}}>
        <Text style={styles.titleText}> My Buyers </Text>
      </View>
      <View  style={{flex: 0.2}}>
        <MenuItem realData={userData?userData:data} setData={setUserData} />
      </View>
    </View>
        <View style={styles.vendorHeaderTab}>
          <TouchableOpacity
            style={userType==='All'?{...styles.vendorHeaderBtn,backgroundColor:colors.lightGreen}
            :styles.vendorHeaderBtn}
            onPress={() => {
              setUserData(data)
              setUserType('All')
            }}>
            <Text style={styles.vendorHeaderText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={userType==='Distributor'?{...styles.vendorHeaderBtn,backgroundColor:colors.lightGreen}
            :styles.vendorHeaderBtn}
            onPress={() => {
              filterUserData('Distributor')
              setUserType('Distributor')
            }}>
            <Text style={styles.vendorHeaderText}>Distributor</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={userType==='Shopkeeper'?{...styles.vendorHeaderBtn,backgroundColor:colors.lightGreen}
          :styles.vendorHeaderBtn}
            onPress={() => {
              filterUserData('ShopKeeper')
              setUserType('Shopkeeper')
            }}>
            <Text style={styles.vendorHeaderText}>Shopkeeper</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, flexGrow: 1}}>
          <FlatList
            style={{marginTop: 10, marginBottom: 10}}
            horizontal={false}
            showsVerticalScrollIndicator={true}
            data={userData?userData:data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={{marginRight: 10}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DistributorsDetails', {id: item.vdId})
                  }>
                  <UserInfoCard item={item} uid={item.buyerId} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

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
  vendorHeaderTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
    top: 10,
  },
  vendorHeaderBtn: {
    paddingHorizontal: 10,
    backgroundColor: colors.grey3,
    borderRadius: 10,
    paddingVertical:6
  },
  vendorHeaderText: {
    fontSize: 18,
    color: colors.cardbackground,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
