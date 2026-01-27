import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const signup = () => {
  return (
     <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        
        {/* Icon */}
        <View className="items-center ">
          <View className="bg-[#1A5DFF] p-4 rounded-2xl">
            <MaterialIcons
              name="account-balance-wallet"
              size={32}
              color="white"
            />
          </View>
        </View>

        {/* Title */}
        <Text className="mt-6 text-3xl font-extrabold text-center text-textPrimary">
          Create Your Account
        </Text>
        

        {/* Form */}
        <View className="mt-8 px-4">
          {/* Shop Name */}
          <Text className="mb-1.5 ml-1 text-sm font-medium text-textPrimary">
            Shop Name
          </Text>
          <TextInput
            className="h-14 mb-4 rounded-xl border border-border bg-white px-4 text-base text-textPrimary"
            placeholder="Enter your shop name"
            placeholderTextColor="#94A3B8"
          />

          {/* Full Name */}
          <Text className="mb-1.5 ml-1 text-sm font-medium text-textPrimary">
            Full Name
          </Text>
          <TextInput
            className="h-14 mb-4 rounded-xl border border-border bg-white px-4 text-base text-textPrimary"
            placeholder="Enter your full name"
            placeholderTextColor="#94A3B8"
          />

          {/* Email */}
          <Text className="mb-1.5 ml-1 text-sm font-medium text-textPrimary">
            Email
          </Text>
          <TextInput
            className="h-14 mb-4 rounded-xl border border-border bg-white px-4 text-base text-textPrimary"
            placeholder="Enter email address"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
          />

          {/* Mobile Number */}
          <Text className="mb-1.5 ml-1 text-sm font-medium text-textPrimary">
            Mobile Number
          </Text>
          <TextInput
            className="h-14 mb-6 rounded-xl border border-border bg-white px-4 text-base text-textPrimary"
            placeholder="+91 00000 00000"
            placeholderTextColor="#94A3B8"
            keyboardType="phone-pad"
          />

          {/* Checkbox */}
          <View className="flex-row items-center mb-6">
            <View className="w-5 h-5 rounded border border-border bg-white mr-3" />
            <Text className="text-base font-medium text-textPrimary">
              Start with Free Trial
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity className="bg-primary h-14 rounded-2xl items-center justify-center">
            <Text className="text-white text-lg font-bold">
              Submit
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <Text className="mt-6 text-center text-sm text-textSecondary px-6 leading-5">
            5 day free trial you can try and then make payment
          </Text>

          <Text className="mt-5 text-center text-sm text-textSecondary">
            Already have an account?
            <Text className="text-primary font-bold"> 
            <Link href="/login_Signup/login">
            Log In
            </Link>
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default signup