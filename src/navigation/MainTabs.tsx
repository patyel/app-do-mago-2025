// Navegação em Abas (Bottom Tabs)
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import BankrollScreen from "../screens/BankrollScreen";
import CalculatorScreen from "../screens/CalculatorScreen";

const Tab = createBottomTabNavigator();

export const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0a0a0a",
          borderTopColor: "#dc2626",
          borderTopWidth: 2,
          height: 90,
          paddingBottom: 30,
          paddingTop: 10,
        },
        tabBarActiveTintColor: "#eab308",
        tabBarInactiveTintColor: "#737373",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: "Análise",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="BankrollTab"
        component={BankrollScreen}
        options={{
          tabBarLabel: "Banca",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CalculatorTab"
        component={CalculatorScreen}
        options={{
          tabBarLabel: "Calculadora",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calculator" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
