import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React,{useState} from 'react'
import { colors } from '../../../global/Styles'
import { imageURL } from '../../../global/API_Source_URL'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useGetOrderDetailQuery } from '../../../features/api/vendor/vendorOrdersAPISlice';
import ReturnInfoViewScreen from './ReturnInfoViewScreen';

const OrderedProductScreen = ({navigation,route}) => {

    const [loadOptions,setLoadOptions] = useState('request_view')

    const {isLoading, data = []} = useGetOrderDetailQuery({
        id: route.params.oid,
      });

    if (isLoading) {
        return (
          <View style={styles.loader}>
            <ActivityIndicator visible={true} />
          </View>
        );
    }
  return (
    <View style={styles.container}>
        <View style={styles.titleBarView}>
            <Icon
                name="arrow-circle-left"
                color={colors.cardbackground}
                size={30}
                onPress={() => {
                navigation.goBack()
                }}
            />
            <Text style={styles.titleBarText}>Ordrered Products</Text>
        </View>
        <View style={styles.vendorHeaderTab}>
        <TouchableOpacity
          style={loadOptions==='request_view'?{
            ...styles.vendorHeaderBtn,
            backgroundColor: colors.buttons
          }:styles.vendorHeaderBtn}
          onPress={() => {
            setLoadOptions('request_view')
          }}>
          <Text style={styles.vendorHeaderText}>View Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={loadOptions==='oproducts_view'?{
            ...styles.vendorHeaderBtn,
            backgroundColor: colors.buttons
          }:styles.vendorHeaderBtn}
          onPress={() => {
            setLoadOptions('oproducts_view')
          }}>
          <Text style={styles.vendorHeaderText}>Make Request</Text>
        </TouchableOpacity>
      </View>
{
    loadOptions=='request_view'?(
      <ReturnInfoViewScreen />
    ) :
      (  <View style={{flex:1,flexGrow:1}}>
        <FlatList
            style={{marginTop: 5, marginBottom: 10}}
            horizontal={false}
            showsVerticalScrollIndicator={true}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
            <View style={styles.boxStyle}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View>
                        <Text style={styles.text1}>{item.pname}</Text>
                        <Text style={styles.text2}>PKR {item.price}</Text>
                        <Text style={styles.text2}>{route.params.uname}</Text>
                        <Text style={styles.text2}>Qty Ordered: {item.qtyOdered} Cartons</Text>
                    </View>
                    <Image
                    source={{uri:imageURL+item.pimage}}  
                    style={styles.imageStyle}
                />
                </View>
                <View style={{borderTopWidth:1,marginTop:5,borderColor:colors.grey3}}>
                    <TouchableOpacity style={styles.btnView}
                        onPress={()=>navigation.navigate('ReturnReasonScreen',
                        {data:route.params,price:item.price,qtyOdered:item.qtyOdered,pid:item.pid})}
                    >
                        <Text style={styles.text3}>Return Product</Text>
                    </TouchableOpacity>
                </View>
            </View>
            )}
        />  
        </View>  )
      }

    </View>
  )
}

export default OrderedProductScreen

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
        backgroundColor: colors.grey5,
      },
      titleBarText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.cardbackground,
        letterSpacing:1
      },
      titleBarView: {
        width: '100%',
        backgroundColor: colors.buttons,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding:10
      },
      imageStyle: {
        width: 100,
        height: 100,
        borderRadius: 10,
        borderColor: colors.grey5,
        borderWidth: 2,
        marginRight:10
      },
      text1:{
        top:7,
        fontSize:18,
        left:5,
        marginBottom:5,
        fontWeight:'700',
        color:colors.grey2,
        letterSpacing:1
      },
      text2:{
        fontSize:16,
        fontWeight:'600',
        color:colors.grey3,
        left:5
      },
      text3:{
        fontSize:16,
        fontWeight:'700',
        color:colors.cardbackground,
        textTransform:'uppercase'
      },
      boxStyle:{
        backgroundColor:colors.cardbackground,
        margin:10,
        padding:5,
        borderRadius:10
      },
      btnView:{
        alignSelf:'center',
        padding:5,
        marginTop:3,
        backgroundColor:'#DC143C',
        borderRadius:10,
        paddingHorizontal:10
    },
    vendorHeaderTab: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      margin:10
    },
    vendorHeaderBtn: {
      paddingHorizontal: 7,
      backgroundColor: colors.grey2,
      borderRadius: 5,
      paddingVertical: 4,
    },
    vendorHeaderText: {
      fontSize: 16,
      color: colors.cardbackground,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
})