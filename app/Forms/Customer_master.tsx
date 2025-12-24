import Button from '@/app-example/components/Button';
import { Picker } from '@react-native-picker/picker';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import { Alert, Modal, Text, TextInput, View } from 'react-native';
import CustomerList from './CustomerList';
import { Link } from 'expo-router';





const Customer_master = () => {
  type customers = {
    id: string;
    customerName: string;
    MBCountrycode: string;
    mobileNumber: string;
    email: string;
    creditLimit: string;
    creditPeriod: string;
  };

  const [form, setForm] = useState({
    customerName: "",
    MBCountryCode: "+91",
    mobileNumber: "",
    email: "",
    creditLimit: "",
    creditPeriod: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);

  const db = useSQLiteContext();
  const [refreshList, setRefreshList] = useState(false); // new state

  const [customerLists, setCustomerLists] = useState<customers[]>([]); // Type Cutsomer
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>( null );


  const loadCustomers = async () => {
    try {
      const result = await db.getAllAsync<customers>("SELECT * FROM Customer");
      setCustomerLists(result);
    } catch (error) {
      console.log("Failed to load customers");
    }
  };

  const handleSubmit = async () => {
    try {
      if (
        !form.customerName ||
        !form.mobileNumber ||
        !form.email ||
        !form.creditLimit ||
        !form.creditPeriod
      ) {
        Alert.alert("All fields required");
        return;
      }

      const existsingCustomer = await db.getFirstAsync<customers>(`
        SELECT * FROM Customer WHERE Lower(customerName) = ?;`,[form.customerName.toLowerCase()]);
        if (existsingCustomer) {
          Alert.alert("Customer already exists, please Enter New name again");
          return;
        }

      await db.runAsync(
        `
            INSERT INTO Customer (customerName,MBCountryCode ,mobileNumber, email, creditLimit, creditPeriod) VALUES (?, ?, ?, ?, ?, ?);
          `,
        [
          form.customerName,
          form.MBCountryCode,
          form.mobileNumber,
          form.email,
          form.creditLimit,
          form.creditPeriod,
        ]
      );

      Alert.alert("Success", "Customer added successfully");

      setForm({
        customerName: "",
        MBCountryCode: "",
        mobileNumber: "",
        email: "",
        creditLimit: "",
        creditPeriod: "",
      });

      setRefreshList((prev) => !prev);
    } catch (error) {
      if (error instanceof Error) {
        console.log("error", error.message);
      } else {
        console.log("error", "An error occurred while adding the customer.");
      }
    }
  };

  // const handleCancel = async() => {
  //   try {
  //     await db.runAsync(
  //       `DELETE FROM Customer WHERE customerName = ?;`,
  //       [form.customerName]
  //     );
  //     setForm({
  //       customerName: "",
  //       MBCountryCode: "",
  //       mobileNumber: "",
  //       email: "",
  //       creditLimit: "",
  //       creditPeriod: "",
  //     });
  //     Alert.alert("Success", "Customer deleted successfully");
  //     setIsModalVisible(false);
  //     setRefreshList((prev) => !prev);
  //   } catch (error) {
  //     console.log("error", "An error occurred while deleting the customer.");
  //   }
  // }

const handleUpdate = async () => {
  if (!selectedCustomerId) {
    Alert.alert("Please select a customer to modify");
    return;
  }

  try {
    await db.runAsync(
      `
      UPDATE Customer
      SET customerName = ?,
          MBCountryCode = ?, 
          mobileNumber = ?, 
          email = ?, 
          creditLimit = ?, 
          creditPeriod = ?
      WHERE id = ?;
      `,
      [
        form.customerName,
        form.MBCountryCode,
        form.mobileNumber,
        form.email,
        form.creditLimit,
        form.creditPeriod,
        selectedCustomerId,
      ]
    );

    setIsModalVisible1(false);
    setRefreshList((prev) => !prev);
    Alert.alert("Success", "Customer updated successfully");
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "Failed to update customer");
  }
};

  return (
    <View className='p-4'>
      {/* Forms */}
      <View className='w-full max-w-md self-center space-y-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-5 py-8'>
        <View className='w-full'>
          <Text className='text-base font-medium pb-2 text-black dark:text-gray-300 mt-2'>
            Customer Name
          </Text>
          <TextInput
            placeholder="Enter customer's full name"
            className='w-full h-14 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 px-4 text-base text-black dark:text-white'
            placeholderTextColor='#617589'
            value={form.customerName}
            onChangeText={(text) => {
              setForm({
                ...form,
                customerName: text,
              });
            }}
          />
        </View>

        <View className='w-full'>
          <Text className='text-base font-medium pb-2 text-black dark:text-gray-300 mt-2'>
            Mobile Number
          </Text>

          <View className='relative flex-row '>
            <TextInput
              maxLength={4}
              keyboardType='phone-pad'
              className='w-16 h-14 rounded-lg border border-[#dbe0e6] bg-white text-center'
              value={form.MBCountryCode}
              onChangeText={(text) => setForm({ ...form, MBCountryCode: text })}
            />

            <TextInput
              keyboardType='phone-pad'
              className='flex-1 h-14 rounded-lg border border-[#dbe0e6] bg-white px-4'
              placeholder='Enter mobile number'
              value={form.mobileNumber}
              onChangeText={(text) =>
                setForm({
                  ...form,
                  mobileNumber: text.replace(/\D/g, "").slice(0, 10),
                })
              }
            />
          </View>
        </View>

        <View className='w-full'>
          <Text className='text-base font-medium pb-2 text-black dark:text-gray-300 mt-2'>
            Email
          </Text>
          <TextInput
            placeholder='Enter email address'
            keyboardType='email-address'
            className='w-full h-14 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 px-4 text-base text-black dark:text-white'
            placeholderTextColor='#617589'
            value={form.email}
            onChangeText={(text) => {
              setForm({
                ...form,
                email: text,
              });
            }}
          />
        </View>

        <View className='flex-row w-full gap-4'>
          <View className='flex-1'>
            <Text className='text-base font-medium pb-2 text-black dark:text-gray-300 mt-2'>
              Credit Limit
            </Text>

            <View className='relative'>
              <Text className='absolute left-3 top-4 text-[#617589] dark:text-gray-400'>
                ₹
              </Text>

              <TextInput
                placeholder='Amount'
                keyboardType='numeric'
                className='w-full h-14 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 pl-7 pr-4 text-base text-black dark:text-white'
                placeholderTextColor='#617589'
                value={form.creditLimit}
                onChangeText={(text) => {
                  setForm({
                    ...form,
                    creditLimit: text,
                  });
                }}
              />
            </View>
          </View>

          <View className='flex-1'>
            <Text className='text-base font-medium pb-2 text-black dark:text-gray-300 mt-2'>
              Credit Period
            </Text>

            <View className='relative'>
              <TextInput
                placeholder='e.g. 30'
                keyboardType='numeric'
                className='w-full h-14 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 pr-14 pl-4 text-base text-black dark:text-white'
                placeholderTextColor='#617589'
                value={form.creditPeriod}
                onChangeText={(text) => {
                  setForm({
                    ...form,
                    creditPeriod: text,
                  });
                }}
              />

              <Text className='absolute right-3 top-4 text-[#617589] dark:text-gray-400'>
                Days
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* Buttons */}
      <View className='flex-row items-center justify-center'>
        <Button title='Submit' onpress={handleSubmit} />
        <Button
          title='Modify'
          onpress={() => {
            loadCustomers();
            setIsModalVisible1(true);
          }}
        />
      </View>
      {/* Modify modal */}
      <View>
        <Modal
          visible={isModalVisible1}
          transparent
          animationType='fade'
          onRequestClose={() => setIsModalVisible1(false)}
        >
          <View className='flex-1 justify-center items-center bg-black/40'>
            <View className='w-[90%] rounded-xl bg-white p-5 dark:bg-gray-800'>
              <Text className='text-lg font-semibold text-black dark:text-white mb-4'>
                Modify Customer
              </Text>

              {/* Customer Name Dropdown */}
              <Text className='mb-2 text-black dark:text-white'>
                Customer Name
              </Text>

              <View className='h-14 mb-3 justify-center rounded-lg border border-[#dbe0e6] dark:border-gray-600'>
                <Picker
                  selectedValue={selectedCustomerId}
                  onValueChange={(id) => {
                    if (!id) return;

                    const customer = customerLists.find(
                      (c) => Number(c.id) === Number(id)
                    );

                    if (!customer) return;

                    setSelectedCustomerId(Number(id));
                    setForm({
                      customerName: customer.customerName,
                      MBCountryCode: customer.MBCountrycode || "+91",
                      mobileNumber: String(customer.mobileNumber),
                      email: customer.email,
                      creditLimit: String(customer.creditLimit),
                      creditPeriod: String(customer.creditPeriod),
                    });
                  }}
                >
                  <Picker.Item label='Select Customer' value={null} />
                  {customerLists.map((customer) => (
                    <Picker.Item
                      key={customer.id}
                      label={customer.customerName}
                      value={customer.id}
                    />
                  ))}
                </Picker>
              </View>

              {/* Mobile Number */}
              <View className='flex-row gap-2'>
                <TextInput
                  className='w-16 h-12 border rounded-lg text-center'
                  value={form.MBCountryCode}
                  onChangeText={(t) => setForm({ ...form, MBCountryCode: t })}
                />

                <TextInput
                  className='flex-1 h-12 border rounded-lg px-4'
                  keyboardType='phone-pad'
                  value={form.mobileNumber}
                  onChangeText={(t) =>
                    setForm({
                      ...form,
                      mobileNumber: t.replace(/\D/g, "").slice(0, 10),
                    })
                  }
                />
              </View>

              {/* Email */}
              <TextInput
                placeholder='Email'
                keyboardType='email-address'
                className='h-14 mb-3 rounded-lg border border-[#dbe0e6] px-4 text-black dark:text-white'
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
              />

              {/* Credit Limit */}
              <TextInput
                placeholder='Credit Limit'
                keyboardType='numeric'
                className='h-14 mb-3 rounded-lg border border-[#dbe0e6] px-4 text-black dark:text-white'
                value={form.creditLimit}
                onChangeText={(text) => setForm({ ...form, creditLimit: text })}
              />

              {/* Credit Period */}
              <TextInput
                placeholder='Credit Period (Days)'
                keyboardType='numeric'
                className='h-14 mb-4 rounded-lg border border-[#dbe0e6] px-4 text-black dark:text-white'
                value={form.creditPeriod}
                onChangeText={(text) =>
                  setForm({ ...form, creditPeriod: text })
                }
              />

              <View className='flex-row justify-between'>
                <Button title='Update' onpress={handleUpdate} />
              </View>
            </View>
          </View>
        </Modal>
      </View>

      {/* CustomerList
      <CustomerList refreshList={refreshList} /> */}
      <View className='flex items-center bg-white dark:bg-gray-800/50 rounded-xl p-4 w-[85%] relative left-8 top-[5rem]'>
        <Link
          href={{
            pathname: "/Forms/showCustomer",
            params: {
              refresh: refreshList ? "1" : "0",
            },
          }}
          asChild
        >
          <Text className='text-base font-medium'>Show Customer</Text>
        </Link>
      </View>
    </View>
  );
}

export default Customer_master