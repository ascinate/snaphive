import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Back from '../../assets/svg/back.svg'
import ThreeDot from '../../assets/svg/threeDot.svg'
import RightArrow from '../../assets/svg/rightArrow.svg'
import QR from '../../assets/svg/qr.svg'
// Images
const createFolder = require("../../assets/createFolder.png");
const folderImageList = require("../../assets/folderImageList.webp");

const PeopleTab = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        {/* Header image section */}
        <View style={styles.imageWrapper}>
          <Image source={createFolder} style={styles.folderImage} />

          {/* Top bar with back & menu */}
          <View style={styles.topBar}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <View style={styles.iconButton}>
                <Back height={16} width={16} />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => console.log("3 dots pressed")}>
              <View style={styles.iconButton}>
                <ThreeDot height={16} width={16} />
              </View>
            </TouchableWithoutFeedback>
          </View>


        </View>

        {/* Content list */}
        <ScrollView style={styles.container}>


          <View style={styles.qrcodeContainer}>
            <View style={styles.qrcode}>
              <QR width={100} height={100} />
            </View>
          </View>



        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    top: -60,
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: "100%"
  },



  /* Top icons */
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

  /* Header image */
  imageWrapper: {
    position: "relative",
  },
  folderImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  qrcodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    height: 300,
  },
  qrcode: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:5,
    borderColor: '#D5D5D5',
    borderStyle: 'dotted',
        borderRadius: 12,
    width: 170,
    height: 170,
    backgroundColor: '#F8F8F8'
  },
})

export default PeopleTab
