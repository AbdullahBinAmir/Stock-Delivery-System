import {
  StyleSheet, 
  Text, 
  View, 
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../global/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header';
import { imageURL } from '../../global/API_Source_URL';
import { useGetAllProductsQuery } from '../../features/api/vendor/VendorProductsAPISlice';
import { useSelector } from 'react-redux';

const WIDTH=Dimensions.get('screen').width;
const DistributorProductCard=({item})=>{
  return(
    <View style={{width:WIDTH*.44,borderWidth:2,margin:5,padding:5,marginLeft:10,borderColor:colors.grey5,borderRadius:10}}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:3}}>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:12,fontWeight:'bold'}}>Qty Per Carton </Text>
          <Icon
            name="cube"
            color={colors.buttons}
            size={18}
          />
          <Text style={{fontSize:14,fontWeight:'bold'}}> x {item.qty_in_carton}</Text>
        </View>
      </View>
      <View style={{margin:5,marginTop:12}}>
        <Image source={{uri:imageURL+item.image}}
              style={{width:120,height:100}}
        />
      </View>
      <View>
        <Text style={{fontSize:16,fontWeight:'700',color:colors.grey2}}>{item.name}</Text>
      </View>
    </View>
  )
}
const ProductCatSearchScreen = ({navigation}) => {
  const {isLoading,data=[]} = useGetAllProductsQuery({});
  const {userInfo} = useSelector(state => state.user);
  //console.log(data)
  const catList = [
    {
      id: 1,
      cat: 'All'
    },
    {
      id: 2,
      cat: 'Frozen',
    },
    {
      id: 3,
      cat: 'Snacks',
    },
    {
      id: 4,
      cat: 'Sweet',
    },
    {
      id: 5,
      cat: 'Daily Use',
    },
    {
      id: 6,
      cat: 'Dairy',
    },
    {
      id: 7,
      cat: 'Baby food',
    },
    {
      id: 8,
      cat: 'Drinks',
    },
  ];
  const [category, setCategory] = useState(catList[0]);
  const [searchText, setSearchText] = useState("");
  const [filterBtn, setfilterBtn] = useState(0);
  const [productData,setProductData]=useState()


  const filterProductListBySearch = () => {
    let pList = [];
      for (let pdata of data) {
        if (pdata.name.toLowerCase().includes(searchText.toLowerCase())) 
        {
          pList.push(pdata);
        }
      }
      setProductData(pList);
  }

  const filterProductListByCat = (cat) => {
    let pList = [];
      for (let pdata of data) {
        if (pdata.category == cat) 
        {
          pList.push(pdata);
        }
      }
      setProductData(pList);
  }

{/* 
    const filterProductListByPrice = () => {
    let plist = data?data.sort((a,b)=>a.salePrice>b.salePrice?1:-1):
    productData.sort((a,b)=>a.salePrice>b.salePrice?1:-1)
      setProductData(plist);
  }
 */}

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator visible={true} />
      </View>
    );
  } else {
  return (
    <View style={styles.container}>
      <Header navigate={navigation} title="Search Dashboard" />
      <View style={styles.searchMainView}>
        <View style={styles.searchView}>
          <TextInput
            placeholder="Enter Product Name"
            style={styles.searchBarStyle}
            placeholderTextColor={colors.grey2}
            onChangeText={e => setSearchText(e)}
            value={searchText}
            onChange={() => console.log(searchText)}
          />
          </View>
          <View style={styles.searchIcon}>
            <Icon
              name="search"
              color={colors.cardbackground}
              size={24}
              onPress={filterProductListBySearch}
            />
        </View>
      </View>
      <View style={{flexDirection:'row',margin:10,justifyContent:'space-evenly',alignItems:'center'}}>
          <Text style={{fontSize:26,fontWeight:'bold',letterSpacing:2}}>Categories</Text>
{/*           <Icon
            name="sort-amount-asc"
            color={colors.cardbackground}
            style={{backgroundColor:filterBtn===0?colors.grey3:colors.buttons,padding:7,borderRadius:5}}
            size={20}
            onPress={() => {
              if(filterBtn==0){
                filterProductListByPrice()
                setfilterBtn(1)

              }
              else{
                setCategory(catList[0])
                setSearchText("")
                setProductData(data);
                setfilterBtn(0)
              }
            }}
          /> */}
      </View>
      <View>
      <FlatList
        style={{marginTop: 10, marginBottom: 10,marginLeft:15}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={catList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setCategory(item);
              if (item.cat !== 'All') {
                filterProductListByCat(item.cat);
              } else {
                setProductData(data);
              }
            }}>
            <View
              style={
                item.id == category.id
                  ? {...styles.categoryBox, backgroundColor: colors.buttons}
                  : styles.categoryBox
              }>
              <Text style={styles.catBoxText}>
                {item.cat}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
    <View style={{flex: 1, flexGrow: 1}}>
    <FlatList
      numColumns={2}
      style={{marginTop: 10, marginBottom: 10, marginLeft:3}}
      horizontal={false}
      showsVerticalScrollIndicator={true}
      data={productData?productData:data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => userInfo.roles=='Distributor'?
        navigation.navigate('VendorDetailsScreens',{vid:item.vendor_id}):
        navigation.navigate('ProviderInfoScreen',{pid:item.id})}>
          <DistributorProductCard item={item} />
        </TouchableOpacity>
      )}
    />
  </View>
    </View>
  );
};
}

export default ProductCatSearchScreen;

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
  headerStyle: {
    backgroundColor: colors.buttons,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  searchBarStyle: {
    backgroundColor: colors.grey5,
    color: colors.grey2,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  searchView: {
    backgroundColor: colors.grey5,
    paddingHorizontal: 25,
  },
  searchIcon: {
    backgroundColor: colors.buttons,
    borderRadius: 25,
    padding: 3,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchMainView:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-around',
    backgroundColor:colors.grey5,
    margin:10,
    padding:1,
    borderRadius:25
  },
  categoryBox: {
    margin: 5,
    backgroundColor: colors.grey4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:10,
    paddingVertical:2,
    borderRadius:10
  },
  catBoxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.cardbackground,
    padding: 5,
    letterSpacing:1
  },
});
