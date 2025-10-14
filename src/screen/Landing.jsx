import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");
import { BiRepeat } from "react-icons/bi";

//component
import Logo from '../components/Logo'

//svg
import Landing2 from "../../assets/svg/landing.svg";
import LandingBtn from "../../assets/svg/landingBtn.svg";
import LandingArrow from "../../assets/svg/landingArrow.svg";

//image
const mainImg = require("../../assets/home-pic.png");

const Landing = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Main Content */}
        <View style={styles.content}>
          {/* Logo + Title */}
       <Logo/>

          {/* Heading + Image */}
          <View style={styles.middle}>
            <Text style={styles.mainTitle}>Welcome to SnapHive</Text>
            <Text style={styles.description}>
              Automatically share photos taken by members of your group
            </Text>
            <View style={{ width: 287, height: 265, overflow: "hidden" }}>
              <Image source={mainImg} style={styles.image} resizeMode="cover" />
            </View>
          </View>
        </View>

        {/* Bottom Button (sticks at screen edge) */}
        {/* <TouchableOpacity
          style={styles.mainsScreenButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity> */}


        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <View style={{ position: 'relative' }}>
            <LandingBtn style={styles.landingBtn} />
            <LandingArrow style={styles.landingBtnArrow} />
          </View>
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
    width: 187,
    height: 47,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: "contain",
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
    marginBottom: 45,
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
    width: "80%", 
    margin: "auto",
  },
  arrow: {
    fontSize: width * 0.12,
    fontWeight: "bold",
    color: "#fff",
  },
  landingBtn: {
    margin: 'auto',
    position: 'relative',
    bottom: 0,
    width: 300,
    height: 300,
  },
  landingBtnArrow: {
    position: 'absolute',
    top: 45,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  }

});

export default Landing;
