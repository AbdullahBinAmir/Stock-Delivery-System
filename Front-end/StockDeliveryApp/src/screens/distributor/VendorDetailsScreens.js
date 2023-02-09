import React from 'react'
import { Text, StyleSheet, View, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator }  from 'react-native'
import { imageURL } from '../../global/API_Source_URL';
import { colors } from '../../global/Styles';
import { useSelector } from 'react-redux';
import { useGetVendorsQuery } from '../../features/api/distributor/VendorListAPISlice';
import { Button } from 'react-native-paper';
import { useAddShopkeeperClientsMutation } from '../../features/api/shopkeeper/ShopkeeperClientsAPI';

export default function VendorDetailsScreens({route,navigation}){

    const {userInfo} = useSelector(state => state.user);
    const [addShopkeeperClients, scResult] = useAddShopkeeperClientsMutation();
    const {vid}=route.params; 

    const {isLoading,data} = useGetVendorsQuery({
      vid:vid,
      did:userInfo.id
    })

    const applyDistribution=()=>{
      avd={
        status:"Pending",
        security_amount:0,
        seller_id:data.uid,
        buyer_id:userInfo.id,
        total_credit:0
      }
      console.log(avd)
      addShopkeeperClients(JSON.stringify(avd)).then(
        !scResult.isError?alert('Application Submitted!'):alert('Error! Try Again')
      )
    }

   // console.log(data)

    if (isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator visible={true} />
        </View>
      );
    } else if(data) {
    return (
     <View style={styles.container}>
      <ScrollView> 
        <View style={styles.titleBar}>
          <Text style={{fontSize:22,fontWeight:'bold',color:colors.cardbackground}}>Vendor Details</Text>
        </View> 
          <View style={styles.textBarTab}>
              <Text style={styles.textTop}> Vendor Info </Text>
          </View>
           <View style={{margin:10,paddingVertical:8,backgroundColor:'#F5F5F5',paddingHorizontal:5,borderRadius:5,borderWidth:1,borderColor:colors.grey5}}>
              <Text style={styles.text2}>Name: {data.uname} </Text>
              <Text style={styles.text2}>Email: {data.uemail}</Text>
              <Text style={styles.text2}>Mobile: {data.umobileno}</Text>
              <Text style={styles.text2}>City: {data.ucity}</Text>
              <Text style={styles.text2}>Address: {data.Address}</Text>
           </View>
           <View style={styles.textBarTab}>
             <Text style={styles.textTop}> Vendor Products</Text>
           </View>
           <View style={{flex:1,flexGrow:1}}>
           <FlatList
             style={{marginTop:10,marginBottom:10}}
             horizontal={true}
             data={data.vendorProducts}
             keyExtractor={(item,index)=>index.toString()}
             renderItem={({item,index})=>(
               <View style={{marginRight:10}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('VendorProductsDetails',{data:item})}>
                      <View style={styles.boxStyle}>
                        <Image
                          source={{uri:imageURL+item.image}}  
                          style={styles.imageStyle}
                        />
                        <View style={{marginLeft:5}}>
                          <Text style={styles.text1}>Name: {item.name}</Text>
                          <Text style={styles.text1}>Qty: {item.total_cartons}</Text>
                          <Text style={styles.text1}>Threshold: {item.threshold}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
               </View>
             )}
           />
       </View>
       <View style={{margin:10,marginBottom:15}}>
       {
        data.status.trim()!='' && data.status.trim()!='Allow'?alert('You cannot place order! Your status is '+ data.status.toString()):
        data.status.trim()=='Allow'?(
          <Button style={{backgroundColor:colors.buttons,margin:10,borderRadius:25}}
            onPress={()=>navigation.navigate('MainOrderScreen',{data:data})}
          >
              <Text style={{fontSize:16,color:colors.cardbackground}}>Place An Order</Text>
          </Button>
        ):
        (
          <Button style={{backgroundColor:colors.buttons,margin:10,borderRadius:25}}
            onPress={applyDistribution}
          >
              <Text style={{fontSize:16,color:colors.cardbackground}}>Apply For Distribution</Text>
          </Button>
          )
       }
       </View>
      </ScrollView>
      </View>
    )
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
    container:{
      flex:1,
      backgroundColor:colors.cardbackground
    },
    textTop:{
      fontSize:20,
      fontWeight:'bold',
      color:colors.buttons
    },
    textBarTab:{
        alignItems:'flex-start',
        justifyContent:'center',
        marginLeft:5,
        marginTop:15,
        marginBottom:10,
        height:50,
        backgroundColor:colors.grey5,
        padding:10,
        borderRadius:10
    },
    titleBar:{
      width:'100%',
      height:80,
      backgroundColor:colors.buttons,
      alignItems:'center',
      justifyContent:'center'
    },
      imageStyle:{
        width:80,
        height:80,
        borderRadius:40,
        borderColor:colors.grey1,
        borderWidth:1,
        marginRight:5
      },
      boxStyle:{
        flexDirection:'row',
        margin:10,
        paddingHorizontal:5,
        paddingVertical:10,
        backgroundColor:'#F5F5F5',
        borderRadius:10,
        left:5,
        borderWidth:1,
        borderColor:colors.grey5
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
  
