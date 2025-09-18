import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
 
// screens
import HomeStack from './src/navigation/HomeStack';
import MemberList from './src/screen/MemberList';
import CameraTab from './src/screen/CameraTab';
import PeopleTab from './src/screen/PeopleTab';
 
// icons
import NavCamera from './assets/svg/navCamera.svg';
import NavHome from './assets/svg/navHome.svg';
import NavMessage from './assets/svg/navMessage.svg';
import NavPeople from './assets/svg/navPeople.svg';
 
const Tab = createBottomTabNavigator();
 
function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.wrapper}>
      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => console.log('FAB pressed')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
 
      {/* Bottom Nav Bar */}
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
 
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
 
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
 
          let Icon;
          switch (route.name) {
            case 'HomeScreen':
              Icon = <NavHome width={32} height={32} fill={isFocused ? 'tomato' : 'gray'} />;
              break;
            case 'MemberList':
              Icon = <NavPeople width={32} height={32} fill={isFocused ? 'tomato' : 'gray'} />;
              break;
            case 'Messages':
              Icon = <NavMessage width={32} height={32} fill={isFocused ? 'tomato' : 'gray'} />;
              break;
            case 'Camera':
              Icon = <NavCamera width={32} height={32} fill={isFocused ? 'tomato' : 'gray'} />;
              break;
            default:
              Icon = <Text>{route.name}</Text>;
          }
 
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabButton}
            >
              {Icon}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
 
export default function MyTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
  <Tab.Screen name="HomeScreen" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Messages" component={MemberList} options={{ headerShown: false }} />
      <Tab.Screen name="Camera" component={CameraTab} options={{ headerShown: false }} />
      <Tab.Screen name="MemberList" component={PeopleTab} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
 
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    width: '100%',
    paddingHorizontal: 40,
  },
//   tabButton: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: '',
//   },
  fab: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 35, // sits above navbar
    zIndex: 10,
    elevation: 6, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});