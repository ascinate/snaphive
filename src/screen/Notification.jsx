import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BottomNav from "../components/BottomNav";
import TopNavbar from "../components/TopNavbar";


import CreateAlbum from "../../assets/svg/createAlbum.svg";
import CreateFolder from "../../assets/svg/createFolder.svg";
import BackNavigator from "../../assets/svg/backNavigator.svg";
//Image
const dp = require("../../assets/dp.jpg");
const dp2 = require("../../assets/dp2.webp");


const MemberList = ({ navigation }) => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} >
                <TopNavbar />
                <ScrollView style={styles.scrollContainer}>
                    <View>
                        <BackNavigator width={20} height={20} style={{marginTop:10}}  onPress={() => navigation.goBack()}/>
                        <Text style={{ fontSize: 18, fontWeight: 600, marginTop: 10 }}>Notifications</Text>
                    </View>

                    {/* ---Tabs Navigation---- */}
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10, marginBlock: 20, }}>
                        <View style={[styles.badge, styles.badgeActive]}>
                            <Text style={styles.badgeText}>Today</Text>
                        </View>
                    </View>
                    {/* ---Tabs Navigation---- */}

                    {/* Notification List Screen */}
                    <View style={styles.chatList}>
                        <View style={styles.chatListItem}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                                <Image source={dp} style={styles.dp} />
                                <View>
                                    <Text style={{ fontSize: 15, fontWeight: 500 }}>Demola Aoki</Text>
                                    <Text style={{ color: '#A8A8A8', fontSize: 12 }}>4hrs</Text>
                                </View>
                            </View>


                            <CreateAlbum width={30} height={30} />
                        </View>
                        <View style={styles.chatListItem}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                                <Image source={dp2} style={styles.dp} />
                                <View>
                                    <Text style={{ fontSize: 15, fontWeight: 500 }}>Quency Demola</Text>
                                    <Text style={{ color: '#A8A8A8', fontSize: 12 }}>4hrs</Text>
                                </View>
                            </View>


                            <CreateFolder width={30} height={30} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    scrollContainer: {
        paddingInline: 20,
        paddingBlock: 10,
    },
    // ---Tabs Navigation----
    badge: {

        backgroundColor: 'gray',
        paddingHorizontal: 12,   // horizontal padding for spacing around text
        paddingVertical: 6,      // vertical padding
        borderRadius: 5,
        alignSelf: 'flex-start', // makes View wrap content instead of stretching full width
        borderRadius: 5,
    },
    badgeText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
    },
    badgeActive: {
        color: 'white',
        backgroundColor: 'black',
    },
    // ---Tabs Navigation----

    // Member List



    chatListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FAFAFA',
        gap: 15,
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
    },

    dp: {
        width: 51,
        height: 51,
        borderRadius: 80 / 2,
        resizeMode: "cover",
    },
    bottomNav: {
        marginTop: 20,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 60, // adjust height
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
    }

})

export default MemberList