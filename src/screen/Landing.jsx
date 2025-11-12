import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const Landing = ({ navigation }) => {
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const user = await AsyncStorage.getItem("user");

        if (token && user) {
          navigation.replace("MyTabs");
        } else {
          navigation.replace("Signup");
        }
      } catch (error) {
        console.log("Auto-login check error:", error);
        navigation.replace("Signup");
      }
    };

    // ⏱ Small delay for showing landing briefly
    const timer = setTimeout(() => {
      checkLoginStatus();
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Full Screen Gradient */}
        <LinearGradient
          colors={["#E1711C", "#E5B925"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {/* Centered Text */}
          <View style={styles.centerContainer}>
            <Text style={styles.text}>SnapHive</Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width,
    height,
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 48,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 2,
  },
});

export default Landing;
