// import React, { useEffect, useState } from "react";
// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert} from "react-native";

// // svg
// import QR from "../../assets/svg/qr.svg";
// import Language from "../../assets/svg/language.svg";
// import Premium from "../../assets/svg/premium.svg";
// import RightArrow from "../../assets/svg/rightArrow.svg";
// import NavMessage from "../../assets/svg/navMessage.svg";
// import Heart from "../../assets/svg/heart.svg";
// import Share from "../../assets/svg/share.svg";
// import Pencil from "../../assets/svg/pencil.svg";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// // components
// import FolderLayout from "../components/FolderLayout";
// import PremiumModal from "../components/PremiumModal";
// import CustomText from '../components/CustomText';
// const createEvent = require("../../assets/profile.jpg");
// const beforeImage = require("../../assets/selfie.jpg");
// const afterImage = require("../../assets/dp3.jpg");

// const CreateEventFive = ({ navigation,state }) => {
// const [modalVisible, setModalVisible] = useState(false);
//   const [user, setUser] = useState(null);
//    useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const storedUser = await AsyncStorage.getItem("user");
//         if (storedUser) {
//           setUser(JSON.parse(storedUser));
//           console.log("Loaded user:", JSON.parse(storedUser));
//         }
//       } catch (error) {
//         console.log("Error loading user:", error);
//       }
//     };
//     fetchUser();
//   }, []);

//  const handleLogout = async () => {
//     try {
//       await AsyncStorage.removeItem("token");
//       await AsyncStorage.removeItem("user");
//       Alert.alert("Logout", "You have been logged out.", [
//         { text: "OK", onPress: () => navigation.navigate("Landing") },
//       ]);
//     } catch (err) {
//       Alert.alert("Error", "Failed to logout. Please try again.");
//     }
//   };


//   return (
//     <FolderLayout
//       navigation={navigation}
//       image={createEvent}
//       folderName={user ? user.name : "Loading..."}
//       date={user ? user.email : ""}
//       RightIcon={<Pencil height={16} width={16} onPress={() => navigation.navigate("EditProfile")} />}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//         {/* Account Section */}
//         <CustomText weight="medium" style={styles.category}>Account</CustomText>
//         <TouchableOpacity style={styles.rowProfile} onPress={() => navigation.navigate("Language")}>
//           <View style={styles.iconBox}><Language width={20} height={20} /></View>
//           <View style={styles.textBox}>
//             <CustomText weight="bold" style={styles.title}>Language</CustomText>
//             <CustomText weight="medium" style={styles.subtitle}>English</CustomText>
//           </View>
//           <RightArrow />
//         </TouchableOpacity>



//         <TouchableOpacity style={styles.rowProfile} onPress={handleLogout}>
//           <View style={styles.iconBox}><QR width={20} height={20} /></View>
//           <View style={styles.textBox}>
//             <CustomText weight="bold" style={styles.title}>Logout</CustomText>
//             <CustomText weight="medium" style={styles.subtitle}>redirect to landing page</CustomText>
//           </View>
//           <RightArrow />
//         </TouchableOpacity>

//         {/* Benefit Section */}
//         <CustomText weight="medium" style={styles.category}>Benefit</CustomText>
//         <TouchableOpacity style={styles.rowProfile} onPress={() => setModalVisible(true)}>
//           <View style={styles.iconBox}><Premium width={20} height={20} /></View>
//           <View style={styles.textBox}>
//             <CustomText weight="bold" style={styles.title}>Premium</CustomText>
//             <CustomText weight="medium" style={styles.subtitle}>Unlock all features</CustomText>
//           </View>
//           <RightArrow />
//         </TouchableOpacity>

//         {/* Other Section */}
//         <CustomText weight="medium" style={styles.category}>Other</CustomText>
//         <TouchableOpacity style={styles.rowProfile} onPress={() => navigation.navigate("ContactUs")}>
//           <View style={styles.iconBox}><NavMessage width={20} height={20} /></View>
//           <View style={styles.textBox}>
//             <CustomText weight="bold" style={styles.title}>Contact Us</CustomText>
//             <CustomText weight="medium" style={styles.subtitle}>Get support anytime</CustomText>
//           </View>
//           <RightArrow />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.rowProfile} onPress={() => navigation.navigate("YourOpinion")}>
//           <View style={styles.iconBox}><Heart width={20} height={20} /></View>
//           <View style={styles.textBox}>
//             <CustomText weight="bold" style={styles.title}>Give us feedback</CustomText>
//             <CustomText weight="medium" style={styles.subtitle}>Love the app? Leave us a review</CustomText>
//           </View>
//           <RightArrow />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.rowProfile} onPress={() => navigation.navigate("NewPage")}>
//           <View style={styles.iconBox}><Share width={20} height={20} /></View>
//           <View style={styles.textBox}>
//             <CustomText weight="bold" style={styles.title}>Share the app</CustomText>
//             <CustomText weight="medium" style={styles.subtitle}>Invite your friends to try Airbum</CustomText>
//           </View>
//           <RightArrow />
//         </TouchableOpacity>




//         {/* Modal */}
//         <PremiumModal
//           visible={modalVisible}
//           onClose={() => setModalVisible(false)}
//           beforeImage={beforeImage}
//           afterImage={afterImage}
//         />

//       </ScrollView>
//     </FolderLayout>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: { padding: 20, paddingBottom: 80 },
//   category: { fontSize: 14, fontWeight: "600", color: "#666", marginBottom: 12, marginTop: 20, textTransform: "uppercase" },
//   rowProfile: { flexDirection: "row", alignItems: "center", paddingVertical: 14, borderRadius: 12, marginBottom: 15 },
//   iconBox: { width: 32, height: 32, borderRadius: 16, justifyContent: "center", alignItems: "center", marginRight: 12 },
//   textBox: { flex: 1 },
//   title: { fontSize: 16, fontWeight: "500", color: "#1C1C1C" },
//   subtitle: { fontSize: 13, color: "#888", marginTop: 2 },
// });

// export default CreateEventFive;

// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   Alert,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // components
// import TopNav from '../components/TopNavbar';
// import ThemeButton from '../components/ThemeButton';
// import CustomText from '../components/CustomText';
// import PremiumModal from '../components/PremiumModal';

// // icons from lucide-react-native
// import {
//   Languages,
//   QrCode,
//   Crown,
//   MessageCircle,
//   Heart,
//   Share2,
//   ChevronRight,
//   LogOut,
// } from 'lucide-react-native';

// const { width } = Dimensions.get('window');

// const Profile = () => {
//   const navigation = useNavigation();

//   // 🧩 Modal State
//   const [modalVisible, setModalVisible] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.removeItem('token');
//       await AsyncStorage.removeItem('user');
//       Alert.alert('Logout', 'You have been logged out.', [
//         { text: 'OK', onPress: () => navigation.navigate('Landing') },
//       ]);
//     } catch (err) {
//       Alert.alert('Error', 'Failed to logout. Please try again.');
//     }
//   };

//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={styles.safeArea}>
//         <TopNav />

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContainer}
//         >
//           {/* 🧭 Account Section */}
//           <CustomText weight="medium" style={styles.category}>
//             Account
//           </CustomText>

//           <TouchableOpacity
//             style={styles.rowProfile}
//             onPress={() => navigation.navigate('Language')}
//           >
//             <View style={styles.iconBox}>
//               <Languages size={20} color="#F98935" />
//             </View>
//             <View style={styles.textBox}>
//               <CustomText weight="bold" style={styles.title}>
//                 Language
//               </CustomText>
//               <CustomText weight="medium" style={styles.subtitle}>
//                 English
//               </CustomText>
//             </View>
//             <ChevronRight color="#B0B0B0" size={18} />
//           </TouchableOpacity>



//           {/* 💎 Benefit Section */}
//           <CustomText weight="medium" style={styles.category}>
//             Benefit
//           </CustomText>

//           <TouchableOpacity
//             style={styles.rowProfile}
//             onPress={() => setModalVisible(true)} // ✅ open Premium modal
//           >
//             <View style={styles.iconBox}>
//               <Crown size={20} color="#F98935" />
//             </View>
//             <View style={styles.textBox}>
//               <CustomText weight="bold" style={styles.title}>
//                 Premium
//               </CustomText>
//               <CustomText weight="medium" style={styles.subtitle}>
//                 Unlock all features
//               </CustomText>
//             </View>
//             <ChevronRight color="#B0B0B0" size={18} />
//           </TouchableOpacity>

//           {/* 💬 Other Section */}
//           <CustomText weight="medium" style={styles.category}>
//             Other
//           </CustomText>

//           <TouchableOpacity
//             style={styles.rowProfile}
//             onPress={() => navigation.navigate('ContactUs')}
//           >
//             <View style={styles.iconBox}>
//               <MessageCircle size={20} color="#F98935" />
//             </View>
//             <View style={styles.textBox}>
//               <CustomText weight="bold" style={styles.title}>
//                 Contact Us
//               </CustomText>
//               <CustomText weight="medium" style={styles.subtitle}>
//                 Get support anytime
//               </CustomText>
//             </View>
//             <ChevronRight color="#B0B0B0" size={18} />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.rowProfile}
//             onPress={() => navigation.navigate('YourOpinion')}
//           >
//             <View style={styles.iconBox}>
//               <Heart size={20} color="#F98935" />
//             </View>
//             <View style={styles.textBox}>
//               <CustomText weight="bold" style={styles.title}>
//                 Give us feedback
//               </CustomText>
//               <CustomText weight="medium" style={styles.subtitle}>
//                 Love the app? Leave us a review
//               </CustomText>
//             </View>
//             <ChevronRight color="#B0B0B0" size={18} />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.rowProfile}
//             onPress={() => navigation.navigate('NewPage')}
//           >
//             <View style={styles.iconBox}>
//               <Share2 size={20} color="#F98935" />
//             </View>
//             <View style={styles.textBox}>
//               <CustomText weight="bold" style={styles.title}>
//                 Share the app
//               </CustomText>
//               <CustomText weight="medium" style={styles.subtitle}>
//                 Invite your friends to try Airbum
//               </CustomText>
//             </View>
//             <ChevronRight color="#B0B0B0" size={18} />
//           </TouchableOpacity>

//           {/* <ThemeButton
//             text="Logout"
//             onPress={handleLogout}
//             style={styles.logoutButton}
//           /> */}

//           <TouchableOpacity style={[styles.rowProfile, { borderBottomWidth: 0 }]} onPress={handleLogout}>
//             <View style={[styles.iconBox, { backgroundColor: '#ffe2e2ff' }]}>
//               <LogOut size={20} color="#ff1f1fff" />
//             </View>
//             <View style={styles.textBox}>
//               <CustomText weight="bold" style={styles.title}>
//                 Logout
//               </CustomText>
//             </View>

//           </TouchableOpacity>
//         </ScrollView>

//         {/* 🪟 Premium Modal */}
//         <PremiumModal
//           visible={modalVisible}
//           onClose={() => setModalVisible(false)}
//         />
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// };

// // 🎨 STYLES
// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContainer: {
//     paddingVertical: 20,
//     paddingHorizontal: width * 0.06,
//     backgroundColor: '#fff',
//   },
//   category: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#F98935',
//     marginTop: 25,
//     marginBottom: 10,
//     textTransform: 'uppercase',
//   },
//   rowProfile: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F2F2F2',
//   },
//   iconBox: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: '#FFF3E6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   textBox: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 16,
//     color: '#111',
//   },
//   subtitle: {
//     fontSize: 13,
//     color: '#777',
//     marginTop: 2,
//   },
//   logoutButton: {
//     marginTop: 40,
//     marginBottom: 60,
//     width: '60%',
//     alignSelf: 'center',
//   },
// });

// export default Profile;


import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ChevronRight, Crown, Languages, LogOut, Share2,
  QrCode,
  MessageCircle,
  Heart,
  Upload,
  UserPlus,
  Plus,
  Users,
} from "lucide-react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

// SVGs
import Pencil from "../../assets/svg/pencil.svg";

// Components
import ScreenLayout from "../components/ScreenLayout";
import CustomText from "../components/CustomText";


// Images
const createEvent = require("../../assets/background.png");
const profilePic = require("../../assets/picnic1.jpg");

const FolderLayout = ({ navigation, route }) => {
  const { image, folderName, date, owner, photos = [] } = route.params || {};
  const [selectedTab, setSelectedTab] = useState("Gallery");
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleUpload = () => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
      quality: 0.8,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        console.log("Selected image:", selectedImage.uri);
        setUploadedImages((prev) => [...prev, selectedImage.uri]);
      }
    });
  };


  return (
    <ScreenLayout
      navigation={navigation}
      image={createEvent}
      folderName="Janifer Danis"
      date="+91 1841 510 1450"
      RightIcon={
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <Pencil height={16} width={16} />
        </TouchableOpacity>
      }

      OverlayContent={
        <View style={styles.profileOverlay}>
          <CustomText weight="bold" style={{ color: '#fff', fontSize: 30 }}>2025 Picnic</CustomText>
          <CustomText weight="medium" style={{ color: '#fff', fontSize: 14, marginBottom: 20 }}>It is a long established fact that</CustomText>
          <View style={styles.rowBetween}>

            <TouchableOpacity
              style={styles.importBtnWhite}
              onPress={handleUpload}
            >
              <View>
                <Plus color="#EA580B" size={20} />
              </View>
              <CustomText weight="bold" style={{ color: '#EA580B', fontSize: 14, }}>
                Uplaod Media
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.importBtnWhite, { backgroundColor: '#000000ff' }]}
              onPress={handleUpload}
            >
              <View>
                <Users color="#ffffff" size={20} />
              </View>
              <CustomText weight="bold" style={{ color: '#ffffff', fontSize: 14, }}>
                Members (10)
              </CustomText>
            </TouchableOpacity>

          </View>
        </View>
      }
    >

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >

        {/* Content Area */}
        <View style={styles.container}>
          {/* Upload + Add Member */}


          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {[
              { label: "Gallery", icon: <Upload width={16} height={16} color="#000" /> },
              { label: "Chat", icon: <MessageCircle width={16} height={16} color="#000" /> },
              { label: "Members", icon: <UserPlus width={16} height={16} color="#000" /> },
            ].map((tab, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.tabButton, selectedTab === tab.label && styles.tabButtonActive]}
                onPress={() => setSelectedTab(tab.label)}
              >
                {tab.icon}
                <Text
                  style={[styles.tabText, selectedTab === tab.label && styles.tabTextActive]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          {/* Tab Content */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
    {selectedTab === "Gallery" && (
  <View style={styles.grid}>
    {uploadedImages.length === 0 ? (
      <Text style={styles.infoText}>No photos</Text>
    ) : (
      <View style={styles.imageWrapperRow}>
        {uploadedImages.map((uri, index) => {
          let styleToApply = {};
          // Loop positions using modulo 4
          const pos = index % 4;
          
          if (pos === 0) styleToApply = styles.imageGridOne;
          else if (pos === 1) styleToApply = styles.imageGridTwo;
          else if (pos === 2) styleToApply = styles.imageGridThree;
          else if (pos === 3) styleToApply = styles.imageGridFour;

          return (
            <View key={`uploaded-${index}`} style={styleToApply}>
              <Image source={{ uri }} style={styles.photo} />
            </View>
          );
        })}
      </View>
    )}
  </View>
)}

            {selectedTab === "Chat" && (
              <Text style={styles.infoText}>Chat feature coming soon 💬</Text>
            )}

            {selectedTab === "Members" && (
              <Text style={styles.infoText}>Members list will appear here 👥</Text>
            )}
          </ScrollView>

        </View>













      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    backgroundColor: "#FAFAF9",
  },

  textBox: {
    flex: 1,
  },

  profileOverlay: {
    alignItems: "center",

  },

  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    justifyContent: "space-between",
  },

  bottomOverlay: {
    position: "absolute",
    bottom: 90,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
    borderRadius: 40,
    paddingVertical: 8,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 22,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#D0CACA',
    borderRadius: 4,
  },
  tabButtonActive: {
    backgroundColor: "#E1711C",
    borderWidth: 1,
    borderColor: '#E1711C',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  tabText: {
    color: "#6B7280",
    fontSize: 15,
    fontWeight: "500",
  },
  tabTextActive: {
    color: '#ffffff',
    fontWeight: "700",
  },


  grid: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },

  imageWrapperRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 15,
    width: '100%',
  },
  imageWrapperRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  imageGridOne: {
    width: '48%',
    height: 160,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    marginBottom: 15,
  },
  imageGridTwo: {
    width: '48%',
    height: 240,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    marginBottom: 15,
  },
  imageGridThree: {
    width: '48%',
    height: 240,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    marginBottom: 15,
    marginTop: -80,
  },
  imageGridFour: {
    width: '48%',
    height: 160,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    marginBottom: 15,
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 20,
  },
  importBtnWhite: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: width * 0.02,
    backgroundColor: '#FFFFFF',
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.050,
    borderRadius: 14,
    marginVertical: 10,
  },
});

export default FolderLayout;

