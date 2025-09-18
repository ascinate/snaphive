import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Demo from "../../assets/demo.svg";
const { width, height } = Dimensions.get("window");
const mainImg = require("../../assets/home-img.png");
const logo = require("../../assets/logo.png");

const Landing = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        
        {/* Main Content */}
        <View style={styles.content}>
          {/* Logo + Title */}
          <View style={styles.flex}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.title}>Snaphive</Text>
          </View>

          {/* Heading + Image */}
          <View style={styles.middle}>
            <Text style={styles.mainTitle}>Welcome to SnapHive</Text>
            <Text style={styles.description}>
              Automatically share photos taken by members of your group
            </Text>
            <Demo width={300} height={300}  />
          </View>
        </View>

        {/* Bottom Button (sticks at screen edge) */}
        <TouchableOpacity
          style={styles.mainsScreenButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: width * 0.12,
    height: width * 0.12,
    resizeMode: "contain",
    marginRight: 10,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: "700",
    color: "#000",
  },
  middle: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainTitle: {
    fontSize: width * 0.1,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: width * 0.045,
    color: "#646464",
    textAlign: "center",
    maxWidth: width * 0.85,
    marginBottom: 20,
  },
  mainImg: {
    width: width * 0.75,
    height: height * 0.3,
    resizeMode: "contain",
  },
  mainsScreenButton: {
    backgroundColor: "#01188A",
    paddingVertical: height * 0.025,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    width: "80%",       // full width at bottom
    margin: "auto",
  },
  arrow: {
    fontSize: width * 0.12,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Landing;
