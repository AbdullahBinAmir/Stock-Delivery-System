import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, FlatList, Modal } from 'react-native'
import React,{useState} from 'react'
import { colors } from '../../../global/Styles'
import Header from '../../../components/Header'
import { useSelector } from 'react-redux'
import { useGetReasonForBuyerQuery, useGetReasonForSellerQuery, useUpdateReturnReasonMutation } from '../../../features/api/distributor/ReturnProductAPI'
import { imageURL } from '../../../global/API_Source_URL'
import { TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Entypo';

const ReturnInfoViewScreen = ({navigation}) => {

    const {userInfo} = useSelector(state => state.user);
    const {isLoading,data=[],refetch} = userInfo.roles=='Vendor'? useGetReasonForSellerQuery({
        uid:userInfo.id
    }):useGetReasonForBuyerQuery({
      uid:userInfo.id
  })

    const [updateReturnStatus,result] = useUpdateReturnReasonMutation()
    const [openModal, setOpenModal] = useState(false);
    const [detail, setDetail] = useState('');
    const [notificationType,setNotificationType] = useState('all')
    const [userData,setUserData] = useState()

    const handleUpdate=(rid,r_status)=>{
      updateReturnStatus({
        rid:rid,
        status:r_status
      }).then(
        ()=>{
          if(!result.isError){
            setUserData()
            setNotificationType('all')
            refetch()
            alert('Status Changed Successfully!')
          }
          else{
            alert('Request Failed!')
          }
        }
      )
    }

    const filterReturnList = nType => {
      let nList = [];
      for (let v of data) {
        if (v.status.trim() == nType) {
          nList.push(v);
        }
      }
      setUserData(nList);
    };

    const ReturnDetailModal = () => {
        return (
          <Modal animationType={'fade'} transparent={false} visible={openModal}>
            <View
              style={styles.modalView}>
              <View
                style={styles.modalMainView}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly',}}>
                    <Text style={styles.modalTitle}>Return Reason In Detail</Text>
                    <Icon
                    name="cross"
                    color={colors.cardbackground}
                    size={35}
                    style={{...styles.modalBtn,backgroundColor:'red'}}
                    onPress={()=>setOpenModal(false)}
                    />
                </View>
                <View style={{margin: 10}}>
                    <TextInput
                        style={{
                        paddingVertical: 25,
                        marginTop:5,
                        marginBottom:5,
                        color:colors.grey2
                        }}
                        label="Details"                   
                        placeholderTextColor={colors.grey2}
                        value={detail}
                        multiline={true}
                        scrollEnabled={true}
                    />
                </View>
              </View>
            </View>
          </Modal>
        );
      };

    console.log(data)

    if (isLoading) {
        return (
          <View style={styles.loader}>
            <ActivityIndicator visible={true} />
          </View>
        );
    }

  return (
    <View style={styles.container}>
    {
      userInfo.roles=='Vendor'?(
      <Header navigate={navigation} title={'Return Dashborad'} />):null
    }
      <View style={styles.vendorHeaderTab}>
        <TouchableOpacity
          style={notificationType==='all'?{
            ...styles.vendorHeaderBtn,
            backgroundColor: colors.buttons
          }:styles.vendorHeaderBtn}
          onPress={() => {
            setUserData(data)
            setNotificationType('all')
          }}>
          <Text style={styles.vendorHeaderText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={notificationType==='requested'?{
            ...styles.vendorHeaderBtn,
            backgroundColor: colors.buttons
          }:styles.vendorHeaderBtn}
          onPress={() => {
            filterReturnList('requested')
            setNotificationType('requested')
          }}>
          <Text style={styles.vendorHeaderText}>Requested</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={notificationType==='approved'?{
            ...styles.vendorHeaderBtn,
            backgroundColor: colors.buttons,
          }:styles.vendorHeaderBtn}
          onPress={() =>{
            filterReturnList('accepted')
            setNotificationType('approved')
          }}>
          <Text style={styles.vendorHeaderText}>Approved</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={notificationType==='declined'?{
            ...styles.vendorHeaderBtn,
            backgroundColor: colors.buttons,
          }:styles.vendorHeaderBtn}
          onPress={() =>{
            filterReturnList('rejected')
            setNotificationType('declined')
          }}>
          <Text style={styles.vendorHeaderText}>Declined</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex:1,flexGrow:1}}>
        <FlatList
            style={{marginTop: 10, marginBottom: 10}}
            horizontal={false}
            showsVerticalScrollIndicator={true} 
            data={userData?userData:data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
        <TouchableOpacity style={styles.requestView} onPress={()=>{
            setDetail(item.detail)
            setOpenModal(true)
            }}>
            <View style={styles.requestInnerView}>
                <Text style={styles.text1}>Dispute No: 0{item.id}</Text>
                <Text style={
                {...styles.text2,color:colors.cardbackground,
                    backgroundColor:item.status=='requested'?
                    '#1b5583':item.status=='accepted'?'#1ADD5B':'#DD371A'}
                }>{item.status}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={{uri: imageURL+item.pimage}} 
                    style={styles.imageStyle} />
                <View style={{marginVertical:5,marginHorizontal:10}}>
                    <Text style={styles.text3}>Order NO: 0{item.order_id}</Text>
                    <Text style={styles.text3}>Product Name: {item.pname}</Text>
                    <Text style={styles.text3}>Qauntity Requested: {item.qty} Cartons</Text>
{userInfo.roles=='Vendor'?(
                    <Text style={styles.text3}>Applied By: {item.uname}</Text>):null
                    }
                </View>
            </View>
            {
              item.status==='requested' && userInfo.roles==='Vendor'?(
            <View style={styles.bottomView}>
                <TouchableOpacity style={styles.btnView}
                 onPress={()=>handleUpdate(item.id,'accepted')}
                >
                    <Text style={styles.btnText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.btnView,backgroundColor:colors.lightOrange}}
                  onPress={()=>handleUpdate(item.id,'rejected')}
                >
                    <Text style={styles.btnText}>Reject</Text>
                </TouchableOpacity>
            </View>):null
            }
            <ReturnDetailModal />
        </TouchableOpacity>
        )}
        />
       </View> 
    </View>
  )
}

export default ReturnInfoViewScreen

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
    requestView:{
        padding:5,
        borderWidth:2,
        margin:7,
        borderColor:colors.grey5,
        borderRadius:10
    },
    requestInnerView:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:5
    },
    text1:{
        fontSize:16,
        fontWeight:'700',
        textTransform:'uppercase',
        letterSpacing:.5,
        color:'#DD371A'
    },
    text2:{
        fontSize:14,
        fontWeight:'500',
        paddingVertical:1,
        paddingHorizontal:5,
        borderRadius:2,
        letterSpacing:1
    },
    imageStyle:{
        height:60,
        width:60,
        marginHorizontal:5,
        marginTop:6
    },
    text3:{
        fontSize:14,
        color:colors.grey2,
        textTransform:'capitalize'
    },
    bottomView:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    btnView:{
        backgroundColor:colors.lightGreen,
        paddingVertical:1,
        marginTop:5,
        borderRadius:5,
        paddingHorizontal:7
    },
    btnText:{
        fontSize:16,
        color:colors.cardbackground,
        fontWeight:'bold',
        letterSpacing:.5,
        textTransform:'uppercase'
    },
    modalView:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.grey3,
      },
      modalMainView:{
        height: 250,
        width: 300,
        padding: 40,
        backgroundColor: colors.cardbackground,
        borderWidth: 2,
        borderColor: colors.grey4,
      },
      modalTitle:{
        fontSize: 18,
        color: colors.grey2,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalBtn:{
        backgroundColor: colors.buttons,
        borderRadius: 5,
        bottom:35,
        left:25
      },
      vendorHeaderTab: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10
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