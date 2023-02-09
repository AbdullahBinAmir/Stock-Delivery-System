import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native'
import React from 'react'
import { colors } from '../global/Styles'
import { useDispatch } from 'react-redux'
import { addQuantity, removeItem } from '../features/orderManagement.js/OrderSlice'
import { imageURL } from '../global/API_Source_URL'

const CartItemCard = ({id,image,name,qtyOrdered,salePrice}) => {

  const dispatch=useDispatch()
  const [qty,setQty] = React.useState(0)

  return (
    <View style={styles.cartItem}>
    <View style={{flexDirection: 'row'}}>
      <Image
        source={{uri: imageURL+image}}
        style={{height: 80, width: 80}}
      />
      <View>
        <Text style={styles.cartItemText}>Name: {name}</Text>
        <Text style={styles.cartItemText}>Item total: {salePrice*qtyOrdered} PKR</Text>
        <Text style={styles.cartItemText}>Cartons: {qtyOrdered}</Text>
      </View>
    </View>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <Text style={styles.cartItemText}>Add Cartons:</Text>
        <TextInput style={styles.qtyTextInput} value={qty}
         onChangeText={(value)=>setQty(value)} />
        <TouchableOpacity style={{backgroundColor:colors.lightGreen,marginHorizontal:10,height:30,width:30,borderRadius:5}}
          onPress={()=>dispatch(addQuantity({id:id,qty:qty}))}
        >
          <Text style={{fontSize:25,alignSelf:'center',bottom:4,fontWeight:'bold',color:colors.cardbackground}}>+</Text>
        </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.delBtn}
        onPress={()=>dispatch(removeItem(id))}
    >
      <Text
        style={styles.delBtnText}>
        Remove from cart
      </Text>
    </TouchableOpacity>
  </View>
  )
}

export default CartItemCard

const styles = StyleSheet.create({
    cartItemText: {
      fontSize: 16,
      color: colors.grey2,
      marginTop:5
    },
    cartItem: {
      width: '90%',
      borderWidth: 2,
      alignSelf: 'center',
      padding: 5,
      borderColor: colors.buttons,
      borderRadius: 10,
      marginTop:10
    },
    delBtn: {
      borderWidth: 1,
      borderColor: colors.cardbackground,
      marginVertical: 5,
      marginHorizontal: 10,
      padding: 5,
      backgroundColor: '#EA3C53',
      borderRadius: 5,
    },
    delBtnText:{
      fontSize: 20,
      textAlign: 'center',
      color: colors.cardbackground,
      fontWeight:'bold'
    },
    qtyTextInput:{
      marginLeft:5,
      borderWidth:1,
      borderColor:colors.grey2,
      height:40,
      width:80,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10
    }
  });