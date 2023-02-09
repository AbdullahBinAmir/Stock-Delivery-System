import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React,{useState} from 'react'
import { colors } from '../../global/Styles';
import { TextInput,Button } from 'react-native-paper';
import { imageURL } from '../../global/API_Source_URL';
import { useGetDistributorProductsQuery, useUpdateDistrubutorProductInfoMutation } from '../../features/api/distributor/DistributorProductAPI';

const DistributorProductDetail = ({route, navigation}) => {
  const {refetch} = useGetDistributorProductsQuery({
    uid: route.params.id,
  })
  const {data,id} = route.params;
  const [salePrice, setSalePrice] = useState(0);
  const [updateDistributorProductInfo,result] = useUpdateDistrubutorProductInfoMutation()


  const updateDistribution=()=>{
    updateDistributorProductInfo({dpid:data.dpId,saleprice:salePrice}).then(
      ()=>{
        alert('Updated Successfully!')
        setSalePrice(0)
        //console.log(refetch)
        refetch()
        navigation.goBack()
      }
    )
  }


  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleBar}>
        <Text style={styles.titleBarText}>Distributor Product Details</Text>
      </View>
      <View style={styles.view2}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={{uri: imageURL+data.pImage}}
            style={{
              width: 140,
              height: 140,
              borderRadius: 70,
              borderColor: colors.grey2,
              borderWidth: 1,
              marginRight: 5,
            }}
          />
        </View>
        <View>
          <Text style={styles.text1}>Name: {data.pname}</Text>
          <Text style={styles.text1}>Qty Per Carton: {data.qtyPerCarton}</Text>
          <Text style={styles.text1}>Total Cartons: {data.totalCartons}</Text>
          <Text style={styles.text1}>Sale Price Shopkeeper: PKR {data.salePrice}</Text>
          <Text style={styles.text1}>Company Name: {data.companyName}</Text>
          <TextInput
            style={styles.textInput}
            label="Sale Price For Shopkeeper (PKR)"
            keyboardType="number-pad"
            mode="outlined"
            value={salePrice}
            onChangeText={t => setSalePrice(t)}
          />
        </View>
      </View>
      <Button
        style={{margin:10, borderRadius: 10, padding: 5, marginBottom: 30}}
        icon="update"
        mode="contained"
        labelStyle={{color: colors.cardbackground, fontSize: 18}}
        onPress={updateDistribution}>
        Update
      </Button>
    </ScrollView>
  )
}

export default DistributorProductDetail

const styles = StyleSheet.create({
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
    fontSize: 22,
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
  titleText: {
    fontSize: 16,
    color: colors.buttons,
    padding: 10,
  },
});
