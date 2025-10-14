import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, TextInput, Modal, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "../../assets/svg/back.svg";
import ThreeDot from "../../assets/svg/threeDot.svg";
import ThemeButton from "../components/ThemeButton";
import QR from "../../assets/svg/qr.svg";

const folderImage = require("../../assets/folderImage.png");


const AddExpenseBlock = ({ navigation, route }) => {

    const [email, setEmail] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    // Get dynamic params
    const { folderName, date, owner } = route.params || {
        folderName: "Untitled Folder",
        date: "Unknown Date",
        owner: "NA",
    };

    const handleMenuPress = () => {
        setShowDropdown(!showDropdown);
    };

    const handleMenuItemPress = (item) => {
        setShowDropdown(false);
        // Handle navigation based on item
        if (item === 'event') {
            navigation.navigate("CreateEventFive");
        } else if (item === 'invite') {
            navigation.navigate("InviteMember");
        }
    };

    return (
        <SafeAreaView>
            {/* Header image section */}
            <View style={styles.imageWrapper}>
                <Image source={folderImage} style={styles.folderImage} />

                {/* Top bar with back & menu */}
                <View style={styles.topBar}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <View style={styles.iconButton}>
                            <Back height={16} width={16} />
                        </View>
                    </TouchableWithoutFeedback>

                    <View>
                        <TouchableWithoutFeedback onPress={handleMenuPress}>
                            <View style={styles.iconButton}>
                                <ThreeDot height={16} width={16} />
                            </View>
                        </TouchableWithoutFeedback>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <View style={styles.dropdownMenu}>
                                <TouchableOpacity
                                    style={styles.dropdownItem}
                                    onPress={() => handleMenuItemPress('event')}
                                >
                                    <Text style={styles.dropdownText}>Event page</Text>
                                </TouchableOpacity>
                                <View style={styles.dropdownDivider} />
                                <TouchableOpacity
                                    style={styles.dropdownItem}
                                    onPress={() => handleMenuItemPress('invite')}
                                >
                                    <Text style={styles.dropdownText}>Invite Page</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.bottomOverlay}>
                    {/* Left side */}
                    <View>
                        <Text style={styles.folderHeading}>{folderName}</Text>
                        <Text style={styles.folderHeadingDate}>{date}</Text>
                        <View style={styles.profileIcon}>
                            <Text style={{ color: "#FFFFFF" }}>{owner}</Text>
                        </View>
                    </View>

                    {/* Right side */}
                    <TouchableWithoutFeedback>
                        <View style={styles.inviteButton}>
                            <Text style={styles.inviteText}>+ invite a friend</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>

            {/* Overlay to close dropdown when clicking outside */}
            {showDropdown && (
                <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            )}

            {/* Content list */}
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 300, paddingHorizontal: 20 }}
            >
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                    <QR width={120} height={120} />
                </View>
                <View style={{ marginTop: 30 }}>
                    <Text style={styles.blockText}>Enter a Code</Text>
                    <TextInput style={styles.emailInput} value={email} onChangeText={setEmail} placeholder='e.g . Family Trip' />
                </View>

                <ThemeButton style={{ marginTop: 100 }}
                    text="Join"
                    onPress={() => navigation.navigate("Home")}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        top: -60,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 40,
        height: "100%",

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


    dropdownMenu: {
        position: "absolute",
        top: 45,
        right: 0,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        minWidth: 150,
        zIndex: 1000,
    },
    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    dropdownText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#1C1C1C",
    },
    dropdownDivider: {
        height: 1,
        backgroundColor: "#F0F0F0",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 5,
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

    /* Bottom overlay */
    bottomOverlay: {
        position: "absolute",
        bottom: 90,
        left: 20,
        right: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    folderHeading: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 4,
    },
    folderHeadingDate: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "400",
        marginBottom: 8,
    },
    profileIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#ED3C50",
        justifyContent: "center",
        alignItems: "center",
    },
    inviteButton: {
        backgroundColor: "rgba(0,0,0,0.4)",
        paddingVertical: 6,
        paddingHorizontal: 13,
        borderRadius: 15,
    },
    inviteText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
    },
    emailInput: {
        borderColor: '#F7F7F7',
        backgroundColor: "#EFEFEF",
        marginTop: 13,
        width: "100%",
        paddingBlock: 19,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 21,
        fontSize: 16,
        textAlign: 'left',
        paddingLeft: 27,
    },

    blockHeading: {
        fontSize: 22,
        fontWeight: "600",
        marginTop: 21,
        color: "#000",
    },

    blockSubHeading: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 7,
        color: "#000",
    },

    blockText: {
        fontSize: 14,
        fontWeight: "500",
        marginTop: 5,
        color: "#1C1C1C",
    },
});

export default AddExpenseBlock;