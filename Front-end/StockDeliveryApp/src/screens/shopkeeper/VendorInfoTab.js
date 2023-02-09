import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React,{useEffect,useState} from 'react';
import {colors} from '../../global/Styles';
import {useGetUserRatingQuery} from '../../features/api/vendor/vendorOrdersAPISlice';
import {imageURL} from '../../global/API_Source_URL';
import {AirbnbRating} from 'react-native-ratings';
import {Button} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import { useAddShopkeeperClientsMutation } from '../../features/api/shopkeeper/ShopkeeperClientsAPI';
import { useSelector } from 'react-redux';

const VendorInfoTab = ({data, providerData, navigation}) => {

    const {userInfo} = useSelector(state => state.user);
    const [flag,setFlag] = useState(0)
    const [status,setStatus] = useState('')

  const rating = useGetUserRatingQuery({
    id: data.uid,
  });

  const [addShopkeeperClients, scResult] = useAddShopkeeperClientsMutation();

  useEffect(()=>{
    for(let pd of providerData){
       // console.log(pd)
        if(pd.uid===data.uid){
            setFlag(1)
            setStatus(pd.Status)
        }
    }
  },[])

  const applyForMembership=()=>{
    afc = {
        status:  'Pending' ,
        security_amount: 0,
        seller_id: data.uid,
        buyer_id: userInfo.id,
        total_credit:0
      };
      console.log(afc);
      //dispatch(addVendorDistributor((JSON.stringify(avd))))
      addShopkeeperClients(JSON.stringify(afc)).then(
        !scResult.isError
          ? alert('Applied! track your status at MY Providers tab ')
          : alert('Error! Try Again'),
      );
  }

  if (rating.isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator visible={true} />
      </View>
    );
  }
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.vendorView}>
        <Text style={styles.vendorTitle}>Vendor Info</Text>
        <View style={{margin: 5, padding: 5, flexDirection: 'row'}}>
          <Image
            source={{uri: imageURL + data.uimage}}
            style={{width: 120, height: 150, borderRadius: 7, padding: 3}}
          />
          <View style={{marginLeft: 7}}>
            <Text style={styles.userInfoText}>Name: {data.uname}</Text>
            <Text style={styles.userInfoText}>Email: {data.uemail}</Text>
            <Text style={styles.userInfoText}>Mobile No: {data.umobileno}</Text>
            <Text style={styles.userInfoText}>City: {data.ucity}</Text>
            {rating.data ? (
              <AirbnbRating count={rating.data} size={20} defaultRating={5}
                showRating={false} starContainerStyle={{margin: 5}} isDisabled={true}
              />
            ) : (
              <Text style={styles.ratingText}>Not Rated Yet !</Text>
            )}
          </View>
        </View>
      </View>
      <View style={{marginTop:15}}>
        <Text style={styles.vendorTitle}>Product Details</Text>
      </View>
      <View style={{flex: 1, flexGrow: 1}}>
        <FlatList
          style={{marginTop: 15, marginBottom: 15, marginLeft: 3}}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          data={data.vendorProducts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() =>navigation.navigate('VendorProductsDetails', {data: item})}>
              <View style={styles.boxStyle}>
                <Image
                  source={{uri: imageURL + item.image}}
                  style={styles.imageStyle}
                />
                <View style={{marginLeft: 5}}>
                  <Text style={styles.text1}>Name: {item.name}</Text>
                  <Text style={styles.text2}>Price: PKR {item.saleprice_per_carton}</Text>
                  <Text style={styles.text2}>Qty Per Carton: {item.qty_in_carton}</Text>
                  {item.total_cartons >= 1 ? (
                    <Text style={{...styles.text1, color: 'green'}}>In Stock</Text>
                    ) : (
                    <Text style={{...styles.text1, color: 'red'}}>Out of Stock</Text>
                      )
                  }
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {
        flag===0?(
        <Button
            style={{
            backgroundColor: colors.buttons,
            alignSelf: 'center',
            borderRadius: 10,
            }}
            onPress={applyForMembership}
            >
            <Text style={{color: colors.cardbackground}}>
            Apply For Memebership
            </Text>
        </Button>):
        (
        <Button
            style={{
              backgroundColor: colors.buttons,
              alignSelf: 'center',
              borderRadius: 10,
            }}
            onPress={()=>status.trim()=='Allow'?navigation.navigate('MainOrderScreen',{data:data}):
              alert(`Sorry! Your current status is ${status}`)
            }
            >
            <Text style={{color: colors.cardbackground}}>
              Place an Order
            </Text>
        </Button>            
        )
      }
    </ScrollView>
  );
};

export default VendorInfoTab;

const styles = StyleSheet.create({
  vendorView: {
    marginTop: 20,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: colors.grey5,
    borderRadius: 5,
  },
  vendorTitle: {
    fontSize: 20,
    color: colors.grey1,
    letterSpacing: 2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  userInfoText: {
    fontSize: 16,
    color: colors.grey2,
    marginTop: 5,
    letterSpacing:.5
  },
  boxStyle: {
    flexDirection: 'row',
    margin: 7,
    padding: 19,
    borderWidth: 2,
    borderRadius: 10,
    left: 5,
    borderWidth: 1,
    borderColor: colors.grey5,
    alignSelf: 'center',
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: colors.grey4,
    borderWidth: 1,
    marginRight: 5,
  },
  text1: {
    fontSize: 14,
    color: colors.grey1,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 14,
    color: colors.grey2,
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
});
