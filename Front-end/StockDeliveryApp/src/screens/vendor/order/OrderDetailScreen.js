import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import OrderInfoCard from '../../../components/OrderInfoCard';
import {
  useGetDistributorOrderDetailQuery,
  useGetOrderDetailQuery,
  useGetUserRatingQuery,
  useSaveUserRatingMutation,
  useUpdateOrderStatusMutation,
  useUpdateOrderTypeMutation,
} from '../../../features/api/vendor/vendorOrdersAPISlice';
import {colors} from '../../../global/Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import { Rating } from 'react-native-ratings';
import {AirbnbRating} from 'react-native-ratings';

export default function OrderDetailsScreen({navigation,route}) {

  const UserOrderInfoCard = ({uid}) => {
    const rating = useGetUserRatingQuery({
      id: uid,
    });
    const count = rating.data ? rating.data : 0;
    return (
      <AirbnbRating
        count={count}
        size={25}
        showRating={false}
        defaultRating={5}
        starContainerStyle={{margin: 5}}
        isDisabled={true}
      />
    );
  };

  const {userInfo} = useSelector(state => state.user);
  const {isLoading, data = []} = userInfo.roles=='ShopKeeper' && route.params.odata.utype=='Distributor'?
  useGetDistributorOrderDetailQuery({
    id: route.params.odata.oid,
  }):  
    useGetOrderDetailQuery({
      id: route.params.odata.oid,
    });
  const {odata, type} = route.params;

  console.log(JSON.stringify(data));

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('pending');
  const [items, setItems] = useState([
    {label: 'Pending', value: 'pending'},
    {label: 'Active', value: 'active'},
    {label: 'Packed', value: 'packed'},
    {label: 'OnTheWay', value: 'ontheway'},
    {label: 'Delivered', value: 'delivered'},
    {label: 'Cancelled', value: 'cancelled'},
  ]);

  //const [refesh, setrefresh] = useState();
  const [updateOrderType, result] = useUpdateOrderStatusMutation();
  const [updatePaymentType, result1] = useUpdateOrderTypeMutation();
  const [saveUserRating, result2] = useSaveUserRatingMutation();

  const [selectStar, setSelectStar] = useState(1);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator visible={true} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {/*         <TouchableOpacity
          style={styles.refreshBtn}
          onPress={() => setrefresh('')}>
          <Icon name="sync" size={30} color={colors.buttons} />
        </TouchableOpacity> */}
        <View style={styles.titleBar}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: colors.cardbackground,
            }}>
            User Details
          </Text>
        </View>
        <View style={styles.orderInfoCard}>
          <Text style={styles.text2}>Name: {odata.uname} </Text>
          <Text style={styles.text2}>Email: {odata.uemail}</Text>
          <Text style={styles.text2}>Mobile: {odata.umobileno}</Text>
          <Text style={styles.text2}>User Type: {odata.utype}</Text>
          <Text style={styles.text2}>Amount Remaining: PKR {odata.total_credit}</Text>
          <UserOrderInfoCard uid={odata.uid} />
          <View style={{top:5}}>
            <Text style={{...styles.text2,textAlign:'center',fontSize:18,color:colors.buttons,fontWeight:'bold',textDecorationLine:'underline'}}>Order Info</Text>
            <Text style={styles.text2}>Payment Type: {odata.orderType}</Text>
            <Text style={styles.text2}>Total Bill: PKR{odata.totalAmount}</Text>
          </View>
        </View>
        <View style={styles.textBarTab}>
          <Text style={styles.textTop}> Products Odered </Text>
        </View>
        <View style={{flex: 1, flexGrow: 1}}>
          <FlatList
            style={{marginTop: 10, marginBottom: 10}}
            horizontal={true}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View style={{marginRight: 10}}>
                <OrderInfoCard item={item} />
              </View>
            )}
          />
        </View>
        {type === 'recieved' && odata.orderStatus!=='delivered' && odata.orderStatus !== 'cancelled'  ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={styles.dropdown}>
              <DropDownPicker
                style={{
                  borderColor: colors.buttons,
                  padding: 10,
                  marginTop: open ? 160 : null,
                }}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                listMode="SCROLLVIEW"
                dropDownDirection="TOP"
              />
            </View>
            <Icon
              name="paper-plane"
              size={35}
              color={colors.buttons}
              style={{
                borderWidth: 2,
                borderColor: colors.buttons,
                padding: 5,
                borderRadius: 10,
              }}
              onPress={() => {
                Alert.alert(
                  'Confirmation',
                  'Are you sure to continue? ',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('canel pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        updateOrderType({status: value, oid: odata.oid}).then(
                          !result.isError
                            ? alert(
                                'Updated Successfully.GoBack to see changes',
                              )
                            : alert('Error! Please try again..'),
                        );
                      },
                    },
                  ],
                );
              }}
            />
          </View>
        ) : null}
        {
          /* type === 'recieved' && odata.orderStatus === 'delivered' ? (
          <View style={{margin: 15}}>
            <Button
              title="Change Payment Type To Credit"
              onPress={() => {
                updatePaymentType({oid: odata.oid}).then(
                  !result1.isError
                    ? alert('Updated Successfully.GoBack to see changes')
                    : alert('Error! Please try again..'),
                );
              }}
            />
          </View>
        ) : null */
      }
        {odata.orderStatus === 'delivered' ? (
          <View style={{margin: 10}}>
            <Text
              style={{fontSize: 18, color: colors.buttons, fontWeight: 'bold',textAlign:'center'}}>
              Rate Your Experience
            </Text>
            <View style={{margin:10}}>
            <Rating
            count={5}
            size={40}
            showRating={false}
            defaultRating={5}
            style={{margin: 5}}
            onFinishRating={(e) => setSelectStar(e) }
          />
            </View>
            <Button
            title="Save Your Experience"
            onPress={() => {
              Alert.alert(
                'Confirmation',
                `Are You Sure Continue? Your Selected ${selectStar} Stars`,
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('canel pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      saveUserRating({no_of_stars: selectStar,
                        reviewer_id:userInfo.id, reciever_id:odata.uid ,oid: odata.oid}).then(
                        !result2.isError
                          ? alert(
                              'Saved Successfully.GoBack to see changes',
                            )
                          : alert('Error! Please try again..'),
                      );
                    },
                  },
                ],
              );
            }}
          />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
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
  container: {
    flex: 1,
    backgroundColor: colors.cardbackground,
  },
  textTop: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.buttons,
    textAlign: 'center',
    textDecorationLine:'underline'
  },
  textBarTab: {
    marginTop: 10,
    marginBottom: 5,
    padding: 5,
    backgroundColor: colors.cardbackground,
  },
  titleBar: {
    width: '100%',
    padding:5,
    backgroundColor: colors.buttons,
    alignItems: 'center',
    justifyContent: 'center',
    top: 3,
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: colors.grey1,
    borderWidth: 1,
    marginRight: 5,
  },
  boxStyle: {
    flexDirection: 'row',
    margin: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    left: 5,
  },
  text1: {
    fontSize: 14,
    color: colors.grey1,
  },
  text2: {
    fontSize: 16,
    color: colors.grey1,
    padding: 5,
  },
  dropdown: {
    padding: 10,
    margin: 10,
    borderRadius: 25,
    color: colors.grey2,
    fontSize: 18,
    width: '70%',
  },
  refreshBtn: {
    alignSelf: 'center',
    margin: 5,
    borderWidth: 2,
    borderColor: colors.buttons,
    borderRadius: 10,
    padding: 5,
  },
  orderInfoCard: {
    margin: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#F5F5F5',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
});
