import React, { useState, useCallback, useEffect, useContext, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, PlatformAnimated, Text, TextInput, TouchableWithoutFeedback, Switch, Keyboard, Animated } from 'react-native';
import { navigate } from '../navigation/RootNavigation';
import { Sparkles, Users, FileImage, Clock5, RotateCwSquar, Image, LockOpen, Lock, Calendar, Timer, TimerOff, CalendarOff } from 'lucide-react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { EventContext } from '../context/EventContext';
import { launchImageLibrary } from 'react-native-image-picker';

// components
import TopNav from '../components/TopNavbar';
import CustomText from '../components/CustomText';
import ThemeButton from '../components/ThemeButton';
import MaskedView from '@react-native-masked-view/masked-view';

// assets
const hero = require('../../assets/hero.png');
const picnic1 = require('../../assets/picnic1.jpg');
const { width, height } = Dimensions.get('window');

const CreateHive = ({ navigation, route }) => {

    const [uploadedImage, setUploadedImage] = useState(null);
    const [hiveName, setHiveName] = useState("");
    const [date, setDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [hiveDescription, setHiveDescription] = useState("");
    const { addEvent } = useContext(EventContext);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const handleCreateHive = () => {
        if (!hiveName.trim()) {
            alert('Please enter a hive name');
            return;
        }

        if (!uploadedImage) {
            alert('Please upload a cover image');
            return;
        }

        if (isEnabled) {
            if (!date || !startDate || !endTime || !endDate) {
                alert('Please fill all date and time fields for temporary event');
                return;
            }
        }

        const newEvent = {
            img: { uri: uploadedImage },
            title: hiveName,
            description: hiveDescription || 'No description',
            count: '0 Photos',
            photos: [],
            createdAt: new Date().toISOString(),
            isTemporary: isEnabled,
            eventDate: date,
            startTime: startDate,
            endTime: endTime,
            expiryDate: endDate,
        };

        addEvent(newEvent);
        // reset fields
        setUploadedImage(null);
        setHiveName("");
        setHiveDescription("");
        setDate('');
        setStartDate('');
        setEndTime('');
        setEndDate('');
        setIsEnabled(false);
        navigation.goBack() // redirect to Home
    };

    const handleChange = (text) => {
        // Optional: auto-add dashes for format dd-mm-yy
        let formatted = text.replace(/[^0-9]/g, '');
        if (formatted.length > 2 && formatted.length <= 4)
            formatted = `${formatted.slice(0, 2)}-${formatted.slice(2)}`;
        else if (formatted.length > 4)
            formatted = `${formatted.slice(0, 2)}-${formatted.slice(2, 4)}-${formatted.slice(4, 6)}`;
        setDate(formatted);
    }

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
                    <CustomText weight='regular ' style={{ color: '#374151' }}>Start sharing memories with your group</CustomText>
                    <CustomText weight='medium' style={{ marginTop: 18, marginBottom: 4, color: '#374151' }}>Cover Image</CustomText>

                    <TouchableWithoutFeedback onPress={() => {
                        const options = {
                            mediaType: "photo",
                            quality: 1,
                        };

                        launchImageLibrary(options, (response) => {
                            if (response.didCancel) {
                                console.log("User cancelled image picker");
                            } else if (response.errorCode) {
                                console.log("ImagePicker Error: ", response.errorMessage);
                            } else if (response.assets && response.assets.length > 0) {
                                const selectedImage = response.assets[0];
                                console.log("Selected image:", selectedImage.uri);
                                setUploadedImage(selectedImage.uri);
                            }
                        });
                    }}>
                        <View style={styles.uploadContainer}>
                            {uploadedImage ? (
                                <View style={{ width: '100%', height: '100%', borderRadius: 8, overflow: 'hidden' }}>
                                    <Animated.Image
                                        source={{ uri: uploadedImage }}
                                        style={{ width: '100%', height: '100%' }}
                                        resizeMode="cover"
                                    />
                                </View>
                            ) : (
                                <>
                                    <Image color='#c084fc' width={48} height={48} />
                                    <CustomText weight='mideum' style={{ marginTop: 8 }}>Tap to upload cover</CustomText>
                                    <CustomText weight='mideum' style={{ marginTop: 4, color: '#67696b' }}>JPG, PNG up to 10MB</CustomText>
                                </>
                            )}
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={{ marginBottom: 16 }}>
                        <CustomText weight='medium' style={{ marginBottom: 4, color: '#374151' }}>Hive Name *</CustomText>
                        <TextInput
                            placeholder='Summer Vacation 2024'
                            style={styles.inputType}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={hiveName}
                            onChangeText={setHiveName}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        />
                    </View>

                    <View style={{ marginBottom: 16 }}>
                        <CustomText weight="medium" style={{ marginBottom: 4, color: '#374151' }}>
                            Description
                        </CustomText>
                        <TextInput
                            placeholder="Share details about your hive..."
                            style={[styles.inputType, { textAlignVertical: 'top', height: 100 }]}
                            multiline={true}
                            numberOfLines={4}
                            value={hiveDescription}
                            onChangeText={setHiveDescription}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        />
                    </View>

                    <View style={{ marginBottom: 0, }}>
                        <CustomText weight="medium" style={{ marginBottom: 4, color: '#374151' }}>
                            Privacy Mode
                        </CustomText>
                        <View style={styles.privacy}>
                            <View >
                                <View style={{ width: 35, height: 35, backgroundColor: '#e9d5ff', borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
                                    <LockOpen color='#9E48ED' />
                                </View>
                            </View>
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <CustomText weight='bold' style={{ fontSize: 16 }}>Automatic Upload</CustomText>
                                <CustomText weight='medium' style={{ color: '#374151' }}>All members can upload instantly. Best for casual events.</CustomText>
                            </View>
                        </View>
                        <View style={styles.privacy}>
                            <View >
                                <View style={{ width: 35, height: 35, backgroundColor: '#e9d5ff', borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
                                    <Lock color='#9E48ED' />
                                </View>
                            </View>
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <CustomText weight='bold' style={{ fontSize: 16 }}>Approval Required</CustomText>
                                <CustomText weight='medium' style={{ color: '#374151' }}>Media must be reviewed by authorized members. Best for formal events.</CustomText>
                            </View>
                        </View>


                        <View style={styles.privacyContainer}>
                            <View style={{}}>
                                <View style={{ flexDirection: 'row', marginLeft: 12, justifyContent: 'space-between' }}>
                                    <CustomText weight='bold' style={{ fontSize: 16 }}>Temporary Event Hive</CustomText>

                                    {/*this is toggle when swtich on  */}
                                    <Switch
                                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                                        thumbColor={isEnabled ? '#4b5cf5ff' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                    />
                                </View>
                                <CustomText weight='medium' style={{ color: '#374151', paddingLeft: 14 }}>Set dates for this event</CustomText>
                            </View>

                            {/* that tome only show this View */}
                            {isEnabled && (
                                <View style={{ paddingInline: 6 }}>
                                    {/* Event Date */}

                                    <View style={{ marginTop: 15 }}>
                                    <View style={{ backgroundColor: '#ccc', height: 0.4, width: '100%', }} />

                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 5, marginTop: 15 }}>
                                            <Calendar width={16} />
                                            <CustomText weight="semiBold" color="#374151">Event Date</CustomText>


                                        </View>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="DD-MM-YY"
                                            value={date}
                                            onChangeText={(text) => {
                                                let formatted = text.replace(/[^0-9]/g, '');
                                                if (formatted.length > 2 && formatted.length <= 4)
                                                    formatted = `${formatted.slice(0, 2)}-${formatted.slice(2)}`;
                                                else if (formatted.length > 4)
                                                    formatted = `${formatted.slice(0, 2)}-${formatted.slice(2, 4)}-${formatted.slice(4, 6)}`;
                                                setDate(formatted);
                                            }}
                                            keyboardType="numeric"
                                            maxLength={8}
                                        />
                                    </View>

                                    {/* Start Time */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                        <View style={{ marginTop: 20, width: '50%' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                                                <Timer width={16} />
                                                <CustomText weight="semiBold" color="#374151">Start Time</CustomText>
                                            </View>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="HH:MM"
                                                value={startDate}
                                                onChangeText={(text) => {
                                                    let formatted = text.replace(/[^0-9]/g, '');
                                                    if (formatted.length > 2)
                                                        formatted = `${formatted.slice(0, 2)}:${formatted.slice(2, 4)}`;
                                                    setStartDate(formatted);
                                                }}
                                                keyboardType="numeric"
                                                maxLength={5}
                                            />
                                        </View>

                                        {/* End Time */}
                                        <View style={{ paddingLeft: 16, marginTop: 20, width: '50%' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                                                <TimerOff width={16} />
                                                <CustomText weight="semiBold" color="#374151">End Time</CustomText>
                                            </View>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="HH:MM"
                                                value={endTime}
                                                onChangeText={(text) => {
                                                    let formatted = text.replace(/[^0-9]/g, '');
                                                    if (formatted.length > 2)
                                                        formatted = `${formatted.slice(0, 2)}:${formatted.slice(2, 4)}`;
                                                    setEndTime(formatted);
                                                }}
                                                keyboardType="numeric"
                                                maxLength={5}
                                            />
                                        </View>
                                    </View>

                                    {/* Expiry Date */}
                                    <View style={{ marginTop: 20 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                                            <CalendarOff width={16} />
                                            <CustomText weight="semiBold" color="#374151">Expiry Date</CustomText>
                                        </View>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="DD-MM-YY"
                                            value={endDate}
                                            onChangeText={(text) => {
                                                let formatted = text.replace(/[^0-9]/g, '');
                                                if (formatted.length > 2 && formatted.length <= 4)
                                                    formatted = `${formatted.slice(0, 2)}-${formatted.slice(2)}`;
                                                else if (formatted.length > 4)
                                                    formatted = `${formatted.slice(0, 2)}-${formatted.slice(2, 4)}-${formatted.slice(4, 6)}`;
                                                setEndDate(formatted);
                                            }}
                                            keyboardType="numeric"
                                            maxLength={8}
                                        />
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>

                    <View style={{ paddingBottom: 100 }}>
                        <ThemeButton
                            text="Create Hive"
                            onPress={handleCreateHive}
                            style={{ width: "100%" }}
                        />
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
    snapText: {
        fontSize: 30,
        marginTop: 10,

    },
    uploadContainer: {
        width: '100%',
        height: 188,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    inputType: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 16,
        paddingLeft: 10,
        paddingVertical: 16,
        fontSize: 16,
    },

    privacyContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    privacy: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        marginTop: 8,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        width: '100%'
    },
});

export default CreateHive;