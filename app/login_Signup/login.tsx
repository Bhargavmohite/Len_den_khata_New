import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const login = () => {
  const db = useSQLiteContext();

  const [formData, setFormData] = useState({
    mobileNumber: "",
    receiptNumber: "",
  });

  const handlelogin = async () => {
    if (!formData.mobileNumber || !formData.receiptNumber) {
      alert("Please fill all required Details");
      return;
    }
    // Handle login logic here
    try {
      const result = await db.getAllAsync(
        `SELECT * FROM Signup WHERE mobileNumber = ? AND receiptNumber = ?`,
        [formData.mobileNumber, formData.receiptNumber],
      );

      if (result.length > 0) {
        console.log("Login Successful");
        router.replace("/(tabs)");
      } else {
        Alert.alert("Login Failed", "Invalid mobile number or receipt number");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <SafeAreaView className='flex-1 bg-[#f6f6f8]'>
      {/* Content */}
      <View className='flex-1 px-4 pt-12 max-w-[480px] w-full self-center '>
        {/* App Icon */}
        <View className='items-center mb-6'>
          <View className='w-20 h-20 bg-[#1A5DFF] rounded-2xl items-center justify-center shadow-lg'>
            <MaterialIcons
              name='account-balance-wallet'
              size={44}
              color='white'
            />
          </View>
        </View>

        {/* Title */}
        <Text className='text-[32px] font-bold text-[#0d121b] text-center mb-2'>
          Welcome Back
        </Text>

        {/* Subtitle */}
        <Text className='text-base text-[#4c669a] text-center mb-8 px-2 '>
          Sign in to manage your digital ledger and track customer transactions
          securely.
        </Text>

        {/* Mobile Number */}
        <View className='mb-4'>
          <Text className='text-sm font-semibold text-[#0d121b] mb-2 ml-1'>
            Mobile Number
          </Text>

          <View className='flex-row items-center bg-white border border-[#cfd7e7] rounded-xl h-14 '>
            <TextInput
              placeholder='Enter 10-digit number'
              keyboardType='phone-pad'
              className='flex-1 px-4 text-base text-[#0d121b]'
              placeholderTextColor='#94a3b8'
              value={formData.mobileNumber}
              onChangeText={(text) =>
                setFormData({ ...formData, mobileNumber: text })
              }
            />
            <View className='pr-4'>
              <MaterialIcons name='phone-iphone' size={20} color='#4c669a' />
            </View>
          </View>
        </View>

        {/* Receipt Number */}
        <View className='mb-6'>
          <Text className='text-sm font-semibold text-[#0d121b] mb-2 ml-1'>
            Receipt Number
          </Text>

          <View className='flex-row items-center bg-white border border-[#cfd7e7] rounded-xl h-14'>
            <TextInput
              placeholder='Enter unique ID'
              className='flex-1 px-4 text-base text-[#0d121b]'
              placeholderTextColor='#94a3b8'
              value={formData.receiptNumber}
              onChangeText={(text) =>
                setFormData({ ...formData, receiptNumber: text })
              }
            />
            <View className='pr-4'>
              <MaterialIcons name='receipt-long' size={20} color='#4c669a' />
            </View>
          </View>
        </View>

        {/* Login Button */}
        
          <TouchableOpacity
            className='h-14 w-full bg-[#1A5DFF] rounded-2xl items-center justify-center shadow-md active:scale-95 m-2'
            onPress={handlelogin}
          >
            <Text className='text-white text-base font-bold'>Login</Text>
          </TouchableOpacity>
        

        {/* Links */}
        <View className='items-center pt-8 gap-4'>
          <TouchableOpacity>
            <Text className='text-[#135bec] text-sm font-medium'>
              Forgot &nbsp;
              <Text className='text-[#1A5DFF] text-sm font-medium '>
                Receipt Number
              </Text>
              ?
            </Text>
          </TouchableOpacity>

          <View className='flex-row items-center gap-2 mt-2'>
            <MaterialIcons name='verified-user' size={14} color='#1A5DFF' />
            <Text className='text-xs text-gray-400'>
              End-to-end encrypted ledger data
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View className='p-6 items-center'>
        <Text className='text-sm text-gray-400 '>
          Don’t have an account?{" "}
          <Text className='text-[#1A5DFF] font-semibold'>
            <Link
              href='/login_Signup/signup'
              className='text-[#1A5DFF] font-semibold'
            >
              Register Shop
            </Link>
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default login;
