import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native'
import React from 'react'
import { colors } from '../../global/Styles'
import Header from '../../components/Header'
import { useGetStatisticsQuery } from '../../features/api/vendor/userAPISlice'
import { useSelector } from 'react-redux'

const VendorDashboard = ({navigation}) => {

    const {userInfo} = useSelector(state => state.user);
    const {isLoading, data = []} = useGetStatisticsQuery({
        id: userInfo.id
      });

    console.log(userInfo)  

    const graphicData = [{ y: data[1] }, { y: data[5] }, { y: data[7] }, { y: data[3]}];
    const graphicColor = ['#1b5583', '#DD371A', '#1ADD5B', '#CFDD1A']

    if (isLoading) {
        return (
          <View style={styles.loader}>
            <ActivityIndicator visible={true} />
          </View>
        );
      } else if (data) {
  return (
    <ScrollView style={styles.container}>
      <Header navigate={navigation} title={userInfo.name.toUpperCase()} />
      <View style={styles.headerView}>
        <View style={styles.creditBox}>
          <Text style={styles.creditTitle}>Total Credit (PKR)</Text>
          <Text style={styles.creditTotal}>{data[8]}</Text>
        </View>
        <View style={{...styles.creditBox,backgroundColor:'#228b22'}}>
          <Text style={styles.creditTitle}>Total Orders</Text>
          <Text style={styles.creditTotal}>{parseInt(data[0])+parseInt(data[4])+parseInt(data[6])+parseInt(data[2])}</Text>
        </View>
      </View>
      <View>
        <Text style={{padding:5,fontSize:20,color:colors.grey2,fontWeight:'bold',marginTop:10,left:5}}>Order Satistics</Text>
      </View>
      <View style={styles.statusView}>
        <Text style={styles.square}> </Text>
        <Text style={styles.text2}>Active</Text>
        <Text style={{...styles.square,backgroundColor:'#DD371A'}}> </Text>
        <Text style={styles.text2}>Cancelled</Text>
        <Text style={{...styles.square,backgroundColor:'#1ADD5B'}}> </Text>
        <Text style={styles.text2}>Completed</Text>
        <Text style={{...styles.square,backgroundColor:'#CFDD1A'}}> </Text>
        <Text style={styles.text2}>Pending</Text>
    </View>
    </ScrollView>
  )
      }
}

export default VendorDashboard

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
    text1:{
      fontSize:22,
      marginTop:15,
      fontWeight:'bold',
      textTransform:'uppercase',
      color:colors.statusBar,
      borderTopWidth:1,
      borderColor:colors.grey5,
      paddingTop:7,
      textAlign:'center',
      letterSpacing:0.5
    },
    square:{
      backgroundColor:'#1b5583',
      height:12,
      width:12,
      marginLeft:7
    },
    text2:{
      fontSize:14,
      color:colors.grey2,
      marginLeft:3
    },
    statusView:{
      flexDirection:'row',
      padding:5,
      margin:5,
      alignItems:'center',
      justifyContent:'center',
      //borderBottomWidth:3,
      //borderColor:colors.grey5
    },
    creditBox:{
        backgroundColor:'red',
        padding:5,
        alignItems:'center',
        width:150,
        borderRadius:10
    },
    creditTitle:{
      paddingVertical:5,
      fontSize:16,
      color:colors.cardbackground
    },
    creditTotal:{
      paddingVertical:5,
      fontSize:24,
      color:colors.cardbackground
    },
    headerView:{
      backgroundColor:colors.buttons,
      flexDirection:'row',
      justifyContent:'space-around',
      padding:10,
      paddingVertical:40,
      borderBottomLeftRadius:25,
      borderBottomRightRadius:25
    }
})