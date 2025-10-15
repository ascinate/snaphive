import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';

// svg
import Download from "../../assets/svg/download.svg";
import QR from "../../assets/svg/qr.svg";
import Play from "../../assets/svg/play.svg";

// components
import FolderLayout from "../components/FolderLayout";
import ThemeButton from "../components/ThemeButton";

const createEvent = require("../../assets/createEvent.png");

const CreateEvent = ({ navigation, route }) => {
  const [code, setCode] = useState("");

  const { folderName, date, owner } = route.params || {
    folderName: "Untitled Folder",
    date: "Unknown Date",
    owner: "NA",
  };

  const picnic1 = require("../../assets/picnic1.jpg");
  const picnic2 = require("../../assets/picnic2.jpg");
  const picnic3 = require("../../assets/picnic3.jpg");
  const picnic4 = require("../../assets/picnic4.jpg");

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
      {/*  unique screen content */}
      <ScrollView style={{ padding: 20, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginBottom: 20,
          }}
        >
          <Play width={24} height={24} />
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Cover Image</Text>
        </View>


        <View style={styles.uploadContainer}>
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => {
              const options = {
                mediaType: 'photo',
                quality: 1,
              };

              launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.errorCode) {
                  console.log('ImagePicker Error: ', response.errorMessage);
                } else if (response.assets && response.assets.length > 0) {
                  const selectedImage = response.assets[0];
                  console.log('Selected image:', selectedImage.uri);
  
                }
              });
            }}
          >
            <Download width={24} height={24} />
            <Text style={styles.uploadText}>Upload your own image</Text>
          </TouchableOpacity>
        </View>

        <Text>Or choose from stock options based on event type</Text>


        <View style={styles.imageGrid}>
          <View style={styles.imageContainer}>
            <Image source={picnic1} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.imageText}>Corporate</Text>
            </View>
          </View>

          <View style={styles.imageContainer}>
            <Image source={picnic2} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.imageText}>Birthday party</Text>
            </View>
          </View>

          <View style={styles.imageContainer}>
            <Image source={picnic3} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.imageText}>Wedding</Text>
            </View>
          </View>

          <View style={styles.imageContainer}>
            <Image source={picnic4} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.imageText}>Reunion</Text>
            </View>
          </View>

          <View style={styles.imageContainer}>
            <Image source={picnic1} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.imageText}>Others</Text>
            </View>
          </View>
        </View>


        <ThemeButton
          text="Continue"
          onPress={() => navigation.navigate("CreateEventThree")}
          style={{ marginTop: 64 }}
        />
      </ScrollView>
    </FolderLayout>
  );
};

const styles = StyleSheet.create({
  uploadContainer: {
    marginBottom: 20,
  },
  uploadBtn: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#B3B3B3",
    borderStyle: "dashed",
    borderRadius: 12,
    height: 120,
    backgroundColor: "#F8F8F8",
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
  },
  imageContainer: {
    position: "relative",
    width: 145,
    height: 100,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CreateEvent;
