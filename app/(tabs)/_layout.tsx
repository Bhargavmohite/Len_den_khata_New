import { Tabs } from "expo-router";
// import "../global.css";
import { FontAwesome5, Foundation, Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: "Master",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='transaction'
        options={{
          title: "Transaction",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name='cash-register' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='report'
        options={{
          title: "Report",
          tabBarIcon: ({ color, size }) => (
            <Foundation name='page-multiple' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
