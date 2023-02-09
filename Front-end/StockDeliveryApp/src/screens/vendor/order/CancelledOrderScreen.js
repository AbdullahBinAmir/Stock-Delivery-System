import React from 'react'
import FetchByOrderStatusScreen from './FetchByOrderStatusScreen'

const CancelledOrderScreen = ({navigation}) => {
    return (
        <FetchByOrderStatusScreen navigation={navigation} orderStatus='cancelled' />
    )
  }
  
  export default CancelledOrderScreen
