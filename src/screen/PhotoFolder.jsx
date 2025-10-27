import React, { useState } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import FolderLayout from "../components/FolderLayout";
import QR from "../../assets/svg/qr.svg";
import ThemeButton from "../components/ThemeButton";

// Images
const createEvent = require("../../assets/createEvent.png");
const picnic1 = require("../../assets/picnic1.jpg");
const picnic2 = require("../../assets/picnic2.jpg");
const picnic3 = require("../../assets/picnic3.jpg");
const picnic4 = require("../../assets/picnic4.jpg");

const CreateEvent = ({ navigation, route }) => {
  const [code, setCode] = useState("");

  const { folderName, date, owner } = route.params || {
    folderName: "Untitled Folder",
    date: "Unknown Date",
    owner: "NA",
  };

  //  Image list (dynamic grid)
  const images = [picnic1, picnic2, picnic3, picnic4];

  return (
    <FolderLayout
      navigation={navigation}
      image={createEvent}
      folderName="Create Event"
      date="Sep 19"
      owner="A"
      inviteText="+ invite a friend"
      onInvitePress={() => navigation.navigate("InviteHiveMember")}
      RightIcon={<QR height={16} width={16} />}
    >
      {/*  Main Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {images.map((img, index) => (
            <View key={index} style={styles.photoContainer}>
              <Image source={img} style={styles.photo} />
            </View>
          ))}
        </View>
      </ScrollView>

      {/*  Continue button (optional) */}
      {/* 
      <ThemeButton
        text="Continue"
        onPress={() => navigation.navigate("CreateEventTwo")}
        style={{ marginTop: 31 }}
      /> 
      */}
    </FolderLayout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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

export default CreateEvent;
