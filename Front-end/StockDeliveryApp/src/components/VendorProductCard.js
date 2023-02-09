import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { imageURL } from '../global/API_Source_URL';
import {colors} from '../global/Styles';

export default function VendorProductCard(props, {navigation}) {
  console.log(props.pid)
  //console.log(JSON.stringify(props));

  // const data={
  //         id:pid,prname:pname,qtyCarton:quantityPerCarton,priceCarton:pricePerCarton,nCartons:no_Of_Carton,
  //         ppd:purchasePriceDistributor,spd:salePriceDistributor,threshold:thresholdToBuy,
  //         pcat:productCategory,pdesp:productDescription,pImg:productImage
  // }

  return (
    <View style={{...styles.cardView, width: props.screenWidth}}>
      <View
        style={{
          flex: 7,
          borderBottomWidth: 2,
          borderColor: colors.grey4,
          height: 170,
        }}>
        <ImageBackground
          resizeMethod='scale'
          resizeMode='stretch'
          source={{uri: imageURL+props.productImage}}
          style={{flex: 1, height: 165,width:280,justifyContent:'center',padding:5}}
        />
{/*         <View style={styles.ratingView}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 25,
              fontWeight: 'bold',
              color: colors.cardbackground,
            }}>
            4.5
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 12,
              color: colors.cardbackground,
            }}>
            Ratings
          </Text>
        </View> */}
      </View>
      <View style={{flex: 3, marginLeft: 5, marginTop: 5, padding: 5}}>
        <Text style={styles.textStyle}>Name: {props.pname}</Text>
        <Text style={styles.textStyle}>
          Qty Per Carton: {props.quantityPerCarton}
        </Text>
        <Text style={styles.textStyle}>Qty In Stock: {props.totalCartons?props.totalCartons:'Out of Stock'}</Text>
        <View style={styles.addStockBtn}>
          <Text style={{fontSize:18,fontWeight:'bold',color:colors.cardbackground}}
          onPress={()=>props.nav.navigate('AddNewStockScreen',{pid:props.pid})}
          >Add New Stock</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: colors.grey4,
    marginLeft: 15,
  },
  imageView: {
    justifyContent: 'center',
    backgroundColor: '#ffff',
  },
  textStyle: {
    color: colors.grey2,
    fontSize: 16,
    letterSpacing:1,
    fontWeight:'bold'
  },
/*   ratingView: {
    alignSelf: 'flex-end',
    backgroundColor: colors.buttons,
    height: 60,
    width: 60,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    opacity: 0.9,
  }, */
  addStockBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    borderColor: colors.grey5,
    borderWidth: 2,
    width: 150,
    alignSelf: 'flex-end',
    borderRadius: 10,
    backgroundColor:colors.lightGreen,
    opacity:.8
  },
});
