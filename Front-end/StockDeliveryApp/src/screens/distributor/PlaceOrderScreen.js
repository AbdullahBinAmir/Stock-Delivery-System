import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../global/Styles';
import CartItemCard from '../../components/CartItemCard';
import {Button} from 'react-native-paper';
import {useSelector,useDispatch} from 'react-redux';
import { clearCart, placeOrder } from '../../features/orderManagement.js/OrderSlice';
import { useAddShopkeeperClientsMutation, useGetDistributorDataForShopkeeperQuery } from '../../features/api/shopkeeper/ShopkeeperClientsAPI';


const AddDistributorForShoopkeeper=(sid,bid,addShopkeeperClients)=>{
  afc = {
    status:  'Allow' ,
    security_amount: 1,
    seller_id: sid,
    buyer_id: bid,
    total_credit:0
  };
  console.log(afc);
  //dispatch(addVendorDistributor((JSON.stringify(avd))))
  addShopkeeperClients(JSON.stringify(afc)).then(
    !scResult.isError
      ? console.log('Data for distributor added as well')
      : console.log('Error! Try Again'),
  );
}

const PlaceOrderScreen = () => {
  const {cartItems, total} = useSelector(state => state.order_manager);
 // console.log(cartItems)
  const {userInfo} = useSelector(state => state.user);
  const [addShopkeeperClients, scResult] = useAddShopkeeperClientsMutation();
  const dispatch=useDispatch()

  const placeAnOrder=async ()=>{
    let arr=[]
    cartItems.forEach((item)=>{
      arr.push({
        qty_ordred:item.qtyOrdered,
        product_id:item.id
      })
    })
    if(arr.length>0)
    dispatch(placeOrder({total:total,sid:cartItems[0].vid,bid:userInfo.id,cartItems:arr}))
    // if(userInfo.roles=='ShopKeeper' && cartItems[0].utype=='Distributor'){
    //   AddDistributorForShoopkeeper(cartItems[0].vid,userInfo.id,addShopkeeperClients)
    // }
    dispatch(clearCart())
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Icon name="cart-arrow-down" color={colors.cardbackground} size={30} />
        <Text style={styles.titleBarText}>Checkout</Text>
      </View>
      <View style={{flex: 1, flexGrow: 1}}>
        <FlatList
          style={{marginTop: 10, marginBottom: 10}}
          horizontal={false}
          showsVerticalScrollIndicator={true}
          data={cartItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={{marginRight: 10, marginLeft: 10}}>
              <CartItemCard
                id={item.id}
                name={item.name}
                image={item.image}
                qtyOrdered={item.qtyOrdered}
                salePrice={item.Saleprice}
              />
            </View>
          )}
        />
      </View>
      <View style={styles.totalBillView}>
        <Text style={styles.totalBillText}>Total Bill</Text>
        <Text style={styles.totalBillText}>{total} PKR</Text>
      </View>
      <Button
        style={{borderRadius: 10, margin: 10, top: 10}}
        icon="launch"
        mode="contained"
        labelStyle={{color: colors.cardbackground, fontSize: 16}}
        onPress={placeAnOrder}>
        PLACE AN ORDER
      </Button>
    </View>
  );
};

export default PlaceOrderScreen;

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
    flexDirection: 'row',
    width: '100%',
    height: 70,
    backgroundColor: colors.buttons,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
    borderColor: colors.cardbackground,
  },
  titleBarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.cardbackground,
    left: 10,
  },
  totalBillView: {
    width: '90%',
    top: 15,
    alignSelf: 'center',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    margin: 10,
    padding: 10,
    borderColor: colors.grey4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalBillText: {
    fontSize: 18,
    color: colors.grey1,
  },
});
