import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import SupplyList from './SupplyList'

const showSupply = () => {
    const {refreshList} = useLocalSearchParams();
    
  return (
    <View>
      <SupplyList  refreshList={ refreshList}/>
    </View>
  )
}

export default showSupply