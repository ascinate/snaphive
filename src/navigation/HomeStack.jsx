import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import HomeScreen from "../screen/HomeScreen";
import PhotoFolder from "../screen/PhotoFolder";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="PhotoFolder" component={PhotoFolder} />
    </Stack.Navigator>
  );
}
