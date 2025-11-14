import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopNavbar from '../components/TopNavbar'

// svg
import LeftArrow from '../../assets/svg/leftArrow.svg'
import CameraIcon from '../../assets/svg/cameraIcon.svg'
import VoiceMesssage from '../../assets/svg/voiceMesssage.svg'

import MultiImage from '../../assets/svg/multiImage.svg'
import CustomText from '../components/CustomText'
import { ArrowLeft, Ellipsis, MoveLeft, Send, SendHorizonal } from "lucide-react-native";
// image
const dp = require("../../assets/dp.jpg");
const picnic1 = require("../../assets/picnic1.jpg");

const Chat = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>

            {/* Header Section */}
            <View style={styles.header}>
                <View style={{flexDirection:'row', alignItems:'center',gap:10}} >

                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeft />
                    </TouchableOpacity>

                    <View style={styles.profileContainer}>
                        <View style={styles.displayPictureContainer}>
                            <Image source={dp} style={styles.displayPicture} />
                        </View>
                        <View>
                            <CustomText weight="bold" style={styles.userName}>James Danis</CustomText>
                            <CustomText weight="medium" style={{ fontSize: 12, color: '#00A236' }}>Online</CustomText>
                        </View>
                    </View>
                </View>
                    <Ellipsis />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>



                <View style={styles.messagesContainer}>
                    {/* Message Box */}
                    <View style={styles.userOneMessageBox}>

                        <View style={styles.messageContent}>
                            <View style={styles.messageImageContainer}>
                                <Image source={picnic1} style={styles.messageImage} />
                            </View>
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <View style={styles.messageImageContainerTwo}>
                                    <Image source={picnic1} style={styles.messageImage} />
                                </View>
                                <View style={styles.messageImageContainerMore}>
                                    <CustomText weight="medium" style={{ fontSize: 25, color: '#5F636E' }}>50+ </CustomText>
                                </View>
                            </View>

                        </View>
                        <CustomText weight="medium" style={{ fontSize: 10 }} >01:00 am</CustomText>
                    </View>

                    <View style={styles.userTwoMessageBox}>

                        <View style={styles.messageText}>
                            <CustomText weight="medium" style={[styles.text, { color: '#636363', fontSize: 12 }]}>Hey Tobi, are you join our
                                new Hive?

                            </CustomText>
                            <View style={styles.messageArrowRight} />
                        </View>
                        <CustomText weight="medium" style={{ fontSize: 10 }} >01:00 am</CustomText>
                    </View>

                    <View style={styles.userOneMessageBox}>
                        <View style={styles.messageTextLeft}>
                            <CustomText weight="medium" style={[styles.textLeft, { color: '#636363', fontSize: 12 }]}>Hey Tobi, are you join our
                                new Hive?
                            </CustomText>
                            <View style={styles.messageArrowLeft} />
                        </View>
                        <CustomText weight="medium" style={{ fontSize: 10 }} >01:00 am</CustomText>
                    </View>

                    <View style={styles.userOneMessageBox}>


                        <View style={styles.messageContent}>
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <View style={styles.messageImageContainerTwo}>
                                    <Image source={picnic1} style={styles.messageImage} />
                                </View>
                                <View style={styles.messageImageContainerMore}>
                                    <Image source={picnic1} style={styles.messageImage} />
                                </View>
                            </View>

                        </View>
                        <CustomText weight="medium" style={{ fontSize: 10, margin: 0 }} >01:00 am</CustomText>
                    </View>

                </View>
            </ScrollView>

            <View style={{ flexDirection: 'row', gap: 10, paddingVertical: 16, paddingHorizontal: 25, alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ backgroundColor: '#E1711C', height: 40, width: 40, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <CameraIcon height={24} width={24} />
                </View>
                <View style={{ position: 'relative' }}>
                    <TextInput style={styles.inputType} placeholder='Type here..' placeholderTextColor="#AAAAAA" />

                    <MultiImage height={24} width={24} style={styles.send} />
                </View>

                <View
                    style={{
                        width: 44,
                        height: 44,
                        backgroundColor: '#E1711C',
                        borderRadius: 12,
                        justifyContent: 'center',
                        alignItems: 'center',   // <-- FIX
                    }}
                >
                    <SendHorizonal size={24} color="#ffffff" />
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAF9',

    },
    scrollContainer: {
        paddingVertical: 16,
        paddingHorizontal: 25,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 20,
        paddingVertical: 16,
        paddingHorizontal: 25,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    displayPictureContainer: {
        width: 44,
        height: 44,
        borderRadius: 50,
        overflow: 'hidden',
    },
    displayPicture: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    messagesContainer: {
        flex: 1,
        paddingTop: 10,
    },
    userOneMessageBox: {
        flexDirection: 'row',
        alignItems: 'center',

        gap: 18,
        marginBlock: 16,
        maxWidth: '80%',
    },
    userTwoMessageBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
        marginBlock: 16,
        maxWidth: '80%',
        alignSelf: 'flex-end',
        flexDirection: 'row-reverse',
    },
    messageDpContainer: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        overflow: 'hidden',
    },
    messageDp: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    messageContent: {
        flex: 1,
        gap: 10,
    },
    messageImageContainer: {
        width: 215,
        height: 120,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    messageImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    messageImageContainerTwo: {
        width: 100,
        height: 90,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },

    messageImageContainerMore: {
        width: 100,
        height: 90,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    messageText: {
        borderRadius: 10,
        backgroundColor: '#FFE49A',
        paddingVertical: 11,
        paddingHorizontal: 28,
        maxWidth: 265,
        height: 'auto',
        shadowColor: '#acacacff',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
        elevation: 12,
    },
    messageTextLeft: {
        borderRadius: 10,
        backgroundColor: '#fff',
        paddingVertical: 11,
        paddingHorizontal: 28,
        maxWidth: 265,
        height: 'auto',
        shadowColor: '#acacacff',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
        elevation: 12,
    },
    text: {
        color: '#000000',
        fontWeight: 600,
    },
    textLeft: {
        color: '#ffffffff',
        fontWeight: 600,
    },
    messageArrowRight: {
        position: 'absolute',
        right: -5,
        bottom: 2,
        width: 0,
        height: 0,
        borderTopWidth: 8,
        borderTopColor: 'transparent',
        borderBottomWidth: 8,
        borderBottomColor: 'transparent',
        borderLeftWidth: 8,
        borderLeftColor: '#FFE49A',
    },
    messageArrowLeft: {
        position: 'absolute',
        left: -5,
        bottom: 2,
        width: 0,
        height: 0,
        borderTopWidth: 8,
        borderTopColor: 'transparent',
        borderBottomWidth: 8,
        borderBottomColor: 'transparent',
        borderRightWidth: 8,
        borderRightColor: '#fff',
    },
    inputType: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 50,
        paddingLeft: 20,
        width: 280,

    },
    voiceMesssage: {
        position: 'absolute',
        right: 40,
        top: '20%',
    },
    send: {
        position: 'absolute',
        right: 10,
        top: '20%',
    }
})

export default Chat