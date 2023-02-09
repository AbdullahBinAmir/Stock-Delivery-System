import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Button,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import avatarImage from '../assets/productAvatar.png';
import DropDownPicker from 'react-native-dropdown-picker';
import {TextInput} from 'react-native-paper';
import {colors} from '../global/Styles';
import {useDispatch, useSelector} from 'react-redux';
//import { AddProduct } from '../features/product/AddProductSlice';
//import { UpdateProduct } from '../features/product/AddProductSlice';
import {imageURL} from '../global/API_Source_URL';
import {
  useAddVendorProductMutation,
  useUpdateVendorProductMutation,
} from '../features/api/vendor/VendorProductsAPISlice';

export default function ProductsForm(props) {
  const [addVendorProduct, addResult] = useAddVendorProductMutation();
  const [updateVendorProduct, result] = useUpdateVendorProductMutation();
  const [name, setName] = useState('');
  const [check, setCheck] = useState(false);
  const [quantityPerCarton, setQuantityPerCarton] = useState('');
  const [pricePerCarton, setPricePerCarton] = useState('');
  const [thresholdToBuy, setThresholdToBuy] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imgsrc, setImagesrc] = useState(
    Image.resolveAssetSource(avatarImage).uri,
  );

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Drinks', value: 'Drinks'},
    {label: 'Snacks', value: 'Snacks'},
    {label: 'Dairy', value: 'Dairy'},
    {label: 'Frozen Foods', value: 'Frozen'},
    {label: 'Sweet', value: 'Sweet'},
    {label: 'Daily Use', value: 'Daily Use'},
    {label: 'Baby food', value: 'Baby food'},
  ]);

  useEffect(() => {
    if (props.data && !check) {
      setImagesrc(props.data.image);
      setName(props.data.name);
      setQuantityPerCarton(props.data.qty_in_carton.toString());
      setPricePerCarton(props.data.saleprice_per_carton.toString());
      setThresholdToBuy(props.data.threshold.toString());
      setProductDescription(props.data.description);
      setValue(props.data.category);
      setCheck(true);
    }
  });

  const pid = props.data ? props.data.id : 0;
  // const dispatch=useDispatch()
  const {userInfo} = useSelector(state => state.user);

  const SaveProduct = async () => {
    let data = new FormData();
    data.append('file', image);
    data.append('name', name);
    data.append('cName', userInfo.name);
    data.append('desp', productDescription);
    data.append('qtyCarton', quantityPerCarton);
    data.append('spriceCarton', pricePerCarton);
    data.append('cat', value);
    data.append('vid', userInfo.id);
    data.append('threshold', thresholdToBuy);
    //console.log(data1)
    //dispatch(AddProduct(data))
    addVendorProduct(data).then(
      !addResult.isError
        ? alert('Added Successfully..')
        : alert('Retry! Error occured..'),
    );
  };

  const changeProductData = async () => {
    let data = new FormData();
    data.append('file', image);
    data.append('pid', pid);
    data.append('name', name);
    data.append('cName', userInfo.name);
    data.append('desp', productDescription);
    data.append('qtyCarton', quantityPerCarton);
    data.append('spriceCarton', pricePerCarton);
    data.append('cat', value);
    data.append('vid', userInfo.id);
    data.append('threshold', thresholdToBuy);
    //console.log(data1)
    //dispatch(UpdateProduct(data))
    updateVendorProduct(data).then(
      !result.isError
        ? alert('Updated Successfully..')
        : alert('Retry! Error occured..'),
    );
  };

  const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    },
  };

  //const {data}=route.params;
  // console.log(JSON.stringify(data))

  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    setImagesrc(result.assets[0].uri);
    setImage({
      uri: result.assets[0].uri,
      type: result.assets[0].type,
      name: result.assets[0].fileName,
    });
    console.log(result);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleBar}>
            <Text style={styles.titleBarText}>
              {props.data ? 'Upadate Products' : 'Add New Product'}
            </Text>
          </View>
          <View
            style={{
              margin: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: pid===0?imgsrc:`${imageURL}${imgsrc}`}}
              style={{width: 100, height: 100}}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Button title="upload image" onPress={openGallery} />
          </View>
          <View style={styles.textInputView}>
            <TextInput
              mode="outlined"
              style={styles.textInput}
              label="Enter Product Name"
              value={name}
              onChangeText={t => setName(t)}
            />
            <TextInput
              mode="outlined"
              style={styles.textInput}
              label="Quantity Per Carton"
              keyboardType="number-pad"
              value={quantityPerCarton}
              onChangeText={t => setQuantityPerCarton(t)}
            />
            <TextInput
              mode="outlined"
              style={styles.textInput}
              label="Sale Price Per Carton (PKR)"
              keyboardType="number-pad"
              value={pricePerCarton}
              onChangeText={t => setPricePerCarton(t)}
            />
            <TextInput
              mode="outlined"
              style={styles.textInput}
              label="Enter Threshold"
              keyboardType="number-pad"
              value={thresholdToBuy}
              onChangeText={t => setThresholdToBuy(t)}
            />
            <View style={styles.dropdown}>
              <Text style={styles.titleText}>
                Please select product category
              </Text>
              <DropDownPicker
                style={{
                  borderColor: colors.buttons,
                  padding: 10,
                  marginTop: open ? 140 : null,
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
              style={{
                ...styles.textInput,
                paddingVertical: 20,
                borderRadius: 5,
              }}
              label="Enter Product Description"
              placeholderTextColor={colors.grey2}
              value={productDescription}
              onChangeText={t => setProductDescription(t)}
              multiline={true}
            />
          </View>
          {props.data ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 15,
                marginVertical: 5,
                marginBottom: 25,
              }}>
              <TouchableOpacity
                style={styles.sButton}
                onPress={changeProductData}>
                <Text style={styles.btnText}>Update Product</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 15,
                marginVertical: 5,
                marginBottom: 25,
              }}>
              <TouchableOpacity style={styles.sButton} onPress={SaveProduct}>
                <Text style={styles.btnText}>Add Product</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cardbackground,
  },
  titleBar: {
    width: '100%',
    height: 70,
    backgroundColor: colors.buttons,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.cardbackground,
  },
  textInputView: {
    margin: 10,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 16,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  dropdown: {
    padding: 10,
    margin: 10,
    borderRadius: 25,
    color: 'black',
    fontSize: 16,
  },
  sButton: {
    width: '100%',
    height: 40,
    backgroundColor: colors.buttons,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.cardbackground,
  },
  signin: {
    alignItems: 'flex-end',
    margin: 10,
  },
  signinText: {
    textDecorationLine: 'underline',
    color: colors.grey1,
    fontSize: 16,
  },
  titleText: {
    fontSize: 16,
    color: colors.buttons,
    padding: 10,
  },
});
