import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image, TextInput } from "react-native";

// svg
import QR from "../../assets/svg/qr.svg";

// components
import FolderLayout from "../components/FolderLayout";
import ThemeButton from "../components/ThemeButton";
import CustomText from '../components/CustomText';

import Pencil from "../../assets/svg/pencil.svg";
const createEvent = require("../../assets/profile.jpg");

const CreateEventFive = ({ navigation }) => {
    const [email, setEmail] = useState("");

    return (
        <FolderLayout
            navigation={navigation}
            image={createEvent}
            folderName="Janifer Danis"
            date="+91 1841 510 1450"
     RightIcon={<Pencil height={16} width={16} onPress={() => navigation.navigate("EditProfile")} />}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

                {/* Profile Photo */}
                <View style={styles.photoContainer}>
                    <Image source={createEvent} style={styles.photo} />
                </View>

                {/* Name */}
              <CustomText weight="medium" style={styles.name}>Janifer Danis</CustomText>

                {/* Phone */}
            <CustomText weight="medium" style={styles.phone}>+91 1841 510 1450</CustomText>


                <View style={styles.inputWrapper}>
                   <CustomText weight="medium"style={styles.blockText}>First Name</CustomText>
                    <TextInput
                        style={styles.emailInput}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="e.g . danis"
                        placeholderTextColor="#999"
                    />
                </View>
                <View style={styles.inputWrapper}>
                 <CustomText weight="medium" style={styles.blockText}>Last Name</CustomText>
                    <TextInput
                        style={styles.emailInput}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="e.g . danis"
                        placeholderTextColor="#999"
                    />
                </View>
                <View style={styles.inputWrapper}>
                  <CustomText weight="medium" style={styles.blockText}>Email</CustomText>
                    <TextInput
                        style={styles.emailInput}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="e.g . dmas@gmail.com"
                        placeholderTextColor="#999"
                    />
                </View>
                <ThemeButton style={{ marginTop: 100 }}
                    text="Save Change"
                    onPress={() => navigation.navigate("Home")}
                />
            </ScrollView>
        </FolderLayout>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 20,
        alignItems: "center",
    },

    photoContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        marginBottom: 15,
        borderWidth: 6,
        borderColor: "#F2F2F2",
    },

    photo: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    name: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1C1C1C",
        marginBottom: 4,
    },

    phone: {
        fontSize: 14,
        fontWeight: "400",
        color: "#666",
        marginBottom: 30,
    },

    inputWrapper: {
        width: "100%",
        marginTop: 10,
    },

    blockText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#1C1C1C",
        marginBottom: 8,
    },

    emailInput: {
        borderColor: "#F7F7F7",
        backgroundColor: "#EFEFEF",
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#000",
    },
});

export default CreateEventFive;
