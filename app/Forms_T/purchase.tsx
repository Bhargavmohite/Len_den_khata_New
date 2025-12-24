import Button from "@/app-example/components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

const purchase = () => {
  const db = useSQLiteContext();

  const [form, setForm] = useState({
    invoiceNo: "",
    invoiceDate: "",
    supplyId: null,
    amount: "",
    narration: "",
  });

  const [supplyList, setSupplyList] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const onDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      const formatted = date.toISOString().split("T")[0];
      setForm({ ...form, invoiceDate: formatted });
    }
  };

  useEffect(() => {
    const loadSupplies = async () => {
      try {
        const result = await db.getAllAsync(
          "SELECT id, supplyName FROM Supply ORDER BY supplyName"
        );
        setSupplyList(result);
      } catch (error) {
        console.error("Error loading suppliers:", error);
      }
    };
    loadSupplies();
  }, []);

  const handleSubmit = async () => {
    if (
      !form.invoiceNo ||
      !form.invoiceDate ||
      !form.supplyId ||
      !form.amount
    ) {
      Alert.alert("Alert", "Please fill all required fields");
      return;
    }

    try {
      await db.runAsync(
        `INSERT INTO Purchase 
         (InvoiceNo, invoiceDate, supplyId, amount, narration)
         VALUES (?, ?, ?, ?, ?)`,
        [
          form.invoiceNo,
          form.invoiceDate,
          form.supplyId,
          form.amount,
          form.narration,
        ]
      );

      Alert.alert("Success", "Purchase added successfully");

      setForm({
        invoiceNo: "",
        invoiceDate: "",
        supplyId: null,
        amount: "",
        narration: "",
      });
    } catch (err) {
      console.error("Error inserting purchase:", err);
    }
  };

  return (
    <View className='px-4 py-4'>
      {/* Purchase Form */}
      <View className='w-full max-w-md self-center  rounded-xl bg-white px-5 py-8'>
        <Text className='text-base font-medium pb-2'>Invoice Number</Text>
        <TextInput
          placeholder='Enter Invoice Number'
          className='w-full h-14 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 px-4 text-base text-black dark:text-white'
          value={form.invoiceNo}
          onChangeText={(t) => setForm({ ...form, invoiceNo: t })}
        />

        <Text className='text-base font-medium mt-4 pb-2'>Invoice Date</Text>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          className='w-full h-14 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 px-4 text-base text-black dark:text-white flex-row items-center justify-between'
        >
          <Text>{form.invoiceDate || "Select Date"}</Text>
          <MaterialIcons name='calendar-today' size={22} />
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode='date'
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onDateChange}
          />
        )}

        <Text className='text-base font-medium mt-4 pb-2'>Supplier Name</Text>
        <View className='rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 px-4 text-base text-black dark:text-white'>
          <Picker
            selectedValue={form.supplyId}
            onValueChange={(v) => setForm({ ...form, supplyId: v })}
          >
            <Picker.Item label='Select Supplier' value={undefined} />
            {supplyList.map((s) => (
              <Picker.Item key={s.id} label={s.supplyName} value={s.id} />
            ))}
          </Picker>
        </View>

        <Text className='text-base font-medium mt-4 pb-2'>Amount</Text>
        <TextInput
          placeholder='Enter Amount'
          className='w-full h-14 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 px-4 text-base text-black dark:text-white'
          keyboardType='numeric'
          value={form.amount}
          onChangeText={(t) => setForm({ ...form, amount: t })}
        />

        <Text className='text-base font-medium mt-4 pb-2'>Narration</Text>
        <TextInput
          placeholder='Enter Narration'
          className='w-full h-14 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 px-4 text-base text-black dark:text-white flex-row items-center justify-between'
          value={form.narration}
          onChangeText={(t) => setForm({ ...form, narration: t })}
        />
      </View>

      {/* Buttons */}
      <View className='flex-row justify-center mt-4 gap-4'>
        <Button title='Submit' onpress={handleSubmit} />
        <Button title='Modify' onpress={handleSubmit} />
      </View>

      {/* Modify Modal */}
    </View>
  );
};
export default purchase;
