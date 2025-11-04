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
    const [description, setDescription] = useState("");
    const { addEvent } = useContext(EventContext);

    const handleCreateHive = () => {
        // Validate required fields
        if (!hiveName.trim()) {
            alert('Please enter a hive name');
            return;
        }

        if (!uploadedImage) {
            alert('Please upload a cover image');
            return;
        }

        // Create new event object
        const newEvent = {
            img: { uri: uploadedImage },
            title: hiveName,
            description: description || 'No description',
            count: '0 Photos',
            photos: [], // Empty photos array initially
            createdAt: new Date().toISOString(),
        };

        // Add the new event to the events array
        addEvent(newEvent);

        // Clear form fields
        setUploadedImage(null);
        setHiveName("");
        setDescription("");

        // Navigate back to Home with a slight delay to ensure state updates
        setTimeout(() => {
            navigation.navigate('Home');
        }, 100);
    };

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
                                    <CustomText style={{ marginTop: 4 }}>JPG, PNG up to 10MB</CustomText>
                                </>
                            )}
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={{ marginBottom: 16 }}>
                        <CustomText weight='medium' style={{ marginBottom: 4 }}>Hive Name *</CustomText>
                        <TextInput 
                            placeholder='Summer Vacation 2024' 
                            style={styles.inputType} 
                            keyboardType="default"
                            autoCapitalize="words"
                            autoCorrect={false}
                            value={hiveName}
                            onChangeText={setHiveName}
                        />
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
                            value={description}
                            onChangeText={setDescription}
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
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <CustomText>Automatic Upload</CustomText>
                                <CustomText>All members can upload instantly. Best for casual events.</CustomText>
                            </View>
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
        fontSize: 32,
        marginTop: 20,
        marginBottom: 8,
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
        borderRadius: 8,
        paddingLeft: 10,
        paddingVertical: 12,
        fontSize: 16,
    },
    privacy: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
});

export default CreateHive;