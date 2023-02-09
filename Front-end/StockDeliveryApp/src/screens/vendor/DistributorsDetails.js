import React, {useState} from 'react';
import {Text, StyleSheet, View, ScrollView, Image, ActivityIndicator} from 'react-native';
import {colors} from '../../global/Styles';
import {TextInput, Button} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { imageURL } from '../../global/API_Source_URL';
import { useGetUniqueBuyerForProviderQuery, useUpdateShopkeeperClientsMutation } from '../../features/api/shopkeeper/ShopkeeperClientsAPI';

export default function DistributorsDetails({route, navigation}) {
  const [amount, setAmount] = useState();

  const {isLoading,data=[],refetch} = useGetUniqueBuyerForProviderQuery({
    id:route.params.id
  })

  const [updateShopkeeperClients,uscResult] = useUpdateShopkeeperClientsMutation()

  console.log(data)

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(data.status);
  const [items, setItems] = useState([
    {label: 'Pending', value: 'Pending'},
    {label: 'Allow', value: 'Allow'},
    {label: 'Block', value: 'Block'},
  ]);

  const updateStatus=()=>{
      updateShopkeeperClients({
        sid:data.sellerId,
        bid:data.buyerId,
        security_amount:amount,
        status:value
      }).then(
        ()=>{
          alert('Updated Successfully!')
          refetch()
          setAmount(0)
        }
      )
  }

  if ( isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator visible={true} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleBar}>
        <Text style={styles.titleBarText}>Distributor Details</Text>
      </View>
      <View style={styles.view2}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={{uri: imageURL+data.uimage}}
            style={{
              width: 160,
              height: 160,
              borderRadius: 80,
              borderColor: colors.grey2,
              borderWidth: 1,
              marginRight: 5,
            }}
          />
        </View>
        <View>
          <Text style={styles.text1}>Name: {data.uname}</Text>
          <Text style={styles.text1}>Eamil: {data.uemail}</Text>
          <Text style={styles.text1}>Mobile No: {data.umobileno}</Text>
          <Text style={styles.text1}>Amount Paid: {data.securityAmountPaid}</Text>
          <Text style={styles.text1}>
            Current Status: {data.status}
          </Text>
          <View style={styles.dropdown}>
            <Text style={styles.titleText}>Update Status</Text>
            <DropDownPicker
              style={{
                borderColor: colors.buttons,
                padding: 10,
                marginTop: open ? 80 : null,
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
          <TextInput
            style={styles.textInput}
            label="Enter Security Amount (PKR)"
            keyboardType="number-pad"
            mode="outlined"
            value={amount}
            onChangeText={t => setAmount(t)}
          />
        </View>
      </View>
      <Button
        style={{margin: 20, borderRadius: 15, padding: 5, marginBottom: 50}}
        icon="update"
        mode="contained"
        labelStyle={{color: colors.cardbackground, fontSize: 18}}
        onPress={updateStatus}>
        Update
      </Button>
    </ScrollView>
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
  titleBar: {
    width: '100%',
    height: 90,
    backgroundColor: colors.buttons,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.cardbackground,
  },
  view2: {
    margin: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderRadius: 10,
    top: 10,
    borderColor: '#808080',
  },
  text1: {
    fontSize: 18,
    padding: 5,
    color: colors.grey2,
    marginVertical: 10,
    borderRadius: 10,
  },
  textInput: {
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  dropdown: {
    padding: 10,
    margin: 10,
    borderRadius: 25,
    color: colors.grey2,
    fontSize: 18,
  },
  titleText: {
    fontSize: 16,
    color: colors.buttons,
    padding: 10,
  },
});
