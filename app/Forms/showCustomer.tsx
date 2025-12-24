import { useLocalSearchParams } from "expo-router";
import React from 'react';
import { View } from 'react-native';
import CustomerList from './CustomerList';

const showCustomer = () => {
    const {refreshList} = useLocalSearchParams()
  return (
    <View>
      <CustomerList  refreshList={ refreshList}/>
    </View>
  )
}

export default showCustomer