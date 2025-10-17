import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

// svg
import QR from "../../assets/svg/qr.svg";
import CopyIcon from "../../assets/svg/copyIcon.svg";
import Link from "../../assets/svg/link.svg";

// components
import FolderLayout from "../components/FolderLayout";
import ThemeButton from "../components/ThemeButton";

const inviteMember = require("../../assets/inviteMember.png");

const CreateEventThree = ({ navigation, route }) => {
  // states for dates & times (currently not displayed in UI)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);

  const { folderName, owner } = route.params || {
    folderName: "Untitled Folder",
    owner: "NA",
  };

  return (
    <FolderLayout
      navigation={navigation}
      image={inviteMember}
      folderName="Invite Member"
      date="Sep 19"
      owner="A"
      inviteText="+ invite a friend" onInvitePress={() => navigation.navigate("InviteHiveMember")}
      RightIcon={<QR height={16} width={16} />}
    >
      <ScrollView style={{ padding: 20, flex: 1 }}>

        {/* Message Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Message</Text>
            <CopyIcon width={20} height={20} />
          </View>
          <Text style={styles.sectionText}>
            Various versions have evolved over the years, sometimes by accident..
          </Text>
          <Text style={styles.linkText}>See all</Text>
        </View>

        {/* Code Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Code</Text>
            <CopyIcon width={20} height={20} />
          </View>
          <Text style={styles.sectionText}>23G2VUJ</Text>
        </View>

        {/* Link Section */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.badgeBtn}>
            <Text style={styles.badgeText}>Link</Text>
            <Link width={16} height={16} />
          </View>
          <View style={styles.badgeBtn}>
            <Text style={styles.badgeText}>QR Code</Text>
            <QR width={16} height={16} />
          </View>

        </View>

        <View style={styles.orLine}>
          <View style={styles.line} />
          <Text style={styles.text}>Or</Text>
          <View style={styles.line} />
        </View>
        {/* Buttons */}
        <View style={styles.buttonRow}>
          <ThemeButton
            text="Copy Links"
            onPress={() => navigation.navigate("MyTabs")}
            style={{ width: "100%" }}
          />
        </View>

      </ScrollView>
    </FolderLayout>
  );
};

const styles = StyleSheet.create({
  section: {
    borderBottomWidth: 1,
    borderBottomColor: "#F4F4F4",
    paddingBottom: 10,
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  sectionText: {
    color: "#A8A8A8",
    marginTop: 10,
  },
  linkText: {
    color: "#FF4800",
    marginTop: 8,
  },
  badgeBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 125,
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#EEEEEE",
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  orLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingInline: 20,
    marginTop: 40,

  },

  line: {
    height: 1,
    backgroundColor: '#ccc',
    width: 160,
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default CreateEventThree;
