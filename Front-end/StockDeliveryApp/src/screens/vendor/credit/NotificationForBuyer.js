import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions} from 'react-native'
import React from 'react'
import { colors } from '../../../global/Styles';
import Icon from 'react-native-vector-icons/Entypo';
import { useDeleteNotificationMutation } from '../../../features/api/vendor/NotificationAPISlice';

const NotificationForBuyer = ({route,navigation}) => {

  const [notificationType,setNotificationType] = React.useState('all')

  const [userData,setUserData] = React.useState()

  const [deleteNotification, result] = useDeleteNotificationMutation();

  const filterNotificationList = nType => {
    let nList = [];
    for (let v of route.params.data) {
      if (v.request_status.trim() == nType) {
        nList.push(v);
      }
    }
    setUserData(nList);
  };

  const filterNotificationListById = id => {
    let nList = [];
    for (let v of route.params.data) {
      if (v.id != id) {
        nList.push(v);
      }
    }
    setUserData(nList);
  };

  // const handleDelete=()=>{
  //   setUserData(route.params.data)
  //   setNotificationType('all')
  // }

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <View style={{flex: 0.2, marginLeft: 10, padding: 10}}>
          <Icon
            name="arrow-with-circle-left"
            color={colors.cardbackground}
            size={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View style={{flex: 0.8}}>
          <Text style={styles.titleText}>Buyer Notification</Text>
        </View>
      </View>

      <View style={styles.vendorHeaderTab}>
        <TouchableOpacity
          style={notificationType==='all'?{
            ...styles.vendorHeaderBtn,
            backgroundColor: colors.lightGreen
          }:styles.vendorHeaderBtn}
          onPress={() => {
            setUserData(route.params.data)
            setNotificationType('all')
          }}>
          <Text style={styles.vendorHeaderText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={notificationType==='requested'?{
            ...styles.vendorHeaderBtn,
            backgroundColor: colors.lightGreen
          }:styles.vendorHeaderBtn}
          onPress={() => {
            filterNotificationList('requested')
            setNotificationType('requested')
          }}>
          <Text style={styles.vendorHeaderText}>request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={notificationType==='approved'?{
            ...styles.vendorHeaderBtn,
            backgroundColor: colors.lightGreen,
          }:styles.vendorHeaderBtn}
          onPress={() =>{
            filterNotificationList('approved')
            setNotificationType('approved')
          }}>
          <Text style={styles.vendorHeaderText}>approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={notificationType==='declined'?{
            ...styles.vendorHeaderBtn,
            backgroundColor: colors.lightGreen,
          }:styles.vendorHeaderBtn}
          onPress={() =>{
            filterNotificationList('declined')
            setNotificationType('declined')
          }}>
          <Text style={styles.vendorHeaderText}>decline</Text>
        </TouchableOpacity>
      </View>

        <View style={{flex: 1, flexGrow: 1}}>
          <FlatList
            style={{marginTop: 10, marginBottom: 10}}
            horizontal={false}
            showsVerticalScrollIndicator={true}
            data={userData?userData:route.params.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.notificationCard}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={styles.notificationCardText}> {item.uType}  </Text>
                  <Text style={styles.notificationCardText}> {item.payment_date} </Text>
                </View>  
                <View style={{padding:5, flexDirection:'row'}}>
                  <Text style={styles.notificationCardText1}>You Have Sent PKR</Text>
                  <Text style={styles.notificationCardText2}> {item.paid_amount} ({item.request_status}) </Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center'}}>  
                  <Text style={styles.notificationCardText1}>To</Text>
                  <Text style={styles.notificationCardText2}> {item.userName} </Text>
                </View>
                {
                  item.request_status!=='requested'?(
                <TouchableOpacity style={styles.notificationCardBtn}
                onPress={() => {
                  deleteNotification({id:item.id})
                  filterNotificationListById(item.id)
                }}
                >
                  <Text style={{...styles.notificationCardText1,color:colors.cardbackground,letterSpacing:1}}>Clear</Text>
                </TouchableOpacity>):null
                }
            </View>
            )}
          />
      </View>
    </View>
  )
}

export default NotificationForBuyer

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
    width: '100%',
    height: 60,
    backgroundColor: colors.buttons,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-evenly',
    paddingHorizontal: 15,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.cardbackground,
  },
  notificationCard:{
    marginTop:5,
    borderBottomWidth:2,
    borderTopWidth:2,
    padding:10,
    justifyContent:'center',
    borderBottomColor:colors.buttons,
    borderTopColor:colors.grey3
  },
  notificationCardText:{
    fontSize:14,
    color:colors.grey2,
    letterSpacing:.5
  },
  notificationCardText1:{
    fontSize:14,
    color:colors.grey2,
    fontWeight:'bold'
  },
  notificationCardText2:{
    fontSize:16,
    color:colors.buttons,
    fontWeight:'bold'
  },
  notificationCardBtn:{
    backgroundColor:colors.lightOrange,
    paddingHorizontal:25,
    borderRadius:10,
    paddingVertical:3,
    marginTop:5,
    alignSelf:'center'
  },
  vendorHeaderTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10
  },
  vendorHeaderBtn: {
    paddingHorizontal: 10,
    backgroundColor: colors.grey2,
    borderRadius: 10,
    paddingVertical: 5,
  },
  vendorHeaderText: {
    fontSize: 16,
    color: colors.cardbackground,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
})