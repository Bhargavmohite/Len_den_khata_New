import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const PurchaseList = ({refreshList}) => {
  const db = useSQLiteContext();
  const [purchase, setPurchase] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPurchaseDetails = async () => {
    try {
      setLoading(true);

      const result = await db.getAllAsync(`
        SELECT 
          P.id,
          P.InvoiceNo,
          P.invoiceDate,
          P.amount,
          P.narration,
          S.supplyName
        FROM Purchase P
        LEFT JOIN Supply S ON P.supplyId = S.id
        ORDER BY P.invoiceDate DESC
      `);

      setPurchase(result);
    } catch (error) {
      console.error("listing error in purchase", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPurchaseDetails();
  }, [refreshList]);

  if (loading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <FlatList
      className='p-2'
      data={purchase}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingBottom: 30 }}
      renderItem={({ item }) => (
        <View className='mx-4 my-2 p-4 bg-white rounded-2xl shadow-sm'>
          {/* Header */}
          <View className='flex-row justify-between items-center mb-2'>
            <Text className='text-lg font-bold text-green-600'>
              🧾 {item.InvoiceNo}
            </Text>
            <Text className='text-xs text-gray-400'>{item.invoiceDate}</Text>
          </View>

          {/* Supplier */}
          <Text className='text-gray-800 font-semibold mb-1'>
            🧔 {item.supplyName || "Unknown Supplier"}
          </Text>

          {/* Narration */}
          <Text className='text-gray-600 mb-3'>
            📝 {item.narration || "No narration"}
          </Text>

          {/* Amount */}
          <View className='bg-green-50 p-3 rounded-xl'>
            <Text className='text-xs text-green-600 uppercase font-semibold'>
              Amount
            </Text>
            <Text className='text-base font-bold text-green-700'>
              ₹{item.amount}
            </Text>
          </View>
        </View>
      )}
      ListEmptyComponent={() => (
        <View className='items-center py-20'>
          <Text className='text-gray-400'>No purchases found</Text>
        </View>
      )}
    />
  );
};

export default PurchaseList;
