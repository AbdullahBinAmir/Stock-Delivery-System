import {StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity, Image} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useGetDistributorForShopkeeperQuery, useGetDistributorProductsQuery } from '../../features/api/shopkeeper/ShopkeeperClientsAPI';
import { colors } from '../../global/Styles';
import { imageURL } from '../../global/API_Source_URL';
import { BottomSheet } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Checkbox } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';
import { useSelector } from 'react-redux';

const DistributorInfoCard = ({item,providerData,navigation})=>{

    const [status,setStatus] = useState('')

    const distributorProductData=useGetDistributorProductsQuery({
        uid:item.uid
    })

    useEffect(()=>{
        for(let pd of providerData){
           // console.log(pd)
            if(pd.uid===item.uid){
                setStatus(pd.Status)
            }
        }
      },[])

    if (distributorProductData.isLoading) {
        return (
          <View style={styles.loader}>
            <ActivityIndicator visible={true} />
          </View>
        );
    } 
    return(
            <TouchableOpacity style={styles.boxStyle}
                onPress={()=> status.trim()!='Block'?navigation.navigate('MainOrderScreen',{data:
                    {
                        uid : item.uid,
                        uname : item.uname,
                        ucity : item.ucity,
                        Address : item.Address,
                        umobileno : item.umobileno,
                        uemail : item.uemail,
                        utype : item.utype,
                        uimage : item.uimage,
                        vendorProducts : distributorProductData.data
                    }
                }):alert("You cannot place order! Distributor had block you")
            }
            >
                <View style={{flexDirection:'row'}}>
                    <Image
                        source={{uri: imageURL + item.uimage}}
                        style={{width: 100, height: 100, borderRadius: 50,margin:5}}
                    />
                    <View style={{marginLeft:5,marginTop:5}}>
                        <Text style={styles.userInfoText}>Name: {item.uname}</Text>
                        <Text style={styles.userInfoText}>City: {item.ucity}</Text>
                        <Text style={styles.userInfoText}>Email: {item.uemail}</Text>
                        <Text style={styles.userInfoText}>Mobile No: {item.umobileno}</Text>
                        {item.urating>0 ? (
                            <AirbnbRating count={item.urating} size={20} defaultRating={5}
                              showRating={false} starContainerStyle={{margin: 2}} isDisabled={true}
                              unSelectedColor={colors.grey2}
                            />
                          ) : (
                            <Text style={styles.ratingText}>Not Rated Yet !</Text>
                          )}
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.lineStyle} />
                    <View>
                        <Text style={styles.pdetailTitle}>Product Details</Text>
                    </View>
                    <View style={styles.lineStyle} />
                </View>
                <View style={{margin:5,justifyContent:'center',alignItems:'center'}}>
                        <Text style={styles.productInfoText}>Product Name: {item.vendorProducts.pname}</Text>
                    <Text style={styles.productInfoText}>Sale Price: PKR {item.vendorProducts.saleprice_per_carton}</Text>
                </View>
            </TouchableOpacity>
    )
}

const DistributorInfoTab = ({navigation,pid,providerData}) => {

    const {userInfo} = useSelector(state => state.user);

    const filterData=()=>{
        var newList=[]
        if(cityCheck){
            let clist=[...distributorData.data]
            newList=clist.filter((u)=>u.ucity==userInfo.city)
            setUserData(newList)
            newList=[]
        }
        if(ratingCheck){
            newList=userData.sort((a,b)=>a.urating<b.urating?1:-1)
            setUserData(newList)
            newList=[]
        }
        if(priceCheck){
            newList=userData.sort((a,b)=>a.vendorProducts.saleprice_per_carton>b.vendorProducts.saleprice_per_carton?1:-1)
            setUserData(newList)
            newList=[]
        }
    }

    const distributorData=useGetDistributorForShopkeeperQuery({
        pid:pid
    })

    const [filterCount,setFilterCount]=useState(0)
    const [isVisible, setIsVisible] = useState(false);
    const [ratingCheck, setRatingCheck] = useState(false);
    const [cityCheck, setCityCheck] = useState(false);
    const [priceCheck, setPriceCheck] = useState(false);
    const [userData, setUserData] = useState();

    if (distributorData.isLoading) {
        return (
          <View style={styles.loader}>
            <ActivityIndicator visible={true} />
          </View>
        );
    } else if(distributorData.data) {
        return (
            <View style={styles.container}>
                <View style={{marginHorizontal:25,marginTop:25,flexDirection:'row'}}>
                    <Text style={styles.filterText}> {filterCount} filters applied </Text>
                    <Icon 
                        name='list-ul'
                        size={28}
                        color={colors.grey2}
                        style={{marginLeft:25}}
                        onPress={()=>setIsVisible(true)}
                    />
                    <Icon 
                        name='history'
                        size={28}
                        color={colors.grey2}
                        style={{marginLeft:25}}
                        onPress={()=>{
                            setCityCheck(false)
                            setRatingCheck(false)
                            setPriceCheck(false)
                            setFilterCount(0)
                            setUserData(distributorData.data)
                        }}
                    />
                </View>
                <View style={{flex: 1, flexGrow: 1}}>
                    <FlatList
                    style={{marginTop: 15, marginBottom: 15, marginLeft: 3}}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    data={userData?userData:distributorData.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <DistributorInfoCard item={item} navigation={navigation}
                            providerData={providerData}
                        />
                        )}
                    />
                </View>
                <BottomSheet isVisible={isVisible}
                >
                <View style={styles.bottomBox}>
                  <Text style={styles.bottomBoxTitle}>SELECT YOUR OPTION</Text>
                  <View style={{flexDirection:'row',alignItems:'center',marginVertical:5,marginHorizontal:25}}>
                    <Checkbox
                        color={colors.buttons}
                        status={cityCheck ? 'checked' : 'unchecked'}
                        onPress={() => {
                            cityCheck?setFilterCount(filterCount-1):
                            setFilterCount(filterCount+1)
                            setCityCheck(!cityCheck)
                        }}
                    />
                    <Text style={styles.optionText}>Sort By City (Your City)</Text>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'center',marginVertical:5,marginHorizontal:25}}>
                    <Checkbox
                        color={colors.buttons}
                        status={ratingCheck ? 'checked' : 'unchecked'}
                        onPress={() => {
                            ratingCheck?setFilterCount(filterCount-1):
                            setFilterCount(filterCount+1)
                            setRatingCheck(!ratingCheck)
                        }}
                    />
                    <Text style={styles.optionText}>Sort By Rating (desc.)</Text>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'center',marginVertical:5,marginHorizontal:25}}>
                    <Checkbox
                        color={colors.buttons}
                        status={priceCheck ? 'checked' : 'unchecked'}
                        onPress={() => {
                            priceCheck?setFilterCount(filterCount-1):
                            setFilterCount(filterCount+1)
                            setPriceCheck(!priceCheck)
                        }}
                    />
                    <Text style={styles.optionText}>Sort By Price (asc.)</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-around',margin:5}}>
                    <Button style={styles.optionBtn}
                    onPress={()=>{
                        setUserData(distributorData.data)
                        setIsVisible(false)
                        filterData()
                    }}
                    >
                        <Text style={styles.optionBtnText} >Apply Filter</Text>
                    </Button>
                    <Button style={{...styles.optionBtn,backgroundColor:'red'}}
                        onPress={()=>{
                            setIsVisible(false)
                            setCityCheck(false)
                            setRatingCheck(false)
                            setPriceCheck(false)
                            setFilterCount(0)
                            setUserData(distributorData.data)
                        }}
                    >
                        <Text style={styles.optionBtnText} >Cancel</Text>
                    </Button>
                  </View>
                </View>
              </BottomSheet>
            </View>
        );
    }
};

export default DistributorInfoTab;

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
  filterText:{
    backgroundColor:'#9bddff',
    alignSelf:'flex-start',
    padding:5,
    borderRadius:10,
    fontSize:16,
    letterSpacing:1,
    fontWeight:'bold',
    paddingHorizontal:15
  },
  boxStyle:{
    margin:5,
    borderWidth:2,
    borderColor:colors.grey5,
    padding:3,
    borderRadius:5
  },
  userInfoText: {
    fontSize: 16,
    color: colors.grey1,
    marginTop: 2,
    letterSpacing:.5
  },
  ratingText: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 7,
    color: colors.grey1,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  productInfoText: {
    fontSize: 14,
    color: colors.grey2,
    marginTop: 2,
    fontWeight:'bold',
    fontStyle:'italic'
  },
  productInfoText1: {
    fontSize: 16,
    color: colors.grey2,
    marginTop: 2,
  },
  lineStyle:{
    flex: 1, 
    height: 2, 
    backgroundColor: colors.grey1
  },
  pdetailTitle:{
    width: 140, 
    textAlign: 'center',
    fontSize:18,
    fontWeight:'bold',
    color:colors.buttons
  },
  bottomBox:{
    backgroundColor:colors.cardbackground,
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
    paddingBottom:10
  },
  bottomBoxTitle:{
    margin:5,
    textAlign:'center',
    fontSize:18,
    fontWeight:'bold',
    letterSpacing:1,
    color:colors.grey1
  },
  optionText:{
    fontSize:16,
    fontWeight:'600',
    letterSpacing:.5,
    color:colors.grey2
  },
  optionBtn:{
    backgroundColor:colors.buttons,
    alignSelf:'center',
    borderRadius:25
  },
  optionBtnText:{
    fontSize:14,
    color:colors.cardbackground,
  }
});
