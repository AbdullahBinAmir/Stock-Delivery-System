import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {colors} from '../../../global/Styles';
import {useSelector} from 'react-redux';
import {
  useGetCreditOrderInfoForBuyerQuery,
  useGetCreditOrderInfoForSellerQuery,
} from '../../../features/api/vendor/UserCreditAPI';
import {TextInput} from 'react-native-paper';
import { useAddNotificationMutation } from '../../../features/api/vendor/NotificationAPISlice';

const CreditOrdersScreen = ({route, navigation}) => {
  const {userInfo} = useSelector(state => state.user);
  const {uid, userType, totalCredit, crId, amountPaid} = route.params;
  const {isLoading, data = []} =
    userInfo.roles === 'Vendor' ||
    (userInfo.roles === 'Distributor' && userType === 'ShopKeeper')
      ? useGetCreditOrderInfoForSellerQuery({
          uid: userInfo.id,
          vid:uid
        })
      : useGetCreditOrderInfoForBuyerQuery({
          uid: userInfo.id,
          vid:uid
        });

        console.log(data)

  const [openModal, setOpenModal] = useState(false);
  
  const AddPaymentsModal = ({crId}) => {
    const [amount, setAmount] = useState();
    const [addUserPayment, result] = useAddNotificationMutation();
    return (
      <Modal animationType={'fade'} transparent={false} visible={openModal}>
        <View
          style={styles.modalView}>
          <View
            style={styles.modalMainView}>
            <View
              style={{borderBottomColor: colors.buttons, borderBottomWidth: 5}}>
              <Text
                style={styles.modalTitle}>
                Add Order Payment
              </Text>
            </View>
            <View style={{margin: 10}}>
              <TextInput
                style={{fontSize: 16}}
                label="Enter Amount (PKR)"
                keyboardType="number-pad"
                mode="outlined"
                value={amount}
                onChangeText={t => setAmount(t)}
              />
            </View>
            <View style={{margin: 10, flexDirection: 'row', justifyContent: 'space-evenly',}}>
              <Icon
                name="check"
                color={colors.cardbackground}
                size={30}
                style={{...styles.modalBtn,backgroundColor:colors.lightGreen}}
                onPress={() => {
                  addUserPayment({crId: crId, amountpaid: amount, bid:userInfo.id, sid:uid}).then(
                    !result.isError
                      ? alert('Payment Request Has Been Sent!')
                      : alert('Error! Please try again..'),
                  );
                }}
              />
              <Icon
                name="cross"
                color={colors.cardbackground}
                size={35}
                style={{...styles.modalBtn,backgroundColor:colors.lightOrange}}
                onPress={()=>setOpenModal(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator visible={true} />
      </View>
    );
  } else if (data) {
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
            <Text style={styles.titleText}>User Orders</Text>
          </View>
        </View>
        <View>
            <View style={{flexDirection: 'row',justifyContent: 'space-around'}}>
                  {userInfo.roles === 'Vendor' ||  (userInfo.roles === 'Distributor' && userType === 'ShopKeeper')?                
                    null:(<View>
                      <TouchableOpacity
                        style={ totalCredit !== 0 ?{
                          ...styles.cardBtn, backgroundColor: colors.lightGreen,}:
                        {
                          ...styles.cardBtn,backgroundColor: colors.grey3,
                        }}
                        onPress={ totalCredit !== 0 ?() => setOpenModal(true)
                         : ()=>alert('Already Paid')}>
                        <Text style={styles.cardBtnText}>Pay Bill</Text>
                      </TouchableOpacity>
                      <AddPaymentsModal crId={crId} />
                    </View>)
                  }
                  <TouchableOpacity
                    style={styles.cardBtn}
                    onPress={() => navigation.navigate('PaymentDetailsScreen',{crId:crId,tc:totalCredit,ap:amountPaid})}>
                    <Text style={styles.cardBtnText}>View Payments</Text>
                  </TouchableOpacity>
                </View>
        </View>
        <View style={{flex: 1, flexGrow: 1}}>
          <FlatList
            style={{marginTop: 10, marginBottom: 10}}
            horizontal={false}
            showsVerticalScrollIndicator={true}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('OrderDetailsScreen',{data1:item});
                }}
              >
                <View style={styles.orderInfoView}>
                    <Text style={styles.orderInfoText}>Order Id: {item.oid}</Text>
                  <Text style={{...styles.orderInfoText, fontWeight: 'normal'}}>
                    Delivered At: {item.deliverDate}
                  </Text>
                  <Text style={{...styles.orderInfoText, fontWeight: 'normal'}}>
                    Total Amount: PKR {item.totalAmount}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }
};

export default CreditOrdersScreen;

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
  textTop:{
    fontSize:18,
    fontWeight:'bold',
    color:colors.grey2,
    padding:5
  },
  orderInfoView: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: '90%',
    alignSelf: 'center',
    borderColor: colors.grey4,
    borderRadius: 10,
  },
  orderInfoText: {
    fontSize: 18,
    color: colors.grey2,
    fontWeight: 'bold',
  },
  cardBtn: {
    backgroundColor: colors.buttons,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 5,
    top: 5,
  },
  cardBtnText: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.cardbackground,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  vendorHeaderTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
    top: 10,
  },
  vendorHeaderBtn: {
    paddingHorizontal: 10,
    backgroundColor: colors.lightOrange,
    borderRadius: 10,
    justifyContent: 'center',
    paddingVertical:5
  },
  vendorHeaderText: {
    fontSize: 18,
    color: colors.cardbackground,
    fontWeight: 'bold',
    letterSpacing: 1,
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
    borderColor: colors.buttons,
  },
  modalTitle:{
    fontSize: 20,
    color: colors.grey2,
    fontWeight: 'bold',
    bottom: 5,
    textAlign: 'center',
  },
  modalBtn:{
    backgroundColor: colors.buttons,
    padding: 7,
    borderRadius: 5,
  }
});
