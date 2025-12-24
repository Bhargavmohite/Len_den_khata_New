import Button from "@/app-example/components/Button";
import { Picker } from "@react-native-picker/picker";
import { Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import { Alert, Modal, Text, TextInput, View } from "react-native";

const SupplyMaster = () => {
    type suppliers = {
      id: string;
      supplyName: string;
      MBCountryCode: string;
      mobileNumber: string;
      email: string;
      creditLimit: string;
      creditPeriod: string;
    };
  
    const [form, setForm] = useState({
      supplyName: "",
      MBCountryCode: "+91",
      mobileNumber: "",
      email: "",
      creditLimit: "",
      creditPeriod: "",
    });
  
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const db = useSQLiteContext();
    const [refreshList, setRefreshList] = useState(false); // new state
  
    const [supplierLists, setsupplierLists] = useState<suppliers[]>([]); // Type Cutsomer
    const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>( null );
  
  
    const loadSupplies = async () => {
      try {
        const result = await db.getAllAsync<suppliers>("SELECT * FROM Supply");
        setsupplierLists(result);
      } catch (error) {
        console.log("Failed to load Suppliers");
      }
    };
  
    const handleSubmit = async () => {
      try {
        if (
          !form.supplyName ||
          !form.mobileNumber ||
          !form.email ||
          !form.creditLimit ||
          !form.creditPeriod
        ) {
          Alert.alert("All fields required");
          return;
        }
  
        const existsingCustomer = await db.getFirstAsync<suppliers>(`
          SELECT * FROM Supply WHERE Lower(supplyName) = ?;`,[form.supplyName.toLowerCase()]);
          if (existsingCustomer) {
            Alert.alert("Supplier already exists, please Enter New name again");
            return;
          }
  
        await db.runAsync(
          `
              INSERT INTO Supply (supplyName,MBCountryCode ,mobileNumber, email, creditLimit, creditPeriod) VALUES (?, ?, ?, ?, ?, ?);
            `,
          [
            form.supplyName,
            form.MBCountryCode,
            form.mobileNumber,
            form.email,
            form.creditLimit,
            form.creditPeriod,
          ]
        );
  
        Alert.alert("Success", "Supplier added successfully");
  
        setForm({
          supplyName: "",
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
          console.log("error", "An error occurred while adding the supplier.");
        }
      }
    };
  
    // const handleCancel = async() => {
    //   try {
    //     await db.runAsync(
    //       `DELETE FROM Customer WHERE supplyName = ?;`,
    //       [form.supplyName]
    //     );
    //     setForm({
    //       supplyName: "",
    //       MBCountryCode: "",
    //       mobileNumber: "",
    //       email: "",
    //       creditLimit: "",
    //       creditPeriod: "",
    //     });
    //     Alert.alert("Success", "Supplier deleted successfully");
    //     setIsModalVisible(false);
    //     setRefreshList((prev) => !prev);
    //   } catch (error) {
    //     console.log("error", "An error occurred while deleting the supplier.");
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
        UPDATE Supply
        SET supplyName = ?,
            MBCountryCode = ?, 
            mobileNumber = ?, 
            email = ?, 
            creditLimit = ?, 
            creditPeriod = ?
        WHERE id = ?;
        `,
        [
          form.supplyName,
          form.MBCountryCode,
          form.mobileNumber,
          form.email,
          form.creditLimit,
          form.creditPeriod,
          selectedCustomerId,
        ]
      );
  
      setIsModalVisible(false);
      setRefreshList((prev) => !prev);
      Alert.alert("Success", "Supplier updated successfully");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to update the supplier.");
    }
  };




  return (
    <View className='flex-1 bg-gray-100 dark:bg-black p-2  p-4'>
      {/* Form */}
      <View className='w-full max-w-md self-center space-y-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-5 py-8'>
        <View className='w-full'>
          <Text className='text-base font-medium pb-2 text-black dark:text-gray-300 mt-2'>
            Supplier Name
          </Text>
          <TextInput
            placeholder="Enter customer's full name"
            className='w-full h-14 rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 px-4 text-base text-black dark:text-white'
            placeholderTextColor='#617589'
            value={form.supplyName}
            onChangeText={(text) => {
              setForm({
                ...form,
                supplyName: text,
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
      <View className='flex-row justify-center'>
        <View>
          <Button title='Submit' onpress={handleSubmit} />
        </View>
        <Button
          title='Modify'
          onpress={() => {
            loadSupplies();
            setIsModalVisible(true);
          }}
        />
      </View>
      {/* Modals */}
      <View>
        {/* Modify MOdal */}
        <View>
          <Modal
            visible={isModalVisible}
            transparent
            animationType='fade'
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View className='flex-1 justify-center items-center bg-black/40'>
              <View className='w-[90%] rounded-xl bg-white p-5 dark:bg-gray-800'>
                <Text className='text-lg font-semibold text-black dark:text-white mb-4'>
                  Modify Supplier
                </Text>

                {/* Customer Name Dropdown */}
                <Text className='mb-2 text-black dark:text-white'>
                  Supplier Name
                </Text>

                <View className='h-14 mb-3 justify-center rounded-lg border border-[#dbe0e6] dark:border-gray-600'>
                  <Picker
                    selectedValue={selectedCustomerId}
                    onValueChange={(id) => {
                      if (!id) return;

                      const customer = supplierLists.find(
                        (c) => Number(c.id) === Number(id)
                      );

                      if (!customer) return;

                      setSelectedCustomerId(Number(id));
                      setForm({
                        supplyName: String(customer.supplyName),
                        MBCountryCode: customer.MBCountryCode || "+91",
                        mobileNumber: String(customer.mobileNumber),
                        email: customer.email,
                        creditLimit: String(customer.creditLimit),
                        creditPeriod: String(customer.creditPeriod),
                      });
                    }}
                  >
                    <Picker.Item label='Select Customer' value={null} />
                    {supplierLists.map((customer) => (
                      <Picker.Item
                        key={customer.id}
                        label={customer.supplyName}
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
                  onChangeText={(text) =>
                    setForm({ ...form, creditLimit: text })
                  }
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
      </View>
      {/* <SupplyList refreshList={refreshList} /> */}
      <View className='flex items-center bg-white dark:bg-gray-800/50 rounded-xl p-4 w-[85%] relative left-8 top-[5rem]'>
        <Link
          href={{
            pathname: "/Forms/showSupply",
            params: {
              refresh: refreshList ? "1" : "0",
            },
          }}
          asChild
        >
          <Text className='text-base font-medium'>Show Supplier</Text>
        </Link>
      </View>
    </View>
  );
};

export default SupplyMaster;

