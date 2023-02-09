import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../global/Styles';
//import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProductToOrderCard from '../../components/ProductToOrderCard';
import {imageURL} from '../../global/API_Source_URL';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import {Badge, withBadge} from '@rneui/base';
import {useDispatch, useSelector} from 'react-redux';
import {clearCart} from '../../features/orderManagement.js/OrderSlice';

const screenWidth = Dimensions.get('screen').width;

const UserInfoView = ({user}) => {
  return (
    <View style={styles.cstmr_card}>
      <Image
        source={{
          uri: imageURL + user.uimage,
        }}
        style={styles.cstmr_card_image}
      />
      <View style={{left: 5}}>
        <View style={styles.cstmr_card_data}>
          <Icon name="user" color={colors.buttons} size={16} />
          <Text style={styles.cstmr_card_text}>{user.uname}</Text>
        </View>
        <View style={styles.cstmr_card_data}>
          <Icon name="envelope" color={colors.buttons} size={16} />
          <Text style={styles.cstmr_card_text}>{user.uemail}</Text>
        </View>
        <View style={styles.cstmr_card_data}>
          <Icon name="phone" color={colors.buttons} size={16} />
          <Text style={styles.cstmr_card_text}>{user.umobileno}</Text>
        </View>
        <View style={styles.cstmr_card_data}>
          <Icon name="map-marker" color={colors.buttons} size={16} />
          <Text style={styles.cstmr_card_text}>{user.ucity}</Text>
        </View>
      </View>
    </View>
  );
};

const FooterComponent = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
      }}>
      <Text
        style={{
          fontSize: 16,
          color: colors.lightGreen,
          fontWeight: 'bold',
          fontStyle: 'italic',
          textDecorationLine: 'underline',
        }}>
        Enjoy Shopping
      </Text>
    </View>
  );
};

const MainOrderScreen = ({navigation, route}) => {
  const cartItems = useSelector(state => state.order_manager.cartItems);
  //let [cartCount, setCartCount] = useState(2);
  const BadgeIcon = withBadge(cartItems ? cartItems.length : 0)(Icon1);
  const user = route.params.data;
  const dispatch = useDispatch();

  console.log(user);
  //console.log('Your Main data is'+JSON.stringify(route.params))
  //console.log('Your Product data is'+JSON.stringify(route.params.data.vendorProducts))

  useEffect(() => {
    dispatch(clearCart());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <View style={{flex: 0.2, marginLeft: 10, padding: 5}}>
          <Icon
            name="arrow-circle-left"
            color={colors.cardbackground}
            size={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View style={{flex: 0.8}}>
          <Text style={styles.titleText}>Order Managment</Text>
        </View>
        <View style={{marginRight: 15}}>
          <BadgeIcon
            name="shopping-cart"
            color={colors.cardbackground}
            size={30}
            onPress={() => {
              navigation.navigate('PlaceOrderScreen');
            }}
          />
        </View>
      </View>
      <View>
        <FlatList
          ListHeaderComponent={<UserInfoView user={user} />}
          ListFooterComponent={<FooterComponent />}
          ListFooterComponentStyle={{marginBottom: 80}}
          style={{marginTop: 10, marginBottom: 10}}
          horizontal={false}
          showsVerticalScrollIndicator={true}
          data={route.params.data.vendorProducts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={{marginRight: 10, marginLeft: 10}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('VendorProductsDetails', {data: item});
                }}>
                <ProductToOrderCard
                  id={item.id}
                  pname={item.name}
                  image={item.image}
                  Saleprice={item.saleprice_per_carton}
                  threshold={item.threshold}
                  totalCartons={item.total_cartons}
                  utype={item.utype}
                  vid={user.uid}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default MainOrderScreen;

const styles = StyleSheet.create({
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
    fontSize: 23,
    fontWeight: 'bold',
    color: colors.cardbackground,
  },
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
  cstmr_card: {
    borderWidth: 1.8,
    borderColor: colors.grey4,
    width: screenWidth * 0.9,
    alignSelf: 'center',
    marginVertical: 10,
    top: 10,
    borderRadius: 10,
    padding: 7,
    flexDirection: 'row',
  },
  cstmr_card_data: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: 3,
    // width: 200,
    margin: 3,
  },
  cstmr_card_text: {
    fontSize: 17,
    color: colors.grey2,
    left: 5,
  },
  cstmr_card_image: {
    height: 90,
    width: 90,
    borderRadius: 30,
    borderColor: colors.grey5,
    borderWidth: 1,
    top: 12,
  },
});
