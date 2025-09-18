import { View, Text, Button } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context';
 
const Stack = createNativeStackNavigator();

//screen
import Landing from "./src/screen/Landing";
import Signup from "./src/screen/Signup";
import Login from "./src/screen/Login";
import OTP from "./src/screen/OTP";
import MyTabs from "./MyTabs";
import PhotoFolder from "./src/screen/PhotoFolder";
 import CreateAlbum from "./src/screen/CreateAlbum";
const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Landing} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="OTP" component={OTP} />
          <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }}/>
          <Stack.Screen name="PhotoFolder" component={PhotoFolder} options={{ headerShown: false }}/>
                    <Stack.Screen name="CreateAlbum" component={CreateAlbum} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App