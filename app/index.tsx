import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="absolute top-[-140px] right-[-120px] w-96 h-96 bg-[#E8F0FF] rounded-full opacity-70" />
      <View className="absolute bottom-[-140px] left-[-120px] w-96 h-96 bg-[#E8F0FF] rounded-full opacity-60" />
      <View className="absolute inset-0 bg-[#F9FBFF]" />

      {/* Center Content */}
      <View className="flex-1 justify-center items-center px-6">
        <View className="w-20 h-20 bg-[#1A5DFF] rounded-2xl items-center justify-center shadow-xl mb-6">
          <MaterialIcons
            name="account-balance-wallet"
            size={44}
            color="white"
          />
        </View>

        <Text className="text-[32px] font-bold text-[#0B1220]">
          Len Den Khata
        </Text>

        <Text className="text-lg text-[#4E6FAE] mt-2">
          Your Digital Ledger
        </Text>
      </View>

      {/* Para */}
      <View className="px-6 pb-10">
        <Text className="text-center text-base text-[#7B90C7] mb-6">
          Effortlessly manage your daily transactions and credits in one place.
        </Text>

      {/* Buttons */}
        <Link href={"/login_Signup/login"} asChild>
        <TouchableOpacity className="h-14 bg-[#1A5DFF] rounded-2xl items-center justify-center shadow-lg mb-4">
          <Text className="text-white text-lg font-semibold">Login</Text>
        </TouchableOpacity>
        </Link>
        <Link href={"/login_Signup/signup"} asChild>
        <TouchableOpacity className="h-14 bg-white border-2 border-[#E3ECFF] rounded-2xl items-center justify-center">
          <Text className="text-[#1A5DFF] text-lg font-semibold">
            Create Account
          </Text>
        </TouchableOpacity>
        </Link>
      </View>

      {/* Footer */}
      <Text className="text-center text-sm text-[#7B90C7] mb-4">
        Safe • Secure • Reliable
      </Text>

    </SafeAreaView>
  );
};

export default index;
