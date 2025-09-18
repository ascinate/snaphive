import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";



//Component
import TopNavbar from "../components/TopNavbar";

// Assets
import Folder from '../../assets/svg/folder.svg'
import RightArrow from '../../assets/svg/rightArrow.svg'

const HomeScreen = () => {
  const navigation = useNavigation();

  // Folder data (you can expand this)
  const albums = [
    {
      year: 2025,
      folders: [
        {
          id: 1,
          name: "Japan Tour",
          items: 10,
          date: "Sep 15",
          bgColor: "#ffd5e5ff",
          owner: "GG",
        },
        {
          id: 2,
          name: "Office Trip",
          items: 7,
          date: "Aug 20",
          bgColor: "#d5fff2ff",
          owner: "PG",
        },
      ],
    },
    {
      year: 2024,
      folders: [
        {
          id: 3,
          name: "Family Album",
          items: 25,
          date: "Jan 05",
          bgColor: "#fceec0ff",
          owner: "PG",
        },
      ],
    },
    {
      year: 2023,
      folders: [
        {
          id: 4,
          name: "London Album",
          items: 25,
          date: "Jan 05",
          bgColor: "#c7c0fcff",
          owner: "PG",
        },
        {
          id: 5,
          name: "London Album",
          items: 25,
          date: "Jan 05",
          bgColor: "#c0fccaff",
          owner: "PG",
        },
      ],
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TopNavbar />

        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {albums.map((album) => (
            <View key={album.year}>
              {/* Year Title */}
              <Text style={styles.yearTitle}>{album.year}</Text>

              {/* Folder List */}
              {album.folders.map((folder) => (
                <TouchableOpacity
                  key={folder.id}
                  style={styles.folderRow}
                  onPress={() => navigation.navigate("PhotoFolder", { folderName: folder.name, date: folder.date, owner: folder.owner })}
                >
                  <View style={[styles.folderIconBg, { backgroundColor: folder.bgColor }]}>
                    <Folder width={50} height={50} />
                  </View>

                  <View>
                    <Text style={styles.folderName}>{folder.name}</Text>
                    <View style={styles.metaRow}>
                      <Text>{folder.items} items</Text>
                      <Text>{folder.date}</Text>
                    </View>
                    <View style={styles.profileIcon}>
                      <Text style={{ color: "#FFFFFF" }}>{folder.owner}</Text>
                    </View>
                  </View>

                  <RightArrow width={20} height={20} style={{ marginLeft: "auto" }} />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  yearTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  folderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 20,
  },
  folderIconBg: {
    width: 100,
    height: 100,
    backgroundColor: "#FEEDD1",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  folderName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  metaRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ED3C50",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },
})

export default HomeScreen
