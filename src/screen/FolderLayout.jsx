import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Plus,
  Users,
  SmilePlus,
  Images,
  Video,
  MessagesSquare,
  Share,
  EllipsisVertical,
  CameraIcon,
  ImagePlus,
  SendHorizonal,
  Send,
  ImagePlusIcon,
} from "lucide-react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

// SVGs
import QR from "../../assets/svg/qr.svg";

// Components
import ScreenLayout from "../components/ScreenLayout";
import CustomText from "../components/CustomText";
import SearchBar from "../components/SearchBar";
import MembersModal from "../components/MembersModal";
import { colors } from "../Theme/theme";

// Images
const createEvent = require("../../assets/background.png");
const profilePic = require("../../assets/picnic1.jpg");
const dp = require("../../assets/dp.jpg");
const dp2 = require("../../assets/dp2.webp");
const dp3 = require("../../assets/dp3.jpg");
const dp4 = require("../../assets/dp4.jpg");
const dp5 = require("../../assets/dp5.jpg");
const dp6 = require("../../assets/dp6.jpg");
const dp7 = require("../../assets/dp7.jpg");
const dp8 = require("../../assets/dp8.jpg");
const picnic1 = require("../../assets/picnic1.jpg");

const FolderLayout = ({ navigation, route }) => {
  const {
    image,
    folderName,
    date,
    owner,
    photos = [],
    eventTitle,
    eventDescription,
    eventEndTime,
    eventExpiryDate
  } = route.params || {};

  const [selectedTab, setSelectedTab] = useState("Gallery");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const formatDisplayDate = (date) => {
    if (!date) return 'N/A';
    const dateObj = date instanceof Date ? date : new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDisplayTime = (date) => {
    if (!date) return 'N/A';
    const dateObj = date instanceof Date ? date : new Date(date);
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    loadSavedImages();
  }, []);

  const loadSavedImages = async () => {
    try {
      const saved = await AsyncStorage.getItem(`folder_${folderName}`);
      if (saved) {
        setUploadedImages(JSON.parse(saved));
      }
    } catch (e) {
      console.log("Failed to load images", e);
    }
  };

  const handleUpload = async () => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
      quality: 0.8,
      selectionLimit: 0,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel || response.errorCode) return;

      if (response.assets && response.assets.length > 0) {
        const newUris = response.assets.map(item => item.uri);

        const newImages = [...uploadedImages, ...newUris];
        setUploadedImages(newImages);

        await AsyncStorage.setItem(
          `folder_${folderName}`,
          JSON.stringify(newImages)
        );

        console.log("Images saved:", newImages.length);
      }
    });
  };

  const members = [
    { id: 1, name: "Demola Aoki", dp: dp },
    { id: 2, name: "Sofia Carrington", dp: dp3 },
  ];

  return (
    <ScreenLayout
      navigation={navigation}
      image={createEvent}
      folderName="Janifer Danis"
      date="+91 1841 510 1450"
      RightIcon={
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <EllipsisVertical height={width * 0.04} width={width * 0.04} />
        </TouchableOpacity>
      }
      OverlayContent={
        <View style={styles.profileOverlay}>
          <CustomText weight="bold" style={{ color: '#fff', fontSize: width * 0.075 }}>
            {eventTitle || folderName || '2025 Picnic'}
          </CustomText>
          <CustomText weight="medium" style={{ color: '#fff', fontSize: width * 0.035, marginBottom: height * 0.025 }}>
            {eventDescription || 'It is a long established fact that'}
          </CustomText>

          <View style={styles.rowBetween}>
            <TouchableOpacity
              style={styles.importBtnWhite}
              onPress={handleUpload}
            >
              <View>
                <Plus color="#DA3C84" size={width * 0.05} />
              </View>
              <CustomText weight="bold" style={{ color: '#DA3C84', fontSize: width * 0.035 }}>
                My Images
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.importBtnWhite, { backgroundColor: '#000000ff' }]}
              onPress={() => setModalVisible(true)}
            >
              <View>
                <Users color="#ffffff" size={width * 0.05} />
              </View>
              <CustomText weight="bold" style={{ color: '#ffffff', fontSize: width * 0.035 }}>
                Members (10)
              </CustomText>
            </TouchableOpacity>
          </View>

          {menuVisible && (
            <View
              style={{
                position: 'absolute',
                top: 25,
                right: -5,
                backgroundColor: '#fff',
                paddingVertical: 10,
                borderRadius: 10,
                width: 180,
                elevation: 10,
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 2 },
                zIndex: 999,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate("ManagePermissions");
                }}
                style={{ paddingVertical: 12, paddingHorizontal: 16 }}
              >
                <CustomText weight="medium">Manage Permissions</CustomText>
              </TouchableOpacity>

              <View style={{ height: 1, backgroundColor: '#E5E7EB' }} />

              <TouchableOpacity
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate("InviteMember");
                }}
                style={{ paddingVertical: 12, paddingHorizontal: 16 }}
              >
                <CustomText weight="medium">Invite Member</CustomText>
              </TouchableOpacity>
            </View>
          )}
        </View>
      }
    >
      <View style={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {[
              { label: "Gallery", icon: <Images width={width * 0.04} height={width * 0.04} stroke={selectedTab === "Gallery" ? "#fff" : "#000"} /> },
              { label: "Chat", icon: <Video width={width * 0.04} height={width * 0.04} stroke={selectedTab === "Chat" ? "#fff" : "#000"} /> },
              { label: "Ai Magic", icon: <MessagesSquare width={width * 0.04} height={width * 0.04} stroke={selectedTab === "Ai Magic" ? "#fff" : "#000"} /> },
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

          <ScrollView
            style={{ flex: 1 }}
          
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
              <>
                <SearchBar />
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ flexDirection: 'row', gap: width * 0.025, paddingHorizontal: width * 0.0375, paddingVertical: height * 0.0125 }}>
                  <View style={styles.allMembarShadowWrapper}>
                    <Image source={profilePic} style={styles.allMembarDp} />
                  </View>
                  <View style={styles.allMembarShadowWrapper}>
                    <Image source={profilePic} style={styles.allMembarDp} />
                  </View>
                  <View style={styles.allMembarShadowWrapper}>
                    <Image source={profilePic} style={styles.allMembarDp} />
                  </View>
                  <View style={styles.allMembarShadowWrapper}>
                    <Image source={profilePic} style={styles.allMembarDp} />
                  </View>
                  <View style={styles.allMembarShadowWrapper}>
                    <Image source={profilePic} style={styles.allMembarDp} />
                  </View>
                  <View style={styles.allMembarShadowWrapper}>
                    <Image source={profilePic} style={styles.allMembarDp} />
                  </View>
                  <View style={styles.allMembarShadowWrapper}>
                    <Image source={profilePic} style={styles.allMembarDp} />
                  </View>
                  <View style={styles.allMembarShadowWrapper}>
                    <Image source={profilePic} style={styles.allMembarDp} />
                  </View>
                </ScrollView>

                <View style={styles.chatList}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Chat")}
                  >
                    <View style={styles.shadowWrapper}>
                      <View style={styles.chatListItem}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.0375 }}>
                          <Image source={profilePic} style={styles.dp} />
                          <View>
                            <CustomText weight="bold">User name</CustomText>
                            <CustomText weight="medium"
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={{ maxWidth: width * 0.4, fontSize: width * 0.03, color: '#888888' }}
                            >It is a long established fact that a reader will be distracted by the readable content.</CustomText>
                          </View>
                        </View>
                        <View style={{ alignItems: 'flex-end', minWidth: width * 0.15 }}>
                          <CustomText weight="medium" style={{ fontSize: width * 0.03 }}>5 Hours ago</CustomText>
                          <View style={{
                            backgroundColor: '#FF0800',
                            width: width * 0.05,
                            height: width * 0.05,
                            borderRadius: width * 0.025,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: height * 0.0075
                          }}>
                            <CustomText weight="medium" style={{ color: '#fff' }}>1</CustomText>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>

          {selectedTab === "Ai Magic" && (
            <View style={styles.aiMagicContainer}>
              <ScrollView
                style={styles.aiMagicScrollView}
                contentContainerStyle={styles.aiMagicContent}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.messagesContainer}>
                  {/* User Message */}
                  <View style={styles.userTwoMessageBox}>
                    <View style={styles.messageText}>
                      <CustomText weight="medium" style={[styles.text, { color: '#3d3d3dff', fontSize: width * 0.03 }]}>
                        Hey! Turn this photo into a Pixar-style 3D character with a vibrant, futuristic city background — make the colors neon and give the character a confident hero pose!
                      </CustomText>
                    </View>
                    <CustomText weight="medium" style={{ fontSize: width * 0.025, color: '#888' }}>01:00 am</CustomText>
                  </View>

                  {/* AI Response */}
                  <View style={styles.userOneMessageBox}>
                    <View style={styles.messageTextLeft}>
                      <CustomText weight="medium" style={[styles.textLeft, { color: '#ffffffff', fontSize: width * 0.03 }]}>
                        Sure! I can help with that. Just upload your image or describe exactly what style you want — realistic, cartoon, anime, cyberpunk… I'm ready when you are!
                      </CustomText>
                    </View>
                    <CustomText weight="medium" style={{ fontSize: width * 0.025, color: '#888' }}>01:00 am</CustomText>
                  </View>

                  {/* AI Response */}
                  <View style={styles.userOneMessageBox}>
                    <View style={styles.messageTextLeft}>
                      <CustomText weight="medium" style={[styles.textLeft, { color: '#ffffffff', fontSize: width * 0.03 }]}>
                        Sure! I can help with that. Just upload your image or describe exactly what style you want — realistic, cartoon, anime, cyberpunk… I'm ready when you are!Sure! I can help with that. Just upload your image or describe exactly what style you want — realistic, cartoon, anime, cyberpunk… I'm ready when you are!
                      </CustomText>
                    </View>
                    <CustomText weight="medium" style={{ fontSize: width * 0.025, color: '#888' }}>01:00 am</CustomText>
                  </View>
                </View>
              </ScrollView>

              {/* Input Box - Fixed at bottom */}
              <View style={styles.aiMagicInputContainer}>
                <View style={styles.aiMagicInputWrapper}>
                  <TouchableOpacity style={{ marginRight: 10 }}>
                    <ImagePlus size={22} color="#6B7280" />
                  </TouchableOpacity>

                  <TextInput
                    placeholder="Ask anything..."
                    placeholderTextColor="#9CA3AF"
                    style={styles.aiMagicInput}
                  />

                  <TouchableOpacity style={styles.aiMagicSendButton}>
                    <SendHorizonal size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          <MembersModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.05,
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
    gap: width * 0.05,
    justifyContent: "space-between",
  },

  bottomOverlay: {
    position: "absolute",
    bottom: height * 0.1125,
    left: width * 0.05,
    right: width * 0.05,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: height * 0.025,
    borderRadius: 40,
    paddingVertical: height * 0.01,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.015,
    paddingHorizontal: width * 0.055,
    paddingVertical: height * 0.0075,
    borderWidth: 1,
    borderColor: '#D0CACA',
    borderRadius: 4,
  },
  tabButtonActive: {
    backgroundColor: "#DA3C84",
    borderWidth: 1,
    borderColor: '#DA3C84',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  tabText: {
    color: "#888888",
    fontSize: width * 0.0375,
    fontWeight: "500",
  },
  tabTextActive: {
    color: '#ffffff',
    fontWeight: "700",
  },
  iconInactive: {
    color: '#000'
  },
  iconActive: {
    color: '#fff'
  },

  grid: {
    width: '100%',
    marginTop: height * 0.0125,
    alignItems: 'center',
  },

  imageWrapperRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  imageGridOne: {
    width: '48%',
    height: height * 0.2,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    marginBottom: height * 0.0187,
  },
  imageGridTwo: {
    width: '48%',
    height: height * 0.3,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    marginBottom: height * 0.0187,
  },
  imageGridThree: {
    width: '48%',
    height: height * 0.3,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    marginBottom: height * 0.0187,
    marginTop: height * -0.1,
  },
  imageGridFour: {
    width: '48%',
    height: height * 0.2,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    marginBottom: height * 0.0187,
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoText: {
    textAlign: "center",
    color: "#888888",
    marginTop: height * 0.025,
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
    marginVertical: height * 0.0125,
  },
  chatList: {
    marginTop: height * 0.025,
  },
  chatListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: height * 0.025,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    paddingVertical: height * 0.0187,
    paddingHorizontal: width * 0.03,
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowColor: '#acacacff',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 12,
  },

  dp: {
    width: width * 0.1275,
    height: width * 0.1275,
    borderRadius: width * 0.06375,
    resizeMode: "cover",
  },
  allMembarDp: {
    width: width * 0.1375,
    height: width * 0.1375,
    borderRadius: width * 0.06875,
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: '#ffffff',
  },

  allMembarShadowWrapper: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7a7979ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.20,
    shadowRadius: 6,
    elevation: 6,
  },

  aiMagicContainer: {
    flex: 1,
    position: 'relative',
    height: 490,
  },
  aiMagicScrollView: {
    flex: 1,
  },
  aiMagicContent: {
    paddingBottom: height * 0.10,

  },
  messagesContainer: {
    flex: 1,
  },
  userOneMessageBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: width * 0.025,
    marginVertical: height * 0.015,
    maxWidth: '80%',
  },
  userTwoMessageBox: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    gap: width * 0.025,
    marginVertical: height * 0.010,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  messageText: {
    borderRadius: 10,
    backgroundColor: '#fee8a3',
    paddingVertical: height * 0.0137,
    paddingHorizontal: width * 0.04,
    maxWidth: width * 0.6625,
    height: 'auto',
    shadowColor: '#acacacff',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 12,
  },
  messageTextLeft: {
    borderRadius: 10,
    backgroundColor: '#cc4faa',
    paddingVertical: height * 0.0137,
    paddingHorizontal: width * 0.04,
    maxWidth: width * 0.6625,
    height: 'auto',
    shadowColor: '#acacacff',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 12,
  },
  text: {
    color: '#ffffff',
    fontWeight: '600',
  },
  textLeft: {
    color: '#636363',
    fontWeight: '600',
  },
  aiMagicInputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: width * 0.0,
    paddingBottom: height * 0.015,
    paddingTop: height * 0.01,
    backgroundColor: '#FAFAF9',

  },
  aiMagicInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.035,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#888888ff',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  aiMagicInput: {
    flex: 1,
    fontSize: width * 0.04,
    color: '#111827',
    paddingHorizontal: width * 0.015,
  },
  aiMagicSendButton: {
    backgroundColor: '#DA3C84',
    width: width * 0.105,
    height: width * 0.105,
    borderRadius: width * 0.0525,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * 0.02,
  },
});

export default FolderLayout;