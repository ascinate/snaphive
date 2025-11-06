import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "../../assets/svg/back.svg";
import { Upload, UserPlus, Users, MessageCircle } from "lucide-react-native";
import ThemeButton from "./ThemeButton";
import { launchImageLibrary } from "react-native-image-picker";
const FolderLayout = ({ navigation, route }) => {
  const { image, folderName, date, owner, photos = [] } = route.params || {};
  const [selectedTab, setSelectedTab] = useState("Gallery");
  const [uploadedImage, setUploadedImage] = useState(null);

  // ✅ Add this function
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
        setUploadedImage(selectedImage.uri); // ✅ save selected image
      }
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header Image */}
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.folderImage} />

        {/* Top Bar (Back Button) */}
        <View style={styles.topBar}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View style={styles.iconButton}>
              <Back height={16} width={16} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        {/* Bottom Overlay */}
        <View style={styles.bottomOverlay}>
          <View>
            {folderName && <Text style={styles.folderHeading}>{folderName}</Text>}
            {date && (
              <Text style={styles.folderHeadingDate}>
                {new Date(date).toDateString()}
              </Text>
            )}
            {owner && (
              <View style={styles.profileIcon}>
                <Users color="#FFFFFF" width={16} height={16} />
                <Text style={{ color: "#FFFFFF" }}>{owner}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Content Area */}
      <View style={styles.container}>
        {/* Upload + Add Member */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemeButton
            text="Upload"
            icon={<Upload color="#fff" size={18} />}
            onPress={handleUpload} // ✅ fixed
            style={{ width: "78%" }}
          />


          <TouchableOpacity>
            <View style={styles.addMemberBtn}>
              <UserPlus width={20} height={20} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Tabs Section */}
        <View style={styles.tabsContainer}>
          {[
            { label: "Gallery", icon: <Upload width={16} height={16} color="#000" /> },
            { label: "Chat", icon: <MessageCircle width={16} height={16} color="#000" /> },
            { label: "Members", icon: <UserPlus width={16} height={16} color="#000" /> },
          ].map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tabButton,
                selectedTab === tab.label && styles.tabButtonActive,
              ]}
              onPress={() => setSelectedTab(tab.label)}
            >
              {tab.icon}
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab.label && styles.tabTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Scrollable Tab Content */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {selectedTab === "Gallery" && (
            <View style={styles.grid}>
              {photos && photos.length > 0 ? (
                photos.map((photo, index) => (
                  <View key={index} style={styles.photoContainer}>
                    <Image
                      source={{ uri: photo.uri }}
                      style={styles.photo}
                    />
                  </View>
                ))
              ) : (
                <Text
                  style={{
                    color: "#6B7280",
                    textAlign: "center",
                    marginTop: 20,
                    fontSize: 15,
                    width: '100%'
                  }}
                >
                  No photos yet in this hive.
                </Text>
              )}
            </View>
          )}

          {selectedTab === "Chat" && (
            <Text style={{ textAlign: "center", color: "#6B7280", marginTop: 20 }}>
              Chat feature coming soon 💬
            </Text>
          )}

          {selectedTab === "Members" && (
            <Text style={{ textAlign: "center", color: "#6B7280", marginTop: 20 }}>
              Members list will appear here 👥
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -60,
    padding: 20,
    backgroundColor: "#FDF2F6",
  },
  topBar: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  iconButton: {
    backgroundColor: "#D9D9D9C7",
    padding: 8,
    borderRadius: 20,
  },
  imageWrapper: {
    position: "relative",
  },
  folderImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
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
  folderHeading: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  folderHeadingDate: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 8,
  },
  profileIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  addMemberBtn: {
    paddingVertical: 21,
    paddingHorizontal: 25,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
    backgroundColor: "#F3F4F6",
    borderRadius: 40,
    paddingVertical: 8,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 22,
    paddingVertical: 6,
    borderRadius: 25,
  },
  tabButtonActive: {
    backgroundColor: "#fff",
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
    color: "#000",
    fontWeight: "700",
  },
  scrollContainer: {
    padding: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 12,
  },
  photoContainer: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 15,
  },
  photo: {
    width: "100%",
    height: "100%",
  },
});

export default FolderLayout;
