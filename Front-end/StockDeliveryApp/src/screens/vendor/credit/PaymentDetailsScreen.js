import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {colors} from '../../../global/Styles';
import Icon from 'react-native-vector-icons/Entypo';
import {useGetCreditPaymentsQuery} from '../../../features/api/vendor/UserCreditAPI';
import {DataTable} from 'react-native-paper';

const PaymentDetailsScreen = ({route, navigation}) => {

  const {isLoading, data = [],refetch} = useGetCreditPaymentsQuery({
    crId: route.params.crId,
  });

  React.useEffect(()=>{
    refetch()
  },[])
 
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
            <Text style={styles.titleText}>Order Payments</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', padding: 5, left: 5, marginTop: 5}}>
          <Text style={styles.cardText}>Amount Remaining:</Text>
          <Text style={styles.cardText1}>PKR {route.params.tc}</Text>
        </View>
        <View style={{flexDirection: 'row', padding: 5, left: 5}}>
          <Text style={styles.cardText}>Amount Paid:</Text>
          <Text style={styles.cardText1}>PKR {route.params.ap}</Text>
        </View>
        <DataTable style={{flex: 1, flexGrow: 1,padding:10}}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title textStyle={styles.headerTitle} style={{flex:.2}}>SR NO.</DataTable.Title>
            <DataTable.Title textStyle={{...styles.headerTitle,marginLeft:7}}  style={{flex:.5}}>Amount Paid (PKR)</DataTable.Title>
            <DataTable.Title textStyle={{...styles.headerTitle,marginLeft:10}}    style={{flex:.3}}>Paid At</DataTable.Title>
          </DataTable.Header>
          <FlatList
            style={{marginBottom: 10}}
            horizontal={false}
            showsVerticalScrollIndicator={true}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <DataTable.Row>
                <DataTable.Cell>{index + 1}</DataTable.Cell>
                <DataTable.Cell>{item.paid_amount}</DataTable.Cell>
                <DataTable.Cell>{item.payment_date}</DataTable.Cell>
              </DataTable.Row>
            )}
          />
        </DataTable>
      </View>
    );
  }
};

export default PaymentDetailsScreen;

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
  paymentView: {
    borderWidth: 1,
    padding: 10,
    borderColor: colors.grey4,
    marginTop: 10,
    backgroundColor: colors.cardbackground,
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.grey2,
    letterSpacing: 1,
  },
  cardText1: {
    fontSize: 18,
    color: colors.buttons,
    fontWeight: 'bold',
    left: 5,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
