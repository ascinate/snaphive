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
import CreateFolder from "./src/screen/CreateFolder";
import Folder from "./src/screen/Folder";
import AddExpenseBlock from "./src/screen/AddExpenseBlock";
import AddNote from "./src/screen/AddNote";
import Join from "./src/screen/Join";
import NewPage from "./src/screen/ShareApps";
import Home from "./src/screen/Home";
import PhotoShare from "./src/screen/PhotoShare";
import AddMember from "./src/screen/AddMember";
import Notification from "./src/screen/Notification";
import Camera from "./src/screen/Camera";
import Subscribe from "./src/screen/Subscribe";
import CreateEvent from "./src/screen/CreateEvent";
import CreateEventTwo from "./src/screen/CreateEventTwo";
import CreateEventThree from "./src/screen/CreateEventThree";
import CreateEventFour from "./src/screen/CreateEventFour";
import CreateEventFive from "./src/screen/CreateEventFive";
import InviteMember from "./src/screen/InviteMember";
import ClickPhoto from "./src/screen/ClickPhoto";
import FolderTitle from "./src/screen/FolderTitle";
import QRcode from "./src/screen/QRcode";
import Locking from "./src/screen/Locking";
import MemberShare from "./src/screen/MemberShare";
import YourOpinion from "./src/screen/YourOpinion";
import ContactUs from "./src/screen/ContactUs";
import InviteHiveMember from "./src/screen/InviteHiveMember";
import ManagePermissions from "./src/screen/ManagePermissions";
import Language from "./src/screen/Language";
import MyFriend from "./src/screen/MyFriend";
import EditProfile from "./src/screen/EditProfile";
import Chat from "./src/screen/Chat";
//demo camera ui
import ClickPhotoTwo from "./src/screen/ClickPhotoTwo";
import ClickPhotoThree from "./src/screen/ClickPhotoThree";
const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={Landing}  options={{ headerShown: false }}/>
          <Stack.Screen name="Signup" component={Signup}  options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }}/>
          <Stack.Screen name="OTP" component={OTP}  options={{ headerShown: false }}/>
          <Stack.Screen name="MyTabs" component={MyTabs}  options={{ headerShown: false }}/>
          <Stack.Screen name="PhotoFolder" component={PhotoFolder}  options={{ headerShown: false }}/>
          <Stack.Screen name="CreateAlbum" component={CreateAlbum} options={{ headerShown: false }}
/>
          <Stack.Screen name="CreateFolder" component={CreateFolder}  options={{ headerShown: false }}
/>
          <Stack.Screen name="Folder" component={Folder}  options={{ headerShown: false }}
/>
          <Stack.Screen name="AddExpenseBlock" component={AddExpenseBlock}  options={{ headerShown: false }}
/>
          <Stack.Screen name="AddNote" component={AddNote}  options={{ headerShown: false }}
/>
          <Stack.Screen name="Join" component={Join}  options={{ headerShown: false }}
/>
          <Stack.Screen name="NewPage" component={NewPage} options={{ headerShown: false }}
 />
          <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }}
/>
          <Stack.Screen name="PhotoShare" component={PhotoShare}  options={{ headerShown: false }}
/>
          <Stack.Screen name="AddMember" component={AddMember}  options={{ headerShown: false }}
/>
          <Stack.Screen name="Notification" component={Notification}  options={{ headerShown: false }}
/>
          <Stack.Screen name="Camera" component={Camera}  options={{ headerShown: false }}
/>
          <Stack.Screen name="Subscribe" component={Subscribe}  options={{ headerShown: false }}
/>
          <Stack.Screen name="CreateEvent" component={CreateEvent}  options={{ headerShown: false }}
/>
          <Stack.Screen name="CreateEventTwo" component={CreateEventTwo}  options={{ headerShown: false }}
/>
          <Stack.Screen name="CreateEventThree" component={CreateEventThree}  options={{ headerShown: false }}
/>
          <Stack.Screen name="CreateEventFour" component={CreateEventFour}  options={{ headerShown: false }}
/>
          <Stack.Screen name="CreateEventFive" component={CreateEventFive}  options={{ headerShown: false }}
/>
          <Stack.Screen name="InviteMember" component={InviteMember} options={{ headerShown: false }}
 />
          <Stack.Screen name="ClickPhoto" component={ClickPhoto} options={{ headerShown: false }}
 />
          <Stack.Screen name="FolderTitle" component={FolderTitle} options={{ headerShown: false }}
 />
          <Stack.Screen name="QRcode" component={QRcode}  options={{ headerShown: false }}
/>
          <Stack.Screen name="Locking" component={Locking}  options={{ headerShown: false }}
/>
          <Stack.Screen name="MemberShare" component={MemberShare}  options={{ headerShown: false }}
/>
          <Stack.Screen name="YourOpinion" component={YourOpinion} options={{ headerShown: false }}
 />
          <Stack.Screen name="ContactUs" component={ContactUs}  options={{ headerShown: false }}
/>
          <Stack.Screen name="InviteHiveMember" component={InviteHiveMember}  options={{ headerShown: false }}
/>
          <Stack.Screen name="ManagePermissions" component={ManagePermissions}  options={{ headerShown: false }}
/>
          <Stack.Screen name="Language" component={Language}  options={{ headerShown: false }}
/>
          <Stack.Screen name="MyFriend" component={MyFriend}  options={{ headerShown: false }}
/>
          <Stack.Screen name="EditProfile" component={EditProfile}  options={{ headerShown: false }}
/>
          <Stack.Screen name="Chat" component={Chat}  options={{ headerShown: false }}
 />
          {/* demo camera ui */}
          <Stack.Screen name="ClickPhotoTwo" component={ClickPhotoTwo} options={{ headerShown: false }}/>
          <Stack.Screen name="ClickPhotoThree" component={ClickPhotoThree} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App