import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
// import PurchaseList from "./PurchaseList";
import SaleList from "./SaleList";

const showSales = () => {
  const { refreshList } = useLocalSearchParams();

  return (
    <View>
      <SaleList refreshList={refreshList} />
    </View>
  );
};

export default showSales;
