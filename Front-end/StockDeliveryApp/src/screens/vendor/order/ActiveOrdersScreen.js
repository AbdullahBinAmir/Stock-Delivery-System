import React from 'react'
import FetchByOrderStatusScreen from './FetchByOrderStatusScreen'

const ActiveOrdersScreen = ({navigation}) => {
  return (
      <FetchByOrderStatusScreen navigation={navigation} orderStatus='active' />
  )
}

export default ActiveOrdersScreen