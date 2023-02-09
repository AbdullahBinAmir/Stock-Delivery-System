import {View, Text, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../global/Styles';
import {TextInput} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
//import { useDispatch } from 'react-redux';
//import { SaveStock } from '../../features/product/AddProductSlice';
import {useAddVendorStockMutation} from '../../features/api/vendor/VendorProductsAPISlice';
import {TouchableOpacity} from 'react-native-gesture-handler';

const AddNewStockScreen = ({route}) => {
  // const dispatch=useDispatch()
  const {pid} = route.params;
  const [qty, setQty] = useState();
  const [mfgDate, setMfgDate] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [addVendorStock, result] = useAddVendorStockMutation();

  const sendStock = async () => {
    data = {
      no_of_cartons: parseInt(qty),
      mfg_date: mfgDate,
      expiry_date: expiryDate,
      vendor_productid: parseInt(pid),
    };
    console.log(data);
    //dispatch(SaveStock(JSON.stringify(data)))
    addVendorStock(data).then(
      !result.isError
        ? alert('Stock Added Successfully!')
        : alert('Error! Please try again..'),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.textBarTab}>
        <Text style={styles.textTop}>Add New Stock</Text>
      </View>
      <View style={{margin: 10}}>
        <TextInput
          mode="outlined"
          style={styles.textInput}
          label="Number of Cartons"
          keyboardType="number-pad"
          value={qty}
          onChangeText={t => setQty(t)}
        />
        {/*       <TextInput
    mode="outlined"
    style={styles.textInput}
    label="Enter Product Name"
    value={name}
    onChangeText={t => setName(t)}
  /> */}
        <View>
          <Text style={styles.selectedText}>
            {mfgDate ? 'Selected Manuacture Date: ' + mfgDate : ''}
          </Text>
        </View>
        <TouchableOpacity style={styles.viewbtn} onPress={() => setOpen(true)}>
          <Icon name="calendar" color={colors.buttons} size={25} />
          <Text style={styles.modalBtn}>Set Manufacture Date</Text>
          <DateTimePickerModal
            isVisible={open}
            mode="date"
            onConfirm={date => {
              console.log('MFG date is', date.toLocaleDateString());
              setMfgDate(date.toLocaleDateString());
              setOpen(false);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.selectedText}>
            {expiryDate ? 'Selected Manuacture Date: ' + expiryDate : ''}
          </Text>
        </View>
        <TouchableOpacity style={styles.viewbtn} onPress={() => setOpen1(true)}>
          <Icon name="calendar" color={colors.buttons} size={25} />
          <Text style={styles.modalBtn}>Set Expiry Date</Text>
          <DateTimePickerModal
            isVisible={open1}
            mode="date"
            onConfirm={date => {
              setExpiryDate(date.toLocaleDateString());
              console.log(date.toLocaleDateString());
              setOpen1(false);
            }}
            onCancel={() => {
              setOpen1(false);
            }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={sendStock}
        style={{
          backgroundColor: colors.buttons,
          padding: 1,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 25,
          paddingVertical: 9,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.cardbackground,
          }}>
          Save Stock
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNewStockScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cardbackground,
  },
  textTop: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.cardbackground,
  },
  textBarTab: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    height: 70,
    backgroundColor: colors.buttons,
    padding: 10,
  },
  textInput: {
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 5,
    color: colors.buttons,
  },
  modalBtn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.buttons,
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  viewbtn: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    padding: 5,
    borderColor: colors.buttons,
  },
  selectedText: {
    margin: 5,
    fontSize: 16,
    color: colors.lightGreen,
    textAlign: 'center',
  },
});
