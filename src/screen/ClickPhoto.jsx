import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Platform, PermissionsAndroid, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

//components
import TopNav from '../components/TopNavbar';
import PhotoEditMenu from '../components/PhotoEditMenu';

// svg
import Gallery from '../../assets/svg/gallery.svg';
import Settings from '../../assets/svg/settings.svg';

const ClickPhoto = ({ navigation }) => {
    const [photo, setPhoto] = useState(null);
    const [showCamera, setShowCamera] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isEditingUI, setIsEditingUI] = useState(false);
    const [brightness, setBrightness] = useState(50); // Added brightness state

    const cameraRef = useRef(null);
    const device = useCameraDevice('back');
    const { hasPermission, requestPermission } = useCameraPermission();

    useEffect(() => {
        if (!hasPermission) requestPermission();
    }, [hasPermission]);

    const handleEditToggle = () => setIsEditingUI(!isEditingUI);

    const savePhotoToGallery = async (photoPath) => {
        try {
            setIsSaving(true);

            if (Platform.OS === 'android') {
                const apiLevel = Platform.Version;
                let granted = false;

                if (apiLevel >= 33 || apiLevel >= 29) {
                    granted = true;
                } else {
                    granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                        {
                            title: 'Save Photo Permission',
                            message: 'This app needs permission to save photos to your gallery.',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        }
                    );
                    granted = granted === PermissionsAndroid.RESULTS.GRANTED;
                }

                if (!granted && apiLevel < 29) {
                    Alert.alert('Permission Denied', 'Cannot save photo without permission.');
                    setIsSaving(false);
                    return null;
                }
            }

            const savedPhoto = await CameraRoll.save(photoPath, { type: 'photo' });
            setIsSaving(false);
            return savedPhoto;
        } catch (error) {
            console.error('Failed to save photo:', error);
            Alert.alert('Error', 'Failed to save photo to gallery');
            setIsSaving(false);
            return null;
        }
    };

    const takePhoto = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePhoto({
                    qualityPrioritization: 'balanced',
                    flash: 'off',
                });

                const photoUri = `file://${photo.path}`;
                setPhoto(photoUri);
                setShowCamera(false);
                await savePhotoToGallery(photoUri);
            } catch (error) {
                console.error('Failed to take photo:', error);
                Alert.alert('Error', 'Failed to capture photo');
            }
        }
    };

    const retakePhoto = () => {
        setPhoto(null);
        setShowCamera(true);
        setBrightness(50); // Reset brightness
        setIsEditingUI(false);
    };

    const usePhoto = () => navigation.navigate("PhotoShare");

    // Handle brightness change from PhotoEditMenu
    const handleBrightnessChange = (value) => {
        console.log('Brightness changed to:', value); // Debug log
        setBrightness(value);
    };

    if (!hasPermission) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.safeArea}>
                    <TopNav />
                    <View style={styles.container}>
                        <Text style={styles.permissionText}>Camera permission required</Text>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }

    if (!device) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.safeArea}>
                    <TopNav />
                    <View style={styles.container}>
                        <Text style={styles.permissionText}>Camera not available</Text>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }

    // Calculate brightness overlay opacity (0 = dark, 100 = bright)
    const brightnessOverlayOpacity = brightness < 50 
        ? (50 - brightness) / 50 * 0.7  // Darken
        : 0;
    
    const brightnessOverlayColor = brightness > 50
        ? `rgba(255, 255, 255, ${(brightness - 50) / 50 * 0.5})` // Brighten
        : `rgba(0, 0, 0, ${brightnessOverlayOpacity})`;

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <TopNav />
                <View style={styles.container}>
                    {showCamera ? (
                        <Camera
                            ref={cameraRef}
                            style={styles.camera}
                            device={device}
                            isActive={showCamera}
                            photo={true}
                        />
                    ) : (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: photo }} style={styles.image} resizeMode="cover" />
                            {/* Brightness overlay */}
                            {brightness !== 50 && (
                                <View 
                                    style={[
                                        styles.brightnessOverlay, 
                                        { backgroundColor: brightnessOverlayColor }
                                    ]} 
                                />
                            )}
                        </View>
                    )}

                    {!showCamera && (
                        <View style={styles.photoActions}>
                            <TouchableOpacity style={styles.actionButton} onPress={retakePhoto}>
                                <Text style={styles.actionButtonText}>Retake</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.usePhotoButton]}
                                onPress={usePhoto}
                                disabled={isSaving}
                            >
                                <Text style={styles.actionButtonText}>
                                    {isSaving ? 'Saving...' : 'Use Photo'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <TouchableOpacity
                        style={styles.shutter}
                        onPress={showCamera ? takePhoto : retakePhoto}
                        activeOpacity={0.7}
                    >
                        <View style={styles.shutterBtn} />
                    </TouchableOpacity>

                    {/* Settings Button only after photo taken */}
                    {!showCamera && (
                        <TouchableOpacity style={styles.settingsBtn} onPress={handleEditToggle}>
                            <Settings />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={styles.galleryBtn}
                        onPress={() => navigation.navigate("PhotoShare")}
                    >
                        <Gallery />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
                        <Text style={styles.closeText}>X</Text>
                    </TouchableOpacity>
                </View>

                {/* Bottom Edit Menu */}
                {isEditingUI && (
                    <PhotoEditMenu 
                        onClose={() => setIsEditingUI(false)} 
                        brightness={brightness}
                        onBrightnessChange={handleBrightnessChange}
                        photoUri={photo}
                    />
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default ClickPhoto;

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    container: { flex: 1, position: 'relative' },
    camera: { width: '100%', height: '100%', position: 'absolute' },
    imageContainer: { 
        width: '100%', 
        height: '100%', 
        position: 'relative' 
    },
    image: { width: '100%', height: '100%' },
    brightnessOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
    },
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
    },
    closeText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    permissionText: { color: 'white', fontSize: 16, textAlign: 'center', marginTop: 50 },
    photoActions: {
        position: 'absolute',
        top: 100,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        zIndex: 20,
    },
    actionButton: {
        backgroundColor: '#030303B2',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    usePhotoButton: { backgroundColor: '#4CAF50' },
    actionButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});