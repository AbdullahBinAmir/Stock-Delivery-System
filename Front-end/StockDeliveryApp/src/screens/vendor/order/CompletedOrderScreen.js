import React from 'react'
import FetchByOrderStatusScreen from './FetchByOrderStatusScreen'

const CompletedOrderScreen = ({navigation}) => {
  return (
      <FetchByOrderStatusScreen navigation={navigation} orderStatus='delivered' />
  )
}

export default CompletedOrderScreen