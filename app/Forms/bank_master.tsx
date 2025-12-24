import Button from '@/app-example/components/Button';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import Bank_Lists from './Bank_Lists';

const bank_master = () => {

    type banks = {
        bank: string;
    }
    const db = useSQLiteContext();
    const [form, setForm] = useState({
        bankName : "",
    });

    const [refreshList, setRefreshList] = useState(false);
    
    const handlesubmit =async() => {
        try {
            if(!form.bankName){
                Alert.alert("Oops ","All fields Required..");
                return;
            };
           const existsingCustomer = await db.getFirstAsync<banks>(`SELECT * FROM Bank WHERE Lower(bankName) = ?;`,[form.bankName.toLowerCase()] );
            
           if (existsingCustomer) {

                     Alert.alert("Customer already exists, please Enter New name again");
                     return;
             }
        
            await db.runAsync(`INSERT INTO Bank(bankName) VALUES(?)`,[form.bankName]);
            Alert.alert("Success", "Bank Name is Saved");
            setRefreshList((prevs)=>!prevs);
            setForm({
              bankName: "",
            });
            
        } catch (error) {
            console.log("Error :",error);
            
            
        }
    }
  return (
    <View className='p-4'>
      {/* Forms */}
      <View className='w-full max-w-md self-center space-y-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-5 py-8'>
        <View className='w-full'>
          <Text className='text-base font-medium pb-2 text-black dark:text-gray-300 mt-2'>
            Bank Name
          </Text>
          <TextInput
            placeholder='Enter Your Bank full name'
            className='w-full h-14 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 px-4 text-base text-black dark:text-white'
            placeholderTextColor='#617589'
            value={form.bankName}
            onChangeText={(text) => {
              setForm({ ...form, bankName: text });
            }}
          />
        </View>
      </View>
      {/* Buttons */}

      <Button title='Submit' onpress={handlesubmit} />
      <View>
        <Bank_Lists refreshList={refreshList} />
      </View>
    </View>
  );
}

export default bank_master