import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, Switch, TouchableOpacity,ScrollView } from "react-native";
import FolderLayout from "../components/FolderLayout";
import Pencil from "../../assets/svg/pencil.svg";
import ThemeButton from "../components/ThemeButton";


const folderImage = require("../../assets/folderImage.png");

const CreateEvent = ({ navigation, route }) => {
    const [email, setEmail] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);
    const [selected, setSelected] = useState("left"); // 'left' or 'right'
    const { folderName, date, owner } = route.params || {
        folderName: "Untitled Folder",
        date: "Unknown Date",
        owner: "NA",
    };

    return (
        <FolderLayout
            navigation={navigation}
            image={folderImage}
            folderName="Manage Permissions"
            date="Sep 19"
            owner="A"
            inviteText="+ invite a friend"
            RightIcon={<Pencil height={16} width={16} />}
        >
            <ScrollView style={{ paddingInline: 20, marginTop: 40 }}>
                {/* Left label (OFF) */}
                <View style={{ marginTop: 30 }}>
                    <Text style={styles.heading}>Add item</Text>
                    <Text style={styles.subText}>Who can add new items to the folder?</Text>


                    <View style={styles.container}>
                        <TouchableOpacity
                            style={[
                                styles.toggleOption,
                                selected === "left" && styles.selectedOption,
                                { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }
                            ]}
                            onPress={() => setSelected("left")}
                            activeOpacity={0.8}
                        >
                            <Text style={[
                                styles.optionText,
                                selected === "left" && styles.selectedText
                            ]}>
                                Only Admin
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.toggleOption,
                                selected === "right" && styles.selectedOption,
                                { borderTopRightRadius: 8, borderBottomRightRadius: 8 }
                            ]}
                            onPress={() => setSelected("right")}
                            activeOpacity={0.8}
                        >
                            <Text style={[
                                styles.optionText,
                                selected === "right" && styles.selectedText
                            ]}>
                                Only Admin
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 30 }}>
                    <Text style={styles.heading}>Add item</Text>
                    <Text style={styles.subText}>Who can add new items to the folder?</Text>


                    <View style={styles.container}>
                        <TouchableOpacity
                            style={[
                                styles.toggleOption,
                                selected === "left" && styles.selectedOption,
                                { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }
                            ]}
                            onPress={() => setSelected("left")}
                            activeOpacity={0.8}
                        >
                            <Text style={[
                                styles.optionText,
                                selected === "left" && styles.selectedText
                            ]}>
                                Only Admin
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.toggleOption,
                                selected === "right" && styles.selectedOption,
                                { borderTopRightRadius: 8, borderBottomRightRadius: 8 }
                            ]}
                            onPress={() => setSelected("right")}
                            activeOpacity={0.8}
                        >
                            <Text style={[
                                styles.optionText,
                                selected === "right" && styles.selectedText
                            ]}>
                                Only Admin
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 30 }}>
                    <Text style={styles.heading}>Add item</Text>
                    <Text style={styles.subText}>Who can add new items to the folder?</Text>


                    <View style={styles.container}>
                        <TouchableOpacity
                            style={[
                                styles.toggleOption,
                                selected === "left" && styles.selectedOption,
                                { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }
                            ]}
                            onPress={() => setSelected("left")}
                            activeOpacity={0.8}
                        >
                            <Text style={[
                                styles.optionText,
                                selected === "left" && styles.selectedText
                            ]}>
                                Only Admin
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.toggleOption,
                                selected === "right" && styles.selectedOption,
                                { borderTopRightRadius: 8, borderBottomRightRadius: 8 }
                            ]}
                            onPress={() => setSelected("right")}
                            activeOpacity={0.8}
                        >
                            <Text style={[
                                styles.optionText,
                                selected === "right" && styles.selectedText
                            ]}>
                                Only Admin
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
          <ThemeButton
                    text="Send Message"
                    onPress={() => navigation.navigate("Language")}
                    style={{ width: "100%", marginTop: 90 }}
                />
            </ScrollView>


        </FolderLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#f0f0f0",
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        overflow: "hidden",
        width: '100%',
        height: 50,
        padding: 5,
    },
    toggleOption: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    selectedOption: {
        backgroundColor: "#FFA500", // active color (orange/yellow)
    },
    optionText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#888",
    },
    selectedText: {
        color: "#fff",
        fontWeight: "700",
    },

    heading: {
        fontSize: 16,
        fontWeight: 600,
    },
    subText: {
        marginTop: 14,
        marginBottom: 10,
        color: '#7D7D7D',
    }
});

export default CreateEvent;
