import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "../../assets/svg/back.svg";
import { Plus, Upload, UserPlus, Users } from "lucide-react-native";
import ThemeButton from "./ThemeButton";

//Image
const createEvent = require("../../assets/createEvent.png");
const picnic1 = require("../../assets/picnic1.jpg");
const picnic2 = require("../../assets/picnic2.jpg");
const picnic3 = require("../../assets/picnic3.jpg");
const picnic4 = require("../../assets/picnic4.jpg");

const FolderLayout = ({
  navigation,
  image,
  folderName,
  date,
  owner,
  inviteText,
  onInvitePress,
  children,
  showOverlay = true, // show/hide bottom overlay
  RightIcon,          // dynamic top-right icon
}) => {
  const [selectedTab, setSelectedTab] = useState("Gallery");

  const images = [picnic1, picnic2, picnic3, picnic4];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.imageWrapper}>
        {/* Header Image */}
        <Image source={image} style={styles.folderImage} />

        {/* Top bar with back & dynamic right icon */}
        <View style={styles.topBar}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View style={styles.iconButton}>
              <Back height={16} width={16} />
            </View>
          </TouchableWithoutFeedback>

          {RightIcon && (
            <TouchableWithoutFeedback onPress={() => console.log("Right icon pressed")}>
              <View style={styles.iconButton}>{RightIcon}</View>
            </TouchableWithoutFeedback>
          )}
        </View>

        {/* Bottom overlay */}
        {showOverlay && (folderName || date || owner || inviteText) && (
          <View style={styles.bottomOverlay}>
            <View>
              {folderName && <Text style={styles.folderHeading}>{folderName}</Text>}
              {date && <Text style={styles.folderHeadingDate}>{date}</Text>}
              {owner && (
                <View style={styles.profileIcon}>
                  <Users color="#FFFFFF" width={16} height={16} />
                  <Text style={{ color: "#FFFFFF" }}>{owner}</Text>
                </View>
              )}
            </View>

            {inviteText && (
              <TouchableWithoutFeedback onPress={onInvitePress}>
                <View style={styles.inviteButton}>
                  <Text style={styles.inviteText}>{inviteText}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        )}
      </View>

      {/* Dynamic content */}
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <ThemeButton
            text="Upload"
            icon={<Upload color="#fff" size={18} />}
            onPress={() => navigation.navigate("ClickPhotoThree")}
            style={{ width: "78%" }}
          />

          <TouchableOpacity>
            <View style={styles.addMemberBtn}>
              <UserPlus width={20} height={20} />
            </View>
          </TouchableOpacity>
          {/* i want to imepement tab feature here */}
        </View>

        {/* Tabs Section */}
        <View style={styles.tabsContainer}>
          {[
            { label: "Gallery", icon: <Upload width={16} height={16} color="#000" /> },
            { label: "Chat", icon: <Users width={16} height={16} color="#000" /> },
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
        {/* <Text>Under Component</Text> */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {images.map((img, index) => (
              <View key={index} style={styles.photoContainer}>
                <Image
                  source={typeof img === "object" && img.uri ? { uri: img.uri } : img}
                  style={styles.photo}
                />
              </View>
            ))}
          </View>
        </ScrollView>
        {/* <Text>New Screen</Text> */}
        {children}
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
  inviteButton: {
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: 15,
  },
  inviteText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
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
  //tab menu
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
  //image scroll
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
