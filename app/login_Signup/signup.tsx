import emailjs from "@emailjs/browser";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const signup = () => {
  const router = useRouter();

  const SERVICE_ID = process.env.EXPO_PUBLIC_EMAILJS_SERVICE_ID ?? "";
  const TEMPLATE_ID = process.env.EXPO_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
  const PUBLIC_KEY = process.env.EXPO_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

  const db = useSQLiteContext();
  const [formData, setFormData] = useState({
    Shopname: "",
    Fullname: "",
    Email: "",
    mobileNumber: "",
    startDate: "",
    endDate: "",
    recepitNumber: "",
  });

  const generateDate = () => {
    const currentDate = new Date();
    const endDate = new Date();
    endDate.setDate(currentDate.getDate() + 5);
    return {
      startDate: currentDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    };
  };

  const generateReceipt = (fullname, mobile) => {
    return fullname.slice(0, 4).toUpperCase() + mobile.slice(-4);
  };

  const handletrail = async () => {
    if (
      !formData.Shopname ||
      !formData.Fullname ||
      !formData.Email ||
      !formData.mobileNumber
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const { startDate, endDate } = generateDate();

      const randomReceipt = generateReceipt(
        formData.Fullname,
        formData.mobileNumber,
      );

      await db.runAsync(
        `INSERT INTO Signup (Shopname, Fullname, Email, mobileNumber, startDate, endDate, receiptNumber) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          formData.Shopname,
          formData.Fullname,
          formData.Email,
          formData.mobileNumber,
          startDate,
          endDate,
          randomReceipt,
        ],
      );
      // console.log("Sending to :"+ formData.Email);
      console.log("receipt_Number: " + randomReceipt);

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          email: formData.Email,
          name: formData.Fullname,
          start_date: startDate, // or startDate variable
          end_date: endDate, // calculated end date
          mob_num: formData.mobileNumber,
          receipt_num: randomReceipt,
          company_name: "Tech Solutions mobile",
          support_email: "support.tsm@gmail.com",
        },
        PUBLIC_KEY,
      );
      // console.log("Sending to :" + formData.Email);

      alert(`5 Day Free Trial Started!\nTrial ends on ${endDate}`);
      router.replace("/(tabs)");

      setFormData({
        Shopname: "",
        Fullname: "",
        Email: "",
        mobileNumber: "",
        startDate: "",
        endDate: "",
        recepitNumber: "",
      });
    } catch (error: any) {
      console.error("Signup error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  const handlepayment = () => {
    alert("Payment Gateway is under development");
  };

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Icon */}
        <View className='items-center '>
          <View className='bg-[#1A5DFF] p-4 rounded-2xl'>
            <MaterialIcons
              name='account-balance-wallet'
              size={32}
              color='white'
            />
          </View>
        </View>

        {/* Title */}
        <Text className='mt-6 text-3xl font-extrabold text-center text-textPrimary'>
          Create Your Account
        </Text>

        {/* Form */}
        <View className='mt-8 px-4'>
          {/* Shop Name */}
          <Text className='mb-1.5 ml-1 text-2xl font-medium font-medium text-textPrimary'>
            Shop Name
          </Text>
          <TextInput
            className='h-14 mb-4 rounded-xl border border-border bg-white px-4 text-base text-textPrimary'
            placeholder='Enter your shop name'
            placeholderTextColor='#94A3B8'
            value={formData.Shopname}
            onChangeText={(text) =>
              setFormData({ ...formData, Shopname: text })
            }
          />

          {/* Full Name */}
          <Text className='mb-1.5 ml-1 text-2xl font-medium text-textPrimary'>
            Full Name
          </Text>
          <TextInput
            className='h-14 mb-4 rounded-xl border border-border bg-white px-4 text-base text-textPrimary'
            placeholder='Enter your full name'
            placeholderTextColor='#94A3B8'
            value={formData.Fullname}
            onChangeText={(text) =>
              setFormData({ ...formData, Fullname: text })
            }
          />

          {/* Email */}
          <Text className='mb-1.5 ml-1 text-2xl font-medium text-textPrimary'>
            Email
          </Text>
          <TextInput
            className='h-14 mb-4 rounded-xl border border-border bg-white px-4 text-base text-textPrimary'
            placeholder='Enter email address'
            placeholderTextColor='#94A3B8'
            keyboardType='email-address'
            value={formData.Email}
            onChangeText={(text) => setFormData({ ...formData, Email: text })}
          />

          {/* Mobile Number */}
          <Text className='mb-1.5 ml-1 text-2xl font-medium text-textPrimary'>
            Mobile Number
          </Text>
          <TextInput
            className='h-14 mb-6 rounded-xl border border-border bg-white px-4 text-base text-textPrimary'
            placeholder='+91 00000 00000'
            placeholderTextColor='#94A3B8'
            keyboardType='phone-pad'
            value={formData.mobileNumber}
            onChangeText={(text) =>
              setFormData({ ...formData, mobileNumber: text })
            }
          />

          {/* Submit Button */}
          <TouchableOpacity
            className='bg-primary h-14 rounded-2xl items-center justify-center'
            onPress={handlepayment}
          >
            <Text className='text-white text-lg font-bold'>Buy Now</Text>
          </TouchableOpacity>

          {/* Free Trail Button */}
          <TouchableOpacity
            className='bg-primary h-14 rounded-2xl mt-4 items-center justify-center'
            onPress={handletrail}
          >
            <Text className='text-base font-medium text-white'>
              Start with Free Trial
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <Text className='mt-6 text-center text-sm text-textSecondary px-6 leading-5'>
            5 day free trial you can try and then make payment
          </Text>

          <Text className='mt-5 text-center text-sm text-textSecondary'>
            Already have an account?
            <Text className='text-primary font-bold'>
              <Link href='/login_Signup/login'>Log In</Link>
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signup;
