import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import Header from '../../../components/Header'
import { colors } from '../../../global/Styles'
import SellerListScreen from './SellerListScreen'

const DistributorReturnScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header  navigate={navigation} title={'Buyer Dashboard'} />
          <SellerListScreen navigation={navigation} />
    </View>
  )
}

export default DistributorReturnScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.cardbackground
    }
})