import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions} from 'react-native'
import React from 'react'
import { colors } from '../../../global/Styles';
import Icon from 'react-native-vector-icons/Entypo';
import { useUpdateNotificationMutation } from '../../../features/api/vendor/NotificationAPISlice';

const NotificationForSeller = ({route,navigation}) => {

  const [updateNotification, result] = useUpdateNotificationMutation();
  const [userData,setUserData] = React.useState(route.params.data)

  const filterNotificationListById = id => {
    let nList = [];
    for (let v of route.params.data) {
      if (v.id != id) {
        nList.push(v);
      }
    }
    setUserData(nList);
  };

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
          <Text style={styles.titleText}>Seller Notification</Text>
        </View>
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
                <View style={{paddingVertical:5}}>
                  <Text style={styles.notificationCardText1}>You Have Recieved PKR {item.paid_amount} </Text>
                  <Text style={{...styles.notificationCardText1,textAlign:'center'}}>From {item.userName} </Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                  <TouchableOpacity style={styles.notificationCardBtn}
                    onPress={() => {
                      updateNotification({id:item.id,status:'approved'})
                      filterNotificationListById(item.id)
                    }}
                  >
                    <Text style={{...styles.notificationCardText1,color:colors.cardbackground,letterSpacing:1}}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{...styles.notificationCardBtn,backgroundColor:colors.lightOrange}}
                    onPress={() => {
                      updateNotification({id:item.id,status:'declined'})
                        filterNotificationListById(item.id)
                    }}
                  >
                    <Text style={{...styles.notificationCardText1,color:colors.cardbackground,letterSpacing:1}}>Decline</Text>
                  </TouchableOpacity>
                </View>
            </View>
            )}
          />
      </View>
    </View>
  )
}

export default NotificationForSeller

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
    borderBottomWidth:2,
    padding:10,
    justifyContent:'center',
    borderBottomColor:colors.grey3,
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
    backgroundColor:colors.lightGreen,
    paddingHorizontal:20,
    borderRadius:10,
    paddingVertical:5,
    marginTop:5
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