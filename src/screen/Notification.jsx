import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TopNavbar from "../components/TopNavbar";

// SVGs
import BackNavigator from "../../assets/svg/backNavigator.svg";
import CreateAlbum from "../../assets/svg/createAlbum.svg";
import CreateFolder from "../../assets/svg/createFolder.svg";

// Local images
const dp = require("../../assets/dp.jpg");
const dp2 = require("../../assets/dp2.webp");
const dp3 = require("../../assets/dp3.jpg");
const dp4 = require("../../assets/dp4.jpg");
const dp5 = require("../../assets/dp5.jpg");
const dp6 = require("../../assets/dp6.jpg");
const dp7 = require("../../assets/dp7.jpg");

const MemberList = ({ navigation }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const data = [
                {
                    id: 1,
                    name: 'Demola Aoki',
                    time: '4hrs',
                    image: dp,
                    iconType: 'album',
                },
                {
                    id: 2,
                    name: 'Quency Demola',
                    time: '4hrs',
                    image: dp2,
                    iconType: 'folder',
                },

            ];
            setNotifications(data);
        };
        fetchNotifications();
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
             <TopNavbar notificationCount={notifications.length} />


                <ScrollView style={styles.scrollContainer}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <BackNavigator width={20} height={20} style={{ marginTop: 10 }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 10 }}>Notifications</Text>
                    </View>

                    {/* Tabs Navigation */}
                    <View style={{ flexDirection: 'row', gap: 10, marginVertical: 20 }}>
                        <View style={[styles.badge, styles.badgeActive]}>
                            <Text style={styles.badgeText}>Today</Text>
                        </View>
                    </View>

                    {/* Notification List */}
                    <View style={styles.chatList}>
                        {notifications.map((item) => (
                            <View key={item.id} style={styles.chatListItem}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                                    <Image source={item.image} style={styles.dp} />
                                    <View>
                                        <Text style={{ fontSize: 15, fontWeight: '500' }}>{item.name}</Text>
                                        <Text style={{ color: '#A8A8A8', fontSize: 12 }}>{item.time}</Text>
                                    </View>
                                </View>

                                {/* Dynamic SVG */}
                                {item.iconType === 'album' ? (
                                    <CreateAlbum width={30} height={30} />
                                ) : (
                                    <CreateFolder width={30} height={30} />
                                )}
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    scrollContainer: { paddingHorizontal: 20, paddingVertical: 10 },
    badge: { backgroundColor: 'gray', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 5, alignSelf: 'flex-start' },
    badgeText: { color: 'white', textAlign: 'center', fontSize: 14, fontWeight: '600' },
    badgeActive: { backgroundColor: 'black' },
    chatList: { marginBottom: 20 },
    chatListItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FAFAFA', gap: 15, marginBottom: 20, paddingHorizontal: 20, paddingVertical: 20, borderRadius: 10 },
    dp: { width: 51, height: 51, borderRadius: 25, resizeMode: 'cover' },
});

export default MemberList;
