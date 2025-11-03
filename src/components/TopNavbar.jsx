import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useNotification } from "../context/NotificationContext";
import MaskedView from "@react-native-masked-view/masked-view";


import { Image,Bell } from "lucide-react-native"; 
import LinearGradient from "react-native-linear-gradient";
import CustomText from "./CustomText";

const TopNav = () => {
  const navigation = useNavigation();
  const { notifications, unreadCount } = useNotification();

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <LinearGradient
          colors={[
            '#a131d3', '#b128c4', '#bd22b5', '#c61fa7', '#cc2199',
            '#d71f8c', '#df227f', '#e52a73', '#ef3462', '#f44250',
            '#f5533d', '#f36529',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconGradient}
        >
          <Image color="#fff" size={20} />
        </LinearGradient>

        {/* Gradient Text for SnapHive */}
        <MaskedView
          maskElement={
            <CustomText weight="bold" style={styles.snapText}>
              SnapHive
            </CustomText>
          }
        >
          <LinearGradient
            colors={[
              '#a131d3', '#b128c4', '#bd22b5', '#c61fa7', '#cc2199',
              '#d71f8c', '#df227f', '#e52a73', '#ef3462', '#f44250',
              '#f5533d', '#f36529',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <CustomText weight="bold" style={[styles.snapText, { opacity: 0 }]}>
              SnapHive
            </CustomText>
          </LinearGradient>
        </MaskedView>
      </View>

      <TouchableOpacity
        style={styles.bellWrapper}
        onPress={() => navigation.navigate("Notification")}
      >
        <Bell width={28} height={28} />
        {unreadCount > 0 && (
     
                    <LinearGradient
          colors={[
            '#a131d3', '#b128c4', '#bd22b5', '#c61fa7', '#cc2199',
            '#d71f8c', '#df227f', '#e52a73', '#ef3462', '#f44250',
            '#f5533d', '#f36529',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.badge}
        >

            <Text style={styles.badgeText}>{unreadCount}</Text>
        </LinearGradient>
       
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconGradient: {
    borderRadius: 12,
    padding: 8,
  },
  snapText: {
    fontSize: 22,
    fontWeight: "700",
  },
  bellWrapper: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default TopNav;
