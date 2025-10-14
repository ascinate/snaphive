import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import FolderLayout from "../components/FolderLayout";
import Swtich from '../components/Swtich'
import QR from "../../assets/svg/qr.svg";
import Pencil from "../../assets/svg/pencil.svg";
import Lock from "../../assets/svg/lock.svg";
import Mail from "../../assets/svg/mail.svg";
import ThemeButton from "../components/ThemeButton";
const createEvent = require("../../assets/createEvent.png");
const folderImage = require("../../assets/folderImage.png");
const dp = require("../../assets/dp.jpg");
const dp6 = require("../../assets/dp6.jpg");
const CreateEvent = ({ navigation, route }) => {
    const [newTitle, setNewTitle] = useState("");

    const [email, setEmail] = useState("");
    const { folderName, date, owner } = route.params || {
        folderName: "Untitled Folder",
        date: "Unknown Date",
        owner: "NA",
    };

    return (
        <FolderLayout
            navigation={navigation}
            image={folderImage}
            folderName="Contact us"
            date="Sep 19"
            owner="A"
            inviteText="+ invite a friend"
            RightIcon={<Pencil height={16} width={16} />}
        >
            {/* unique screen content */}
            <View style={{ paddingInline: 20, marginTop: 40 }}>
                <Text style={{
                    fontSize: 16, fontWeight: 600, lineHeight: 25, textAlign: 'center'
                }}>We'd love to know how we can improve. Feel free if you have any suggestions, ideas or comment!</Text>


                <View style={styles.inputRow}>
                    <Mail width={18} height={18} style={{ marginRight: 8 }} />

                    <TextInput
                        style={styles.emailInput}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="exmaple@gmail.com"
                    />

                    <TouchableOpacity>
                        <View style={styles.copyButton}>
                            <Text style={{color: '#000000', fontWeight: 500}}>Copy</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.textArea}
                    multiline={true}
                    numberOfLines={5}
                    placeholder="Write your message here..."
                />

                <ThemeButton
                    text="Send Message"
                    onPress={() => navigation.navigate("InviteHiveMember")}
                    style={{ width: "100%", marginTop:28 }}
                />
            </View>
        </FolderLayout>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: 47,
        height: 47,
        borderRadius: 23.5,
        overflow: "hidden",
    },

    image: {
        width: '100%',
        height: '100%',
    },

    badge: {
        backgroundColor: '#FFC240',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingVertical: 9,
        borderRadius: 12,
    },

    // emailInput: {
    //     marginTop: 36,
    //     width: "100%",
    //     borderColor: '#EEEEEE',
    //     borderWidth: 1,
    //     borderRadius: 12,
    //     paddingHorizontal: 10,
    //     paddingVertical: 21,
    //     fontSize: 16,
    //     textAlign: 'left',
    //     paddingLeft: 27,

    // },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 15,
        marginTop: 30,

    },

    emailInput: {
        flex: 1, // makes input take all remaining space
        fontSize: 14,
        paddingVertical: 17,
    },

    copyButton: {
        backgroundColor: "#EEEEEE",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
        marginLeft: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 18,
        paddingVertical: 12,
        fontSize: 14,
        textAlignVertical: "top", 
        marginTop: 20,
        minHeight: 120,
    },
});

export default CreateEvent;
