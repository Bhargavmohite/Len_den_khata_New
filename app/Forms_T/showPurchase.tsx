import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import PurchaseList from './PurchaseList';

const showPurchase = () => {
        const {refreshList} = useLocalSearchParams();
    
  return (
    <View>
      <PurchaseList  refreshList={ refreshList}/>
    </View>
  )
}

export default showPurchase