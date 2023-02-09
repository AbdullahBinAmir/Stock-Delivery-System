import React from 'react'
import { Text, StyleSheet, View, ScrollView, Image } from 'react-native'
import { imageURL } from '../../global/API_Source_URL';
import { colors } from '../../global/Styles';

export default function VendorProductsDetails({route,navigation}) {

    const {data}=route.params;

    return (
        <ScrollView style={styles.container}>
        <View style={styles.titleBar}>
            <Text style={styles.titleBarText}>Product Details</Text>
        </View>
        <View style={styles.view2}>
        <View style={{alignItems:'center'}}>
            <Image
                source={{uri:imageURL+data.image}}  
                style={{width: 160, height: 160, borderRadius: 80, borderColor:colors.grey2, borderWidth:1,marginRight:5}} 
            />
        </View>   
            <View>
                <Text style={styles.text1}>Name: {data.name}</Text>
                <Text style={styles.text1}>Quantity Per Carton: {data.qty_in_carton}</Text>
                <Text style={styles.text1}>Sale Price Per Carton: PKR {data.saleprice_per_carton}</Text>
                <Text style={styles.text1}>Number of Carton: {data.total_cartons} </Text>
                <Text style={styles.text1}>Threshold To Buy: {data.threshold} cartons</Text>
                <Text style={styles.text1}>Product Description: {data.description}</Text>
            </View>
        </View>
      </ScrollView>
    )
  }

  const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.cardbackground,
    },
    titleBar:{
        width:'100%',
        height:90,
        backgroundColor:colors.buttons,
        justifyContent:'center',
        alignItems:'center'
    },
    titleBarText:{
        fontSize:24,
        fontWeight:'bold',
        color:colors.cardbackground
    },
    view2:{
        margin:15,
        paddingVertical:10,
        paddingHorizontal:10,
        backgroundColor:'#F5F5F5',
        borderWidth:1,
        borderRadius:10,
        top:10,
        borderColor:'#808080'
    },
    text1:{
        fontSize:18,
        padding:5,
        color:colors.grey2,
        marginVertical:10,
        borderRadius:10
    }
})
