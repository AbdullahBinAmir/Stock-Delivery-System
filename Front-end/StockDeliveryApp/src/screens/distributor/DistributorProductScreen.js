import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {colors} from '../../global/Styles';
import Header from '../../components/Header';
import {useSelector} from 'react-redux';
import {useGetDistributorProductsQuery} from '../../features/api/distributor/DistributorProductAPI';
import {imageURL} from '../../global/API_Source_URL';

const DistributorProductCard = ({item}) => {
  return (
    <View style={styles.cardView}>
      <Image source={{uri: imageURL + item.pImage}} style={styles.imageStyle} />
      <View style={{margin: 5, left: 5}}>
        <Text style={styles.cardText}>Name: {item.pname}</Text>
        <Text style={styles.cardText}>Company Name: {item.companyName}</Text>
        <Text style={styles.cardText}>Total Carton: {item.totalCartons}</Text>
        <Text style={styles.cardText}>Sale Price: PKR {item.salePrice}</Text>
      </View>
    </View>
  );
};

const DistributorProductScreen = ({navigation}) => {
  const userInfo = useSelector(state => state.user.userInfo);
  const {isLoading, data = [],refetch} = useGetDistributorProductsQuery({
    uid: userInfo.id,
  })

  React.useEffect(()=>{
    refetch()
  },[])

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator visible={true} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Header navigate={navigation} title="Distributor Products" />
          <View style={{flex: 1, flexGrow: 1}}>
            <FlatList
              style={{marginTop: 15, marginBottom: 10}}
              horizontal={false}
              showsVerticalScrollIndicator={true}
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DistributorProductDetail', {
                      data: item,
                    })
                  }>
                  <DistributorProductCard item={item} refetch={refetch} id={userInfo.id} />
                </TouchableOpacity>
              )}
            />
          </View>
      </View>
    );
  }
};

export default DistributorProductScreen;

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
  cardView: {
    borderWidth: 2,
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 10,
    borderColor: colors.grey5,
    flexDirection: 'row',
    borderRadius: 10,
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.grey3,
    marginTop: 5,
  },
  cardText: {
    color: colors.grey2,
    fontSize: 14,
  },
});
