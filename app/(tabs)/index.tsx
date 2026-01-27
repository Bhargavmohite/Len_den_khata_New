import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { use, useEffect } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';

const index = () => {
  const router = useRouter();

  const db = useSQLiteContext();
  const checkTrialStatus = async () => {
    try {
      const result = await db.getFirstAsync<{
        endDate: string;
      }>("SELECT endDate FROM Signup ORDER BY id DESC LIMIT 1");

      if (!result?.endDate) return;

      const today = new Date().toISOString().split("T")[0];

      if (today > result.endDate) {
        Alert.alert(
          "Trial Expired",
          "Your free trial has ended. Please sign in to continue.",
        );

        router.replace("/login_Signup/signup");
      }
    } catch (error) {
      console.log("Trial Check Error:", error);
    }
  };

  useEffect(() => {
    checkTrialStatus();
  },[])

  const customer = () => {
    router.push("../Forms/Customer_master");
  }
  const supply = () => {
    router.push("../Forms/supply_master");
  };
  const bank = () => {
    router.push("../Forms/bank_master");
  }
  return (
    <View className='gap-4 p-4'>
      {/* Cutsomer Master */}
      <Pressable
        className='bg-white dark:bg-gray-800/50 rounded-xl p-4 shadow-sm'
        onPress={() => customer()}
      >
        <View className='flex-row items-center gap-4'>
          <View className='w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 items-center justify-center'>
            <AntDesign name='usergroup-add' size={32} color='#137fec' />
          </View>

          <View className='flex-1'>
            <Text className='text-base font-semibold text-black dark:text-white'>
              Customer Master
            </Text>
            <Text className='text-sm text-gray-500 dark:text-gray-400'>
              View, add, and manage your customers
            </Text>
          </View>

          <AntDesign name='right' size={22} color='#137fec' />
        </View>
      </Pressable>
      {/* supply Master */}
      <Pressable
        className='bg-white dark:bg-gray-800/50 rounded-xl p-4 shadow-sm'
        onPress={() => supply()}
      >
        <View className='flex-row items-center gap-4'>
          <View className='w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 items-center justify-center'>
            <MaterialIcons name='delivery-dining' size={32} color='#137fec' />
          </View>

          <View className='flex-1'>
            <Text className='text-base font-semibold text-black dark:text-white'>
              Supplier Master
            </Text>
            <Text className='text-sm text-gray-500 dark:text-gray-400'>
              View, add, and manage your suppliers
            </Text>
          </View>

          <AntDesign name='right' size={22} color='#137fec' />
        </View>
      </Pressable>
      {/* Bank Master */}
      <Pressable
        className='bg-white dark:bg-gray-800/50 rounded-xl p-4 shadow-sm'
        onPress={() => bank()}
      >
        <View className='flex-row items-center gap-4'>
          <View className='w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 items-center justify-center'>
            <FontAwesome name='bank' size={32} color='#137fec' />
          </View>

          <View className='flex-1'>
            <Text className='text-base font-semibold text-black dark:text-white'>
              Bank Master
            </Text>
            <Text className='text-sm text-gray-500 dark:text-gray-400'>
              View, add, and manage your Banks
            </Text>
          </View>

          <AntDesign name='right' size={22} color='#137fec' />
        </View>
      </Pressable>

      {/* <Link href={''} asChild>
        <Button title='Customer Master' />
      </Link> */}
      
    </View>
  );
}

export default index