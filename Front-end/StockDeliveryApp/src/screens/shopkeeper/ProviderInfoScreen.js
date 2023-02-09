import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import { useGetProvidersForShopkeeperQuery, useGetVendorForShopkeeperQuery } from '../../features/api/shopkeeper/ShopkeeperClientsAPI';
import { colors } from '../../global/Styles';
import Header from '../../components/Header';
import VendorInfoTab from './VendorInfoTab';
import DistributorInfoTab from './DistributorInfoTab';


const ProviderInfoScreen = ({navigation,route}) => {

  const {userInfo} = useSelector(state => state.user);
  const {pid}=route.params

  const vendorData=useGetVendorForShopkeeperQuery({
    pid:pid
  })

  const providerList=useGetProvidersForShopkeeperQuery({
    uid:userInfo.id
  })

  const [option, setOption] = useState(0)

  if (vendorData.isLoading || providerList.isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator visible={true} />
      </View>
    );
  } else if(vendorData.data && providerList.data) {
  return (
    <View style={styles.container}>
      <Header navigate={navigation} title={'Providers List'} />
      <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:15}}>
        <TouchableOpacity style={option===0?{...styles.optionBtn,backgroundColor:colors.buttons}:styles.optionBtn}
          onPress={()=>setOption(0)}
        >
          <Text style={styles.optionText} >Vendors</Text>
        </TouchableOpacity>
        <TouchableOpacity style={option===1?{...styles.optionBtn,backgroundColor:colors.buttons}:styles.optionBtn}
          onPress={()=>setOption(1)}
        >
          <Text style={styles.optionText}>Distributors</Text>
        </TouchableOpacity>
      </View>
      {
        option===0?(
          <VendorInfoTab data={vendorData.data} providerData={providerList.data} navigation={navigation} />
        ):
        (
          <DistributorInfoTab navigation={navigation} pid={pid} providerData={providerList.data} />
        )
      }
    </View>
  )
  }
}

export default ProviderInfoScreen

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
  optionBtn:{
    backgroundColor:colors.grey4,
    paddingVertical:5,
    paddingHorizontal:10,
    borderRadius:10
  },
  optionText:{
    color:colors.cardbackground,
    fontSize:16,
    fontWeight:'bold',
    letterSpacing:1
  }
})