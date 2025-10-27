import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, ScrollView } from "react-native";
import FolderLayout from "../components/FolderLayout";
import Cloud from "../../assets/svg/cloud.svg";
import QR from "../../assets/svg/qr.svg";
import Utility from "../../assets/svg/utility.svg";
import ThemeButton from "../components/ThemeButton";
import CustomText from "../components/CustomText";
const createEvent = require("../../assets/createEvent.png");


const CreateEvent = ({ navigation, route }) => {
  const [code, setCode] = useState("");

  const { folderName, date, owner } = route.params || {
    folderName: "Untitled Folder",
    date: "Unknown Date",
    owner: "NA",
  };

  return (
    <FolderLayout
      navigation={navigation}
      image={createEvent}
      folderName="Create Event"
      date="Sep 19"
      owner="A"
      inviteText="+ invite a friend" onInvitePress={() => navigation.navigate("InviteHiveMember")}
      RightIcon={<QR height={16} width={16} />}
    >
      {/*  unique screen content */}
      <ScrollView style={{ padding: 20, flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <View style={styles.photoContainer}>
            <Image source={createEvent} style={styles.photo} />
          </View>
          <View style={styles.photoContainer}>
            <Image source={createEvent} style={styles.photo} />
          </View>
          <View style={styles.photoContainer}>
            <Image source={createEvent} style={styles.photo} />
          </View>
          
        </View>


        {/* <ThemeButton
                    text="Continue"
                    onPress={() => navigation.navigate("CreateEventTwo")}
                    style={{ marginTop: 31 }}
                /> */}
      </ScrollView>
    </FolderLayout>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  photo: { width: "100%", height: "100%", marginBottom: 20 }
});

export default CreateEvent;
