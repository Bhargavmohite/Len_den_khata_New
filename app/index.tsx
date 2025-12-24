import { Link } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const index = () => {
  return (
    <View className='flex-1 justify-center items-center'>
      <Text>Welcome to Len den Khata</Text>
      <Link href={"./(tabs)"} asChild>
        <Button title='Login' />
      </Link>
    </View>
  );
};

export default index;
