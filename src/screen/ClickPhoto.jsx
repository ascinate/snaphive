import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Platform, PermissionsAndroid, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TopNav from '../components/TopNavbar';
import Gallery from '../../assets/svg/gallery.svg';
import Settings from '../../assets/svg/settings.svg';
import { launchCamera } from 'react-native-image-picker';

const selfie = require("../../assets/selfie.jpg");

const ClickPhoto = ({ navigation }) => {
    const [photo, setPhoto] = useState(selfie);
    const [hasPermission, setHasPermission] = useState(false);

    // Request camera permissions
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                ]);

                if (
                    granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED
                ) {
                    setHasPermission(true);
                    return true;
                } else {
                    Alert.alert('Permission Denied', 'Camera permission is required to take photos');
                    return false;
                }
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true;
    };

    useEffect(() => {
        requestCameraPermission();
    }, []);

    const openCamera = async () => {
        // Check permission first
        const permitted = hasPermission || await requestCameraPermission();
        
        if (!permitted) {
            Alert.alert('Permission Required', 'Please grant camera permission to take photos');
            return;
        }

        const options = {
            mediaType: 'photo',
            saveToPhotos: true,
            cameraType: 'back',
            quality: 0.8,
            includeBase64: false,
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.errorCode) {
                console.log('Camera Error: ', response.errorMessage);
                Alert.alert('Camera Error', response.errorMessage || 'Failed to open camera');
            } else if (response.assets && response.assets[0]) {
                setPhoto({ uri: response.assets[0].uri });
            }
        });
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <TopNav />
                <View style={styles.container}>
                    <Image source={photo} style={styles.image} resizeMode="cover" />

                    <TouchableOpacity style={styles.shutter} onPress={openCamera}>
                        <View style={styles.shutterBtn} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingsBtn} onPress={() => navigation.navigate("ClickPhotoTwo")}>
                        <Settings />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.galleryBtn}>
                        <Gallery />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>X</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default ClickPhoto;

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    container: { flex: 1, position: 'relative' },
    image: { width: '100%', height: '100%' },

    shutter: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    shutterBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
    },

    settingsBtn: {
        width: 40,
        height: 40,
        backgroundColor: '#030303B2',
        borderRadius: 20,
        position: 'absolute',
        bottom: 30,
        right: 70,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 15,
    },

    galleryBtn: {
        width: 40,
        height: 40,
        backgroundColor: '#030303B2',
        borderRadius: 20,
        position: 'absolute',
        bottom: 30,
        left: 70,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 15,
    },

    closeBtn: {
        width: 40,
        height: 40,
        backgroundColor: '#FFFFFF4D',
        borderRadius: 20,
        position: 'absolute',
        top: 30,
        left: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 15,
    }
});