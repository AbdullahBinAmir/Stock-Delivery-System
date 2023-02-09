import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { imageURL } from '../global/API_Source_URL'
import { colors } from '../global/Styles'

export default function OrderInfoCard(props){
    const item=props.item
    return (
        <View style={styles.boxStyle}>
        <Image
          source={{uri:imageURL+item.pimage}}  
          style={styles.imageStyle}
        />
        <View style={{marginLeft:5,top:5}}>
          <Text style={styles.text1}>Name: {item.pname}</Text>
          <Text style={styles.text1}>Qty: {item.qtyOdered}</Text>
          <Text style={styles.text1}>Amount: PKR {item.price*item.qtyOdered}</Text>
        </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
      imageStyle:{
        width:80,
        height:80,
        borderRadius:10,
        borderColor:colors.cardbackground,
        borderWidth:1,
        marginRight:5
      },
      boxStyle:{
        flexDirection:'row',
        margin:10,
        paddingHorizontal:5,
        paddingVertical:10,
        borderWidth:2,
        borderColor:'#F5F5F5',
        borderRadius:10,
        left:5
      },
      text1:{
        fontSize:14,
        color:colors.grey1
      },
      text2:{
        fontSize:16,
        color:colors.grey1,
        padding:5
      }
  })
  
