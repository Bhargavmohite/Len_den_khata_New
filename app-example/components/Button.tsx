import React from "react";
import { Pressable, Text } from "react-native";

export default function Button({ title, onpress }) {
  return (
    <Pressable
      onPress={onpress}
      style={{
        backgroundColor: "#1e90ff",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop: 20,
      }}
    >
      <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
        {title}
      </Text>
    </Pressable>
  );
}
