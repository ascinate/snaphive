import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import FolderLayout from "./FolderLayout";
import Swtich from "../components/Swtich";
import QR from "../../assets/svg/qr.svg";
import Pencil from "../../assets/svg/pencil.svg";
import People from "../../assets/svg/people.svg";
import Download from "../../assets/svg/download.svg";
import Mail from "../../assets/svg/mail.svg";
import ThemeButton from "../components/ThemeButton";
import CustomText from "../components/CustomText";
import ScreenLayout from "../components/ScreenLayout";
import { Check, CopyIcon, Link, QrCode, Share2, Users } from "lucide-react-native";
import QRCodeModal from "../components/QRCodeModal";

const { width, height } = Dimensions.get('window');

const folderImage = require("../../assets/folderImage.png");

const flag1 = require("../../assets/flag1.png");
const flag2 = require("../../assets/flag2.png");
const flag3 = require("../../assets/flag3.png");
const flag4 = require("../../assets/flag4.png");
// Images
const createEvent = require("../../assets/background.png");
const profilePic = require("../../assets/picnic3.jpg");
const InviteMember = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [copied, setCopied] = useState(false);
  const { folderName, date, owner } = route.params || {
    folderName: "Untitled Folder",
    date: "Unknown Date",
    owner: "NA",
  };

  const languages = [
    { name: "English", flag: flag1 },
    { name: "Spanish", flag: flag2 },
    { name: "French", flag: flag3 },
    { name: "German", flag: flag4 },
  ];

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ScreenLayout
      navigation={navigation}
      image={createEvent}
      folderName="Janifer Danis"
      date="+91 1841 510 1450"


      OverlayContent={
        <View style={styles.profileOverlay}>
{/* 
          <View style={styles.headerIconWrapper}>
            <Users color="#DA3C84" size={32} />
          </View> */}
          <View>
            <CustomText weight="bold" style={{ fontSize: 24, color: '#FFFFFF', textAlign: 'center' }}>
              Invite Member
            </CustomText>
            <CustomText weight="medium" style={{ fontSize: 14, color: '#FFFFFF', textAlign: 'center', opacity: 0.9, marginTop: 6 }}>
              Share this hive with friends
            </CustomText>
          </View>
        </View>
      }
    >


      <ScrollView style={{ paddingHorizontal: 24, paddingTop: 30, backgroundColor: '#FAFAF9', paddingBottom: 40 }}>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconWrapper}>
            <Share2 color="#DA3C84" size={20} />
          </View>
          <CustomText weight="medium" style={styles.infoText}>
            Invite members to collaborate and share photos in this hive
          </CustomText>
        </View>

        {/* Code Section - Enhanced */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <CustomText weight="bold" style={styles.sectionTitle}>Invitation Code</CustomText>
              <CustomText weight="medium" style={styles.sectionSubtitle}>Share this code with members</CustomText>
            </View>
            <TouchableOpacity 
              style={[styles.copyButton, copied && styles.copyButtonActive]}
              onPress={handleCopy}
            >
              {copied ? (
                <>
                  <Check width={16} height={16} color="#10B981" />
                  <Text style={[styles.copyButtonText, { color: '#10B981' }]}>Copied!</Text>
                </>
              ) : (
                <>
                  <CopyIcon width={16} height={16} color="#DA3C84" />
                  <Text style={styles.copyButtonText}>Copy</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>23G2VUJ</Text>
          </View>
        </View>

        {/* Quick Share Section - Enhanced */}
        <View style={styles.quickShareSection}>
          <CustomText weight="bold" style={styles.quickShareTitle}>Quick Share</CustomText>
          <View style={styles.quickShareButtons}>
            <TouchableOpacity style={styles.shareButton}>
              <View style={styles.shareIconWrapper}>
                <Link width={20} height={20} color="#DA3C84" />
              </View>
              <CustomText weight="bold" style={styles.shareButtonText}>Copy Link</CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => setModalVisible(true)}
            >
              <View style={styles.shareIconWrapper}>
                <QrCode width={20} height={20} color="#DA3C84" />
              </View>
              <CustomText weight="bold" style={styles.shareButtonText}>QR Code</CustomText>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.orLine}>
          <View style={styles.line} />
          <CustomText weight="medium" style={styles.orText}>Or invite via email</CustomText>
          <View style={styles.line} />
        </View>

        {/* Email Input Section - Enhanced */}
        <View style={styles.emailSection}>
          <CustomText weight="bold" style={styles.emailLabel}>Email Address</CustomText>
          <View style={styles.inputWrapper}>
            <Mail width={20} height={20} color="#9CA3AF" />
            <TextInput 
              style={styles.inviteMember} 
              placeholder="example@gmail.com"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <ThemeButton
            text="Send Invitation"
            onPress={() => navigation.navigate("MyTabs")}
            style={{ width: "100%", margin: 0 }}
          />
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
      <QRCodeModal visible={modalVisible} onClose={() => setModalVisible(false)} />

    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,

  },

  profileOverlay: {
    position: 'absolute',
    top: -100,
    alignItems: "center",
  },

  headerIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FFE5EE',
  },

  infoIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
  },

  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: 18,
    color: '#000',
    marginBottom: 4,
  },

  sectionSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
  },

  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF5F8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE5EE',
  },

  copyButtonActive: {
    backgroundColor: '#F0FDF4',
    borderColor: '#D1FAE5',
  },

  copyButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#DA3C84',
  },

  codeBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E5E7EB',
  },

  codeText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#da3c84',
    letterSpacing: 4,
  },

  quickShareSection: {
    marginBottom: 24,
  },

  quickShareTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 12,
  },

  quickShareButtons: {
    flexDirection: 'row',
    gap: 12,
  },

  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },

  shareIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF5F8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  shareButtonText: {
    fontSize: 14,
    color: '#1F2937',
  },

  buttonRow: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  orLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 28,
  },

  line: {
    height: 1,
    backgroundColor: '#E5E7EB',
    flex: 1,
  },

  orText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#6B7280',
  },

  emailSection: {
    marginBottom: 24,
  },

  emailLabel: {
    fontSize: 15,
    color: '#000',
    marginBottom: 12,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    gap: 12,
  },

  inviteMember: {
    flex: 1,
    color: "#000",
    paddingVertical: 14,
    fontSize: 15,
  }
});


export default InviteMember;