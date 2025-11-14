import React, { useState } from "react";
import {
    View,
    Text,
    Modal,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import { Plus, Trash2, Users } from "lucide-react-native";
import CustomText from "./CustomText";

const MembersModal = ({ visible, onClose }) => {
    const [email, setEmail] = useState("");

    const members = [
        {
            id: 1,
            name: "Ramson Due",
            email: "exmaple@gmail.com",
            img: require("../../assets/dp.jpg"),
            status: "Add",
        },
        {
            id: 2,
            name: "Simis Due",
            email: "exmaple@gmail.com",
            img: require("../../assets/dp3.jpg"),
            status: "Member",
        },
    ];

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modalBox}>


                    <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                        <CustomText weight="medium" style={styles.closeTxt}>✕</CustomText>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', gap: 12, alignContent: 'center', paddingHorizontal: 10 }}>
                        <Users color='#E1711C' size={20} />
                        <CustomText weight="medium" style={styles.title}>Hive Members</CustomText>
                    </View>



                    <View style={styles.inviteRow}>
                        <TextInput
                            placeholder="exmaple@gmail.com"
                            placeholderTextColor="#A9A9A9"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                        />

                        <TouchableOpacity style={styles.inviteBtn}>
                            <CustomText weight="medium" style={styles.inviteText}>Invite</CustomText>
                        </TouchableOpacity>
                    </View>




                    <ScrollView
                        style={{ width: "100%", marginTop: 12 }}
                        contentContainerStyle={{
                            alignItems: "center",
                        }}
                    >

                        {members.map((item) => (
                            <View key={item.id} style={styles.card}>
                                <Image source={item.img} style={styles.profileImg} />
                                <View style={{ flex: 1 }}>
                                    <CustomText weight="bold" style={styles.name}>{item.name}</CustomText>
                                    <CustomText weight="medium" style={styles.email}>{item.email}</CustomText>
                                </View>

                                {/* RIGHT BUTTONS */}
                                {item.status === "Add" ? (
                                    <TouchableOpacity style={styles.addBtn}>
                                        <Plus size={16} color="#fff" style={{ marginRight: 4 }} />
                                        <CustomText weight="medium" style={styles.addTxt}>Add</CustomText>
                                    </TouchableOpacity>
                                ) : (
                                    <View style={styles.memberBox}>
                                        <CustomText weight="bold" style={styles.memberTxt}>Member</CustomText>
                                        <TouchableOpacity>
                                            <Trash2 size={18} color="#00051D" />
                                        </TouchableOpacity>
                                    </View>
                                )}

                            </View>
                        ))}

                    </ScrollView>

                </View>
            </View>
        </Modal>
    );
};

export default MembersModal;


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",

    },

    modalBox: {
        width: "100%",
        maxWidth: 380,

        backgroundColor: "#FAFAF9",
        borderRadius: 16,
        padding: 10,
        paddingTop: 35,
        position: "relative",
        minHeight: "75%",
        justifyContent: "flex-start",
    },

    closeBtn: {
        position: "absolute",
        top: 12,
        right: 12,
        padding: 5,
        zIndex: 10,
    },

    closeTxt: {
        fontSize: 20,
        color: "#666",
    },

    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#000",
        marginBottom: 15,
    },

    inviteRow: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 10,
        paddingHorizontal: 5,
    },

    input: {
        flex: 1,
        height: 48,
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        paddingHorizontal: 14,
        fontSize: 14,
        color: "#000",
        marginRight: 10,
    },

    inviteBtn: {
        backgroundColor: "#E1711C",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 10,
    },

    inviteText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
        width: "95%",
        shadowColor: "#7a7979ff",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.20,
        shadowRadius: 6,
        elevation: 6,
    },

    profileImg: {
        width: 45,
        height: 45,
        borderRadius: 40,
        marginRight: 12,
    },

    name: {
        fontSize: 14,
        fontWeight: "600",
        color: "#000",
    },

    email: {
        fontSize: 10,
        color: "#9A9A9A",
        marginTop: 2,
    },

    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E1711C",
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 10,
    },

    addTxt: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 12,
    },

    memberBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    memberTxt: {
        color: "#00051D",
        fontSize: 12,
        marginRight: 5,
    },
});
