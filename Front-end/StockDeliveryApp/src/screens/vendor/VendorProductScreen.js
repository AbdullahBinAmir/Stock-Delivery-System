import React, {useEffect,useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import VendorProductCard from '../../components/VendorProductCard';
import Header from '../../components/Header';
import {colors} from '../../global/Styles';
//import { vendorProduct } from '../assets/VProductData'
import {useSelector, useDispatch} from 'react-redux';
//import {getProduct} from '../../features/product/AddProductSlice';
import { useGetProductsQuery } from '../../features/api/vendor/VendorProductsAPISlice';
import { useGetStatisticsQuery } from '../../features/api/vendor/userAPISlice';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function VendorProductScreen({navigation}) {
  //const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.user);
  console.log(userInfo)
  const {data=[],isLoading}=useGetProductsQuery({id:userInfo.id})
  const [load,setLoad]=useState()
 // const {isLoading, productInfo} = useSelector(state => state.add_product);
  //console.log(productInfo)
  // const {data}=route.params;
  // console.log(data)
  // const[mydata,setMyData]=useState(productInfo)

/*   useEffect(() => {
    console.log('product mein user:'+userInfo)
    console.log('your Product Searchng..' + userInfo.id);
    dispatch(getProduct({id: userInfo.id}));
  }, []); */

  const result = useGetStatisticsQuery({
    id: userInfo.id
  });

  console.log(result.data)

  useEffect(()=>{
    setLoad('')
  })

  if (isLoading || result.isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator visible={true} />
      </View>
    );
  } else if(data) {
  return (
    <View style={styles.container}>
      <Header navigate={navigation} title="Vendor Dashboard" />
{result.data?(
      <View style={{padding:5,marginTop:5}}>
        <Text style={{fontSize:18,color:colors.grey2,fontWeight:'bold'}}>Total Credit: PKR {result.data[1]}</Text>
      </View>):null
      }
      <View style={styles.textBarTab}>
        <Text style={styles.textTop}>My Products</Text>
      </View>
      <View style={{flex: 1, flexGrow: 1}}>
        <FlatList
          style={{marginTop: 10, marginBottom: 10}}
          horizontal={false}
          showsVerticalScrollIndicator={true}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={{marginRight: 10, marginLeft: 10}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductsManagerScreen', {data: item});
                }}>
                <VendorProductCard
                  pid={item.id}
                  screenWidth={SCREEN_WIDTH * 0.8}
                  pname={item.name}
                  quantityPerCarton={item.qty_in_carton}
                  totalCartons={item.total_cartons}
                  salePriceDistributor={item.saleprice_per_carton}
                  companyName={item.company_name}
                  thresholdToBuy={item.threshold}
                  productCategory={item.category}
                  productDescription={item.description}
                  productImage={item.image}
                  nav={navigation}
                />
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
  textTop: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.buttons,
    letterSpacing:1
  },
  textBarTab: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 10,
    height: 50,
    backgroundColor: colors.grey5,
    padding: 10,
  },
});
