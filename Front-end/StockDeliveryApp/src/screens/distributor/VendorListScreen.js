import React, {useState,useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';
//import {vendorList} from '../../global/VendorListData';
import UserInfoCard from '../../components/UserInfoCard';
import {colors} from '../../global/Styles';
import {useSelector, useDispatch} from 'react-redux';
import {imageURL} from '../../global/API_Source_URL';
//import {getVendorsList} from '../../features/vendorDistributor/VendorDistributorSlice';
import { useGetVendorsListQuery } from '../../features/api/distributor/VendorListAPISlice';

export default function VendorListScreen({navigation}) {
  //const {Loading, vendorList} = useSelector(state => state.vendor_distributor);
  const {userInfo} = useSelector(state => state.user);
  const {isLoading,data=[]} = useGetVendorsListQuery({
    id:userInfo.id
  })
 // const dispatch = useDispatch();
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

  const [vendorData, setVendorData] = useState();

  const filterVendorsList = cat => {
    //console.log(vendorData)
    let vList = [];
    for (let v of data) {
      for (let p in v.vendorProducts) {
        if (v.vendorProducts[p].category == cat) {
          //console.log(v)
          vList.push(v);
          break;
        }
      }
    }
    //console.log(vList)
    setVendorData(vList);
  }

/*   useEffect(() => {
    dispatch(getVendorsList())
      .unwrap()
      .then(originalPromiseResult => {
        console.log('Success..');
        console.log(originalPromiseResult);
        setVendorData(vendorList);
      })
      .catch(rejectedValueOrSerializedError => {
        console.log(rejectedValueOrSerializedError);
      });
  }, []); */

  useEffect(()=>{
    if(category.id===1){
       setVendorData(data)
    }
  },[category.id])

  // const [scity, setSCity] = useState('');


  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator visible={true} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Header navigate={navigation} title="Distributor Dashboard" />
        <View style={styles.textBarTab}>
          <Text style={styles.textTop}>Select a Category</Text>
        </View>
        <View>
          <FlatList
            style={{marginTop: 10, marginBottom: 10}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={catList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setCategory(item);
                  //console.log(item)
                  if (item.cat !== 'All') {
                    filterVendorsList(item.cat);
                  } else {
                    setVendorData(data);
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
            style={{marginTop: 10, marginBottom: 10}}
            horizontal={false}
            showsVerticalScrollIndicator={true}
            data={category.id===1?data:vendorData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('VendorDetailsScreens', {data: item})
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
    letterSpacing:1
  },
  textBarTab: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 5,
    height: 50,
    backgroundColor: colors.grey5,
    paddingLeft:10
  },
  categoryBox: {
    margin: 10,
    backgroundColor: colors.grey3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingHorizontal:10,
    paddingVertical:5
  },
  catBoxText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.cardbackground,
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
});
