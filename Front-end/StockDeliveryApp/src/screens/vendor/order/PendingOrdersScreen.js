import React from 'react'
import FetchByOrderStatusScreen from './FetchByOrderStatusScreen'

const PendingOrdersScreen = ({navigation}) => {
  return (
    <FetchByOrderStatusScreen navigation={navigation} orderStatus="pending" />
  )
}

export default PendingOrdersScreen
