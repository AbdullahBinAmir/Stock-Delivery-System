import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../../global/Styles';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from 'react-native-paper';
import { globalAPI } from '../../../global/API_Source_URL';

const ReturnReasonScreen = ({navigation,route}) => {

    const {data,price,qtyOdered,pid} = route.params

    const SaveReturned=()=>{
        console.log(data.sid)
        const rdata={
            reason:'Product Return',
            detail:productDescription,
            product_id:pid,
            order_id:data.oid,
            qty:qty,
            price_per_pack:price,
            seller_id:data.sid,
            buyer_id:data.bid,
            status:'requested'
        }
       // console.log(JSON.stringify(rdata))
       try{
        fetch(globalAPI+'/ReturnProduct/SaveReturnedProduct',{
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(rdata)
        })
        .then((response) => response.json())
        .then((data) => {
          if(data==1){
            alert('Your Request Has Been Sent!')
          }
          else if(data==2){
            alert('Failed! Your order is more than 14 days old')
          }
        });
      }
      catch(error){
        alert('Problem Occurs!' + error)
      }
    }

    const [productDescription, setProductDescription] = useState('');
    const [qty, setQty] = useState(0);

  return (
    <ScrollView style={styles.container}>
        <View style={styles.titleBarView}>
            <Icon
                name="arrow-circle-left"
                color={colors.cardbackground}
                size={30}
                onPress={() => {
                navigation.goBack()
                }}
            />
            <Text style={styles.titleBarText}>Return Reason Form</Text>
        </View>
        <View>
        <Image
            source={require('../../../assets/returnProduct.png')}
            style={styles.imageStyle}
            resizeMethod={'resize'}
            resizeMode={'cover'}
        />
        </View>
        <View>
            <View style={{margin:5}}>
                <Text style={styles.titleText}>PLEASE ENTER A REASON TO RETURN</Text>
                <TextInput
                    style={{
                    paddingVertical: 25,
                    marginTop:5,
                    marginBottom:5,
                    color:colors.grey2
                    }}
                    label="Please tell us about the problem"
                    placeholderTextColor={colors.grey2}
                    value={productDescription}
                    onChangeText={t => setProductDescription(t)}
                    multiline={true}
                />
                <TextInput 
                    style={styles.textInput} label={`Enter Qty To Return (must be <=${qtyOdered})`} keyboardType='number-pad'
                    mode='outlined' value={qty} onChangeText={(t)=>setQty(t)}
                />
                <View style={{margin:15}}>
                <TouchableOpacity style={styles.btnView}
                    onPress={()=>{qty<=qtyOdered && qty>1?SaveReturned():alert(`Qty Must be less than ${qtyOdered}`)}}
                >
                    <Text style={styles.text3}>Return Product</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    </ScrollView>
  )
}

export default ReturnReasonScreen

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
      titleBarText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.cardbackground,
        letterSpacing:1,
        marginLeft:10
      },
      titleBarView: {
        width: '100%',
        backgroundColor: colors.buttons,
        flexDirection:'row',
        alignItems: 'center',
        paddingHorizontal:25,
        paddingVertical:15
      },
      imageStyle: {
        width: '100%',
        height: 300,
      },
      titleText:{
        fontSize:18,
        color:colors.grey2,
        padding:10,
        textAlign:'center',
        fontWeight:'bold'
    },
    text3:{
        fontSize:18,
        fontWeight:'800',
        color:colors.cardbackground,
        textTransform:'uppercase',
        textAlign:'center',
        letterSpacing:1
      },
      btnView:{
        padding:8,
        marginTop:3,
        backgroundColor:'#50C878',
        borderRadius:10,
        paddingHorizontal:10,
        alignSelf:'center'
    }
})