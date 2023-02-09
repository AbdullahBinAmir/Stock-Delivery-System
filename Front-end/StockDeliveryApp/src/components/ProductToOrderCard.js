import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import React,{useState,useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../global/Styles';
import {Button, TextInput} from 'react-native-paper';
import {imageURL} from '../global/API_Source_URL';
import { useDispatch } from 'react-redux';
import { addCartItem, calculateTotals } from '../features/orderManagement.js/OrderSlice';

const screenWidth = Dimensions.get('screen').width;

const ProductToOrderCard = ({id, pname, image, Saleprice, threshold, totalCartons, vid, utype}) => {

  const [qtyToOrder,setQtyToOrder]=useState()
  const dispatch=useDispatch()

  const  addToCart=()=>{
    // console.log(threshold)
    // console.log(totalCartons)
    // console.log(qtyToOrder)
     if (qtyToOrder<threshold){
      Alert.alert("Information","Minimum Threshold is "+threshold, [{text:'OK'}])
     }
    if (qtyToOrder>totalCartons){
      Alert.alert("Warning","Sorry! we are out of stock", [{text:'OK'}])
    }
    else if (qtyToOrder>=threshold && qtyToOrder<=totalCartons)
      dispatch(addCartItem({id:id,name:pname,Saleprice:Saleprice,qtyOrdered:qtyToOrder,vid:vid,image:image,utype:utype}))
  }

  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View style={{padding: 5}}>
          <View style={styles.cstmr_card_data}>
            <Icon name="shopping-bag" color={colors.buttons} size={16} />
            <Text style={{...styles.cstmr_card_text, fontSize: 16}}>
              {pname}
            </Text>
          </View>
          <View style={styles.cstmr_card_data}>
          <Icon name="check" color={colors.lightGreen} size={14} />
          <Text style={{...styles.cstmr_card_text, fontSize: 14,color:colors.lightGreen,fontWeight:'bold'}}>
            Min. limit to buy {threshold}
          </Text>
        </View>
          <View>
            <TextInput
              label={'Enter Cartons'}
              mode="outlined"
              style={{marginVertical: 5, fontSize: 16,}}
              value={qtyToOrder}
              onChangeText={(e)=>setQtyToOrder(e)}
            />
          </View>
        </View>
        <View style={{marginTop:20}}>
          <Image
            source={{
              uri: imageURL + image,
            }}
            style={styles.cardImage}
          />
        </View>
      </View>
      <View style={styles.addToCardBtn}>
        <Button
          style={{borderRadius: 15, padding: 1}}
          icon="cart-plus"
          mode="contained"
          labelStyle={{color: colors.cardbackground, fontSize: 16}}
          onPress={addToCart}>
          Add To Cart
        </Button>
      </View>
    </View>
  );
};

export default ProductToOrderCard;

const styles = StyleSheet.create({
  main: {
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: colors.grey4,
    width: screenWidth * 0.9,
    borderWidth: 1,
    alignSelf: 'center',
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
  cardImage: {
    height: 100,
    width: 100,
    borderRadius: 15,
    borderColor: colors.grey5,
    borderWidth: 1,
    right: 7,
    top: 2,
  },
  addToCardBtn: {
    backgroundColor: colors.buttons,
    borderRadius: 10,
    alignSelf: 'center',
  },
});
