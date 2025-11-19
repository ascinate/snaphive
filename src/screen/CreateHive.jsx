import React, { useState, useCallback, useEffect, useContext, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Platform, Animated, Text, TextInput, TouchableWithoutFeedback, Switch, Keyboard } from 'react-native';
import { navigate } from '../navigation/RootNavigation';
import { Sparkles, Users, FileImage, Clock5, RotateCwSquare, Image, LockOpen, Lock, Calendar, Timer, TimerOff, CalendarOff, Plus, Upload, CalendarDays, Shield, Info } from 'lucide-react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { EventContext } from '../context/EventContext';
import { launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
// components
import TopNav from '../components/TopNavbar';
import CustomText from '../components/CustomText';
import ThemeButton from '../components/ThemeButton';
import { colors } from '../Theme/theme';
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';

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
    const [selected, setSelected] = useState('automatic');
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [uploadType, setUploadType] = useState('automatic');
    const [hiveType, setHiveType] = useState(null);
    const [checked, setChecked] = useState(false);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);

    const data = [
        { label: 'Invite Only', value: '1' },
        { label: 'Public', value: '2' },
    ];

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
            hiveType: hiveType,
        };

        addEvent(newEvent);
        setUploadedImage(null);
        setHiveName("");
        setHiveDescription("");
        setDate('');
        setStartDate('');
        setEndTime('');
        setEndDate('');
        setIsEnabled(false);
        setHiveType(null);
        navigation.goBack()
    };

    const handleChange = (text) => {
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
                    <View style={{ alignItems: 'flex-start', marginTop: 12 }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignSelf: 'flex-start',
                                gap: 8,
                                backgroundColor: 'rgba(255, 219, 186, 0.5)',
                                borderRadius: 25,
                                paddingHorizontal: 16,
                                paddingVertical: 6,
                            }}
                        >
                            <Sparkles color="#FFAD60" size={14} />
                            <CustomText weight="medium" style={styles.importHeading}>
                                Create a new
                            </CustomText>
                            <CustomText weight="bold" style={styles.importHeading}>
                                Hive
                            </CustomText>
                        </View>
                    </View>

                    <View>
                        <CustomText weight="bold" style={styles.snapText}>
                            Start Sharing Memories
                        </CustomText>
                    </View>
                    <CustomText weight='regular' style={{ color: '#374151' }}>Set up your photo collection in seconds</CustomText>

                    <View style={[styles.createHiveCard, { marginBottom: 120, }]}>
                        <LinearGradient
                            colors={['#E1711C', '#E5B925']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1.6, y: 0 }}
                            style={styles.continueBtn}
                        >
                            <View style={styles.touchable}>
                                <View style={styles.content}>

                                    <CustomText weight="Bold" style={styles.continueTxt}>
                                        Hive Details
                                    </CustomText>
                                </View>
                            </View>
                        </LinearGradient>

                        <View style={{ paddingHorizontal: 20, }}>
                            <View style={{ marginBottom: 16, marginTop: 16 }}>
                                <CustomText weight='bold' style={{ marginBottom: 4, color: '#374151' }}>Hive Name *</CustomText>
                                <TextInput
                                    placeholder='Summer Wedding, Family Vacation'
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
                                <CustomText weight="bold" style={{ marginBottom: 4, color: '#374151' }}>
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

                            <CustomText weight='bold' style={{ marginBottom: 4, color: '#374151' }}>Cover Image</CustomText>

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
                                            <Upload color='#9B9B9B' width={28} height={28} />

                                            <CustomText weight='medium' style={{ marginTop: 4, color: '#67696b' }}>Upload your own image</CustomText>
                                        </>
                                    )}
                                </View>
                            </TouchableWithoutFeedback>
                            <CustomText weight="medium" style={{ marginBottom: 4, color: colors.textGray, marginTop: 16, marginBottom: 24 }}>
                                Or choose from stock options based on event type
                            </CustomText>

                            <View style={{ marginBottom: 16 }}>
                                <CustomText weight="bold" style={{ marginBottom: 4, color: '#374151' }}>
                                    Privacy Mode
                                </CustomText>
                                <Dropdown
                                    style={[styles.inputType]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    data={data}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    searchPlaceholder="Search..."
                                    placeholder="Hive Type"
                                    value={hiveType}
                                    onChange={item => {
                                        setHiveType(item.value);
                                    }}
                                />
                            </View>

                            <View style={[styles.radiobuttonContainer, { borderColor: '#FFBCE1', backgroundColor: '#FDF2F8', marginTop: 20 }]}>

                                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginBottom: 12 }}>
                                    <Shield color='#5B0064' />
                                    <CustomText weight='bold' style={{ fontSize: 16, }}>Media Upload Settings</CustomText>
                                </View>
                                <TouchableOpacity
                                    style={styles.privacy}
                                    onPress={() => setUploadType('automatic')}
                                    activeOpacity={0.7}
                                >
                                    <View >
                                        <View style={{
                                            height: 20,
                                            width: 20,
                                            borderRadius: 10,
                                            borderWidth: 2,
                                            borderColor: uploadType === 'automatic' ? '#EC4899' : '#D1D5DB',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            {uploadType === 'automatic' && (
                                                <View style={{
                                                    height: 10,
                                                    width: 10,
                                                    borderRadius: 5,
                                                    backgroundColor: '#EC4899',
                                                }} />
                                            )}
                                        </View>
                                    </View>

                                    <View style={{ flex: 1, marginLeft: 12 }}>
                                        <CustomText weight='bold' style={{ fontSize: 16 }}>Automatic Upload</CustomText>
                                        <CustomText weight='medium' style={{ color: colors.textGray, fontSize: 12 }}>All media is uploaded instantly. Only select if you trust your group and the content they'll share</CustomText>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.privacy}
                                    onPress={() => setUploadType('approval')}
                                    activeOpacity={0.7}
                                >
                                    <View >
                                        <View style={{
                                            height: 20,
                                            width: 20,
                                            borderRadius: 10,
                                            borderWidth: 2,
                                            borderColor: uploadType === 'approval' ? '#EC4899' : '#D1D5DB',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            {uploadType === 'approval' && (
                                                <View style={{
                                                    height: 10,
                                                    width: 10,
                                                    borderRadius: 5,
                                                    backgroundColor: '#EC4899',
                                                }} />
                                            )}
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, marginLeft: 12 }}>
                                        <CustomText weight='bold' style={{ fontSize: 16 }}>Approval Required</CustomText>
                                        <CustomText weight='medium' style={{ color: colors.textGray, fontSize: 12 }}>Uploaded media must be reviewed and approved by authorized members. Best for formal events.</CustomText>
                                    </View>
                                </TouchableOpacity>

                                {uploadType === 'automatic' && (
                                    <TouchableOpacity
                                        style={{
                                            flexDirection: 'row',
                                            backgroundColor: '#FFF0CF',
                                            borderRadius: 12,
                                            padding: 16,
                                            marginTop: 8,
                                            marginBottom: 10,
                                        }}
                                        // onPress={() => setUploadType('acknowledge')}
                                        activeOpacity={0.7}
                                    >
                                        <View >
                                            <View style={{
                                                height: 20,
                                                width: 20,
                                                borderRadius: 10,
                                                borderWidth: 2,
                                                borderColor: uploadType === 'acknowledge' ? '#EC4899' : '#D1D5DB',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                {uploadType === 'acknowledge' && (
                                                    <View style={{
                                                        height: 10,
                                                        width: 10,
                                                        borderRadius: 5,
                                                        backgroundColor: '#EC4899',
                                                    }} />
                                                )}
                                            </View>
                                        </View>

                                        <View style={{ flex: 1, marginLeft: 12 }}>
                                            <CustomText weight='medium' style={{ color: colors.textGray, fontSize: 12 }}>
                                                I understand that I am responsible for all media automatically uploaded
                                                to this Hive. Members will be able to upload photos and videos without
                                                my approval.
                                            </CustomText>
                                        </View>
                                    </TouchableOpacity>
                                )}

                            </View>
                            <View style={{ marginBottom: 0, }}>
                                <View style={styles.privacyContainer}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            <CalendarDays />
                                            <View style={{ marginLeft: 12 }}>
                                                <CustomText weight='bold' style={{ fontSize: 16 }}>Temporary Event Hive</CustomText>
                                                <CustomText weight='regular' style={{ color: '#374151', fontSize: 12 }}>Set dates for this event</CustomText>
                                            </View>
                                        </View>
                                        <Switch
                                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                                            thumbColor={isEnabled ? '#4b5cf5ff' : '#f4f3f4'}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={toggleSwitch}
                                            value={isEnabled}
                                        />
                                    </View>
                                    {/* that time only show this View */}
                                    {isEnabled && (
                                        <View style={{ paddingInline: 6 }}>
                                            {/* Event Date */}

                                            <View style={{ marginTop: 15 }}>
                                                <View style={{ backgroundColor: '#ccc', height: 0.4, width: '100%', }} />

                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 5, marginTop: 15 }}>
                                                    <Calendar width={16} />
                                                    <CustomText weight="semiBold" color="#374151">Event Start Date</CustomText>


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
                                                    <CustomText weight="semiBold" color="#374151">Event End Date</CustomText>
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




                                <View style={[styles.radiobuttonContainer, { borderColor: '#5AAF9A', backgroundColor: '#F0FCF9', }]}>

                                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginBottom: 12 }}>
                                        <Shield color='#5B0064' />
                                        <CustomText weight='bold' style={{ fontSize: 16, }}>Messaging & Comments</CustomText>
                                    </View>
                                    <View style={styles.privacy}>

                                        <View style={{ flex: 1, marginLeft: 12 }}>
                                            <CustomText weight='bold' style={{ fontSize: 16 }}>Enable Messaging</CustomText>
                                            <CustomText weight='medium' style={{ color: '#374151' }}>Allow members to post messages and comment on photos</CustomText>
                                        </View>
                                    </View>

                                    <View style={styles.privacy}>

                                        <View style={{ flex: 1, marginLeft: 12 }}>
                                            <CustomText weight='bold' style={{ fontSize: 16 }}>Admin Message Control</CustomText>
                                            <CustomText weight='medium' style={{ color: '#374151' }}>Allow admin to remove messages posted by members</CustomText>
                                        </View>
                                    </View>

                                    <View style={[styles.privacy, { backgroundColor: 'transparent', borderColor: '#5AAF9A', }]}>
                                        <Info color='#5AAF9A' />
                                        <View style={{ flex: 1, marginLeft: 12 }}>

                                            <CustomText weight='medium' style={{ color: '#5AAF9A' }}>Members will be able to react with emojis and post comments on photos and in the general chat.</CustomText>
                                        </View>
                                    </View>
                                </View>


                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => setChecked(!checked)}
                                        style={{
                                            height: 20,
                                            width: 20,
                                            borderRadius: 4,
                                            borderWidth: 2,
                                            borderColor: checked ? '#69ec48ff' : '#9CA3AF',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: 8,
                                        }}
                                        activeOpacity={0.7}
                                    >
                                        {checked && (
                                            <View
                                                style={{
                                                    height: 12,
                                                    width: 12,
                                                    backgroundColor: '#5bec48ff',
                                                    borderRadius: 2,
                                                }}
                                            />
                                        )}
                                    </TouchableOpacity>
                                    <TouchableWithoutFeedback onPress={() => setShowPrivacyModal(true)}>
                                        <View style={{ paddingHorizontal: 30 }}>

                                            <CustomText weight="medium" style={{ color: '#646464' }}>
                                                I have read the Content Responsibility & Privacy Policy and agree that I am responsible for all content uploaded to my event hive.
                                            </CustomText>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>



                                <View style={{}}>
                                    <ThemeButton
                                        text="Create Hive"
                                        onPress={handleCreateHive}
                                        style={{ width: "100%" }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <PrivacyPolicyModal
                        visible={showPrivacyModal}
                        onClose={() => setShowPrivacyModal(false)}
                    />
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: width * 0.05,
        backgroundColor: '#fff',
    },
    snapText: {
        fontSize: 30,
        marginTop: 10,
        color: '#000',
    },
    uploadContainer: {
        width: '100%',
        height: 200,
        borderWidth: 1.8,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    inputType: {
        borderWidth: 1,
        borderColor: '#F6F6F6',
        backgroundColor: '#F6F6F6',
        borderRadius: 10,
        paddingLeft: 18,
        paddingVertical: 16,
        fontSize: 16,
    },

    privacyContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,

    },
    privacy: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#D9D9D9',
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

    importHeading: {
        fontSize: 14,
        fontWeight: '600',
        color: '#E3761B',
        marginBottom: 4,
        lineHeight: 20,
    },
    continueBtn: {
        width: '100%',

        overflow: 'hidden',
    },
    touchable: {
        paddingVertical: 21,
        paddingHorizontal: 20,

    },
    content: {
        flexDirection: 'row',
        gap: 8,
    },
    continueTxt: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
    createHiveCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        marginTop: 20,
        paddingBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#F6F6F6',
        backgroundColor: '#F6F6F6',
        borderRadius: 10,
        paddingHorizontal: 18,
        paddingVertical: 16,
        fontSize: 16,
        color: '#800b0bff',
    },
    placeholderStyle: {
        color: '#999',
        fontSize: 16,
    },
    selectedTextStyle: {
        color: '#000',
        fontSize: 16,
    },
    radiobuttonContainer: {
        borderWidth: 1,

        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 16,
    }
});

export default CreateHive;