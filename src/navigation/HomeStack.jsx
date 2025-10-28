// this file is for where my Bottom tab navigation stack is defined
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import Home from "../screen/Home";
import PhotoFolder from "../screen/PhotoFolder";

import Notification from "../screen/Notification";
const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="PhotoFolder" component={PhotoFolder} />

      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
}
