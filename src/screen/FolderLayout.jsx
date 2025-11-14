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
  Plus,
  Users,
  SmilePlus,
  Images,
  Video,
  MessagesSquare,
} from "lucide-react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

// SVGs
import Pencil from "../../assets/svg/pencil.svg";

// Components
import ScreenLayout from "../components/ScreenLayout";
import CustomText from "../components/CustomText";
import SearchBar from "../components/SearchBar";
import MembersModal from "../components/MembersModal";

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

const FolderLayout = ({ navigation, route }) => {
  const { image, folderName, date, owner, photos = [] } = route.params || {};
  const [selectedTab, setSelectedTab] = useState("Gallery");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
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
              onPress={() => setModalVisible(true)}
            >
              <View>
                <Users color="#ffffff" size={20} />
              </View>
              <CustomText weight="bold" style={{ color: '#ffffff', fontSize: 14, }}>
                Members (10)
              </CustomText>
            </TouchableOpacity>

            {/* <TouchableOpacity
          style={styles.rowProfile}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.iconBox}>
            <Crown size={20} color="#F98935" />
          </View>
          <View style={styles.textBox}>
            <CustomText weight="bold" style={styles.title}>
              Premium
            </CustomText>
            <CustomText weight="medium" style={styles.subtitle}>
              Unlock all features
            </CustomText>
          </View>
          <ChevronRight color="#B0B0B0" size={18} />
        </TouchableOpacity> */}

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
              { label: "Gallery", icon: <Images width={16} height={16} stroke={selectedTab === "Gallery" ? "#fff" : "#000"} /> },
              { label: "Chat", icon: <Video width={16} height={16} stroke={selectedTab === "Chat" ? "#fff" : "#000"} /> },
              { label: "Members", icon: <MessagesSquare width={16} height={16} stroke={selectedTab === "Members" ? "#fff" : "#000"} /> },
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
              <>
                <SearchBar />
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ flexDirection: 'row', gap: 10, paddingHorizontal: 15, paddingVertical: 10 }}>
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
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                          <Image source={profilePic} style={styles.dp} />
                          <View>
                            <CustomText weight="bold">User name</CustomText>
                            <CustomText weight="medium"
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={{ maxWidth: 160, fontSize: 12, color: '#888888' }}
                            >It is a long established fact that a reader will be distracted by the readable content.</CustomText>
                          </View>
                        </View>
                        <View style={{ alignItems: 'flex-end', minWidth: 60 }}>
                          <CustomText weight="medium" style={{ fontSize: 12 }}>5 Hours ago</CustomText>
                          <View style={{
                            backgroundColor: '#FF0800',
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 6
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

            {selectedTab === "Members" && (
              <>
                <View style={[styles.feedItem, { marginTop: 20 }]}>
                  <View >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginBottom: 10 }}>
                      <Image source={profilePic} style={styles.feedDp} />
                      <View>
                        <View>
                          <CustomText weight="bold">User name</CustomText>
                          <CustomText weight="medium" style={{ maxWidth: 280, fontSize: 12, color: '#888888' }}>Nov 10 at 06:45 AM</CustomText>
                        </View>

                      </View>
                    </View>
                    <View>
                      <CustomText weight="medium"
                        numberOfLines={3}
                        ellipsizeMode="tail"
                        style={{ maxWidth: 320, fontSize: 12, color: '#888888' }}
                      >It is a long established fact that a reader will be distracted by the readable content.It is a long established fact.</CustomText>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 15, paddingRight: 10 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 25, gap: 6 }}>
                        <SmilePlus size={16} />
                        <CustomText weight="bold" style={{ fontSize: 12 }}>React</CustomText>
                      </View>
                      <CustomText weight="bold" style={{ fontSize: 12 }}>Reply</CustomText>
                    </View>
                  </View>
                </View>

                <View style={[styles.feedItem, { marginTop: 0 }]}>
                  <View >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginBottom: 10 }}>
                      <Image source={profilePic} style={styles.feedDp} />
                      <View>
                        <View>
                          <CustomText weight="bold">User name</CustomText>
                          <CustomText weight="medium" style={{ maxWidth: 280, fontSize: 12, color: '#888888' }}>Nov 10 at 06:45 AM</CustomText>
                        </View>

                      </View>
                    </View>
                    <View>
                      <CustomText weight="medium"
                        numberOfLines={3}
                        ellipsizeMode="tail"
                        style={{ maxWidth: 320, fontSize: 12, color: '#888888' }}
                      >It is a long established fact that a reader will be distracted by the readable content.It is a long established fact.</CustomText>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 15, paddingRight: 10 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 25, gap: 6 }}>
                        <SmilePlus size={16} />
                        <CustomText weight="bold" style={{ fontSize: 12 }}>React</CustomText>
                      </View>
                      <CustomText weight="bold" style={{ fontSize: 12 }}>Reply</CustomText>
                    </View>
                  </View>
                </View>
              </>

            )}
          </ScrollView>
          <MembersModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
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
    color: "#888888",
    fontSize: 15,
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
    color: "#888888",
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
  chatList: {
    marginTop: 20,
  },
  chatListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    paddingVertical: 15,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowColor: '#acacacff',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 12,
  },
  feedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    paddingVertical: 15,
    paddingHorizontal: 13,
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowColor: '#acacacff',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 12,
  },




  dp: {
    width: 51,
    height: 51,
    borderRadius: 25.5,
    resizeMode: "cover",
  },
  allMembarDp: {
    width: 55,
    height: 55,
    borderRadius: 25.5,
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: '#ffffff',
  },




  allMembarShadowWrapper: {
    width: 60,
    height: 60,
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
  feedDp: {
    width: 41,
    height: 41,
    borderRadius: 25.5,
    resizeMode: "cover",
  },
});

export default FolderLayout;

