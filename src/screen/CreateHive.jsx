import React, { useState, useCallback, useEffect, useContext, useRef } from 'react';
import {
    View,

    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Platform,
    Animated,
    Text,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native';
import { navigate } from '../navigation/RootNavigation';
import { Sparkles, Users, FileImage, Clock5, RotateCwSquar, Image, LockOpen } from 'lucide-react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { EventContext } from '../context/EventContext';


// components
import TopNav from '../components/TopNavbar';
import CustomText from '../components/CustomText';
import ThemeButton from '../components/ThemeButton';
import MaskedView from '@react-native-masked-view/masked-view';

// assets
const hero = require('../../assets/hero.png');
const picnic1 = require('../../assets/picnic1.jpg');

const { width, height } = Dimensions.get('window');

const Home = ({ navigation, route }) => {




    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <TopNav />

                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}

                >
                    <MaskedView
                        maskElement={
                            <CustomText weight="bold" style={styles.snapText}>
                                Create New Hive
                            </CustomText>
                        }
                    >
                        <LinearGradient
                            colors={[
                                '#a131d3', '#b128c4', '#bd22b5', '#c61fa7', '#cc2199',
                                '#d71f8c', '#df227f', '#e52a73', '#ef3462', '#f44250',
                                '#f5533d', '#f36529',
                            ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <CustomText weight="bold" style={[styles.snapText, { opacity: 0 }]} />
                        </LinearGradient>
                    </MaskedView>
                    <CustomText>Start sharing memories with your group</CustomText>
                    <CustomText style={{ marginTop: 18, marginBottom: 4 }}>Cover Image</CustomText>


                    <TouchableWithoutFeedback onPress={() => navigate('PhotoShare')}>
                        <View style={styles.uploadContainer}>
                            <Image color='#c084fc' width={48} height={48} />
                            <CustomText weight='mideum' style={{ marginTop: 8 }}>Tap to upload cover</CustomText>
                            <CustomText style={{ marginTop: 4 }}>JPG, PNG up to 10MB</CustomText>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={{ marginBottom: 16 }}>
                        <CustomText weight='medium' style={{ marginBottom: 4 }}>Hive Name *</CustomText>
                        <TextInput placeholder='Summer Vacation 2024' style={styles.inputType} />
                    </View>
                    <View style={{ marginBottom: 16 }}>
                        <CustomText weight="medium" style={{ marginBottom: 4 }}>
                            Description
                        </CustomText>
                        <TextInput
                            placeholder="Share details about your hive..."
                            style={[styles.inputType, { textAlignVertical: 'top', height: 100 }]}
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>
                    <View style={{ marginBottom: 16 }}>
                        <CustomText weight="medium" style={{ marginBottom: 4 }}>
                            Privacy Mode
                        </CustomText>
                        <View style={styles.privacy}>
                            <View>
                                <View style={{ width: 35, height: 35, backgroundColor: '#e9d5ff', borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
                                    <LockOpen color='#9E48ED' />
                                </View>

                            </View>
                            <View>
                                <CustomText >Automatic Upload</CustomText>
                                <CustomText>All members can upload instantly. Best for casual events.</CustomText>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingBottom: 100 }}>
                        <ThemeButton text="Create Hive"
                            onPress={() => navigation.navigate("Home")}
                            style={{ width: "100%", }} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: width * 0.05,
        backgroundColor: '#fdf2f8',
    },
    uploadContainer: {
        width: '100%', height: 188, borderWidth: 2, borderColor: '#E5E7EB', borderStyle: 'dashed', borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    inputType: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        paddingLeft: 10,
    },
    privacy: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 12,

        // ✅ Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,

        // ✅ Shadow for Android
        elevation: 3,
    },

});

export default Home;