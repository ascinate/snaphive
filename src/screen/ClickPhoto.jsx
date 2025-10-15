import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Platform, PermissionsAndroid, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import TopNav from '../components/TopNavbar';
import Gallery from '../../assets/svg/gallery.svg';
import Settings from '../../assets/svg/settings.svg';

const selfie = require("../../assets/selfie.jpg");

const ClickPhoto = ({ navigation }) => {
    const [photo, setPhoto] = useState(null);
    const [showCamera, setShowCamera] = useState(true);
    const cameraRef = useRef(null);
    
    const device = useCameraDevice('back');
    const { hasPermission, requestPermission } = useCameraPermission();

    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission]);

    const takePhoto = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePhoto({
                    qualityPrioritization: 'balanced',
                    flash: 'off',
                });
                
                setPhoto(`file://${photo.path}`);
                setShowCamera(false);
                console.log('Photo taken:', photo.path);
            } catch (error) {
                console.error('Failed to take photo:', error);
                Alert.alert('Error', 'Failed to capture photo');
            }
        }
    };

    const retakePhoto = () => {
        setPhoto(null);
        setShowCamera(true);
    };

    if (!hasPermission) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.safeArea}>
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
                    <View style={styles.container}>
                        <Text style={styles.permissionText}>Camera not available</Text>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }

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
                        <Image 
                            source={{ uri: photo }} 
                            style={styles.image} 
                            resizeMode="cover" 
                        />
                    )}

                    <TouchableOpacity 
                        style={styles.shutter} 
                        onPress={showCamera ? takePhoto : retakePhoto}
                        activeOpacity={0.7}
                    >
                        <View style={styles.shutterBtn} />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.settingsBtn} 
                        onPress={() => navigation.navigate("ClickPhotoTwo")}
                    >
                        <Settings />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.galleryBtn}>
                        <Gallery />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.closeBtn} 
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.closeText}>X</Text>
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
    camera: { 
        width: '100%', 
        height: '100%',
        position: 'absolute',
    },
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
    },

    closeText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },

    permissionText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 50,
    }
});