import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import MenuItem from '../../components/MenuItem';
import UserInfoCard from '../../components/UserInfoCard';
import { useGetDistributorsQuery, useGetVendorsQuery } from '../../features/api/shopkeeper/ShopkeeperClientsAPI';
import { colors } from '../../global/Styles';

export default function MyClientsScreen({navigation}) {
  const {userInfo} = useSelector(state => state.user);
  const result = useGetVendorsQuery({uid: userInfo.id});
  const result1 = useGetDistributorsQuery({uid:userInfo.id});
  const [rendor, setRendor] = useState();
  const [userType, setUserType] = useState("Vendor");
  const [userData, setUserData] = useState();
  
  useEffect(() => {
    setRendor('');
  });

  //console.log(data)

  if (result.isLoading || result1.isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator visible={true} />
      </View>
    );
  } else if (result.data || result1.data) {
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
        <Text style={styles.titleText}> My Clients </Text>
      </View>
      <View  style={{flex: 0.2}}>
        <MenuItem realData={userType==='Vendor'?result.data:result1.data} setData={setUserData} />
      </View>
    </View>
    <View style={styles.vendorHeaderTab}>
    <TouchableOpacity
      style={userType==='Vendor'?{...styles.vendorHeaderBtn,backgroundColor:colors.lightGreen}
      :styles.vendorHeaderBtn}
      onPress={() => {
        setUserData(result.data)
        setUserType('Vendor')
      }}>
      <Text style={styles.vendorHeaderText}>Vendor</Text>
    </TouchableOpacity>
    <TouchableOpacity
    style={userType==='Distributor'?{...styles.vendorHeaderBtn,backgroundColor:colors.lightGreen}
    :styles.vendorHeaderBtn}
      onPress={() => {
        setUserData(result1.data)
        setUserType('Distributor')
      }}>
      <Text style={styles.vendorHeaderText}>Distributor</Text>
    </TouchableOpacity>
  </View>
        <View style={{flex: 1, flexGrow: 1}}>
          <FlatList
            style={{marginTop: 10, marginBottom: 10}}
            horizontal={false}
            showsVerticalScrollIndicator={true}
            data={userData?userData:result.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  item.status.trim() === 'Allow' 
                    ? navigation.navigate('MainOrderScreen',{data:item})
                    : alert(
                        `Access denied because your current status is ${item.status}`,
                      )
                }>
                <UserInfoCard item={item} uid={item.uid} />
              </TouchableOpacity>
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
    fontSize: 18,
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
  menuView: {
    padding: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 200,
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
