import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ThemeButton from './ThemeButton';
import CustomText from './CustomText';

// SVG icons (adjust paths as needed)
import Portrait from '../../assets/svg/portrait.svg';
import Hdr from '../../assets/svg/hdr.svg';
import Filter from '../../assets/svg/filter.svg';
import PremiumModal from './PremiumModal';

// Define before/after images for modal
const beforeImage = require("../../assets/selfie.jpg");
const afterImage = require("../../assets/dp3.jpg");
const PhotoEditMenu = ({ onClose }) => {
    const navigation = useNavigation();
    const [brightness, setBrightness] = useState(50);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.bottomPanel}>
            {/* Brightness Section */}
            <View style={styles.brightnessSection}>
                <View style={styles.brightnessHeader}>
                    <CustomText weight="medium" style={styles.brightnessLabel}>
                        Brightness • {brightness}
                    </CustomText>

              
                    <Text style={styles.closeBtn} onPress={onClose}>X</Text>
                </View>

                <View style={styles.sliderContainer}>
                    <View style={styles.customSlider}>
                        <View style={styles.sliderTrack}>
                            <View style={[styles.sliderFill, { width: `${brightness}%` }]} />
                            <TouchableOpacity
                                style={[styles.sliderThumb, { left: `${brightness}%` }]}
                                onPressIn={() => {
            
                                }}
                            />
                        </View>
                    </View>
                    <CustomText weight="semiBold" style={styles.brightnessValue}>{brightness}%</CustomText>
                </View>
            </View>

            {/* Premium Tools */}
            <View style={styles.premiumSection}>
                <CustomText weight="medium" style={styles.premiumTitle}>Premium Tools</CustomText>
                <View style={styles.toolsContainer}>
                    {/* Tool 1 */}
                    <TouchableOpacity style={styles.premiumTool}>
                        <View style={styles.toolIcon}>
                            <Portrait width={24} height={24} />
                        </View>
                        <CustomText weight="semiBold" style={styles.toolText}>Portrait Retouch</CustomText>
                        <View style={styles.crownIcon}>
                            <CustomText weight="semiBold" style={styles.crownText}>👑</CustomText>
                        </View>
                    </TouchableOpacity>

                    {/* Tool 2 */}
                    <TouchableOpacity
                        style={styles.premiumTool}
                        onPress={() => setModalVisible(true)}
                    >
                        <View style={styles.toolIcon}>
                            <Hdr width={24} height={24} />
                        </View>
                        <CustomText weight="semiBold" style={styles.toolText}>Advanced Filters</CustomText>
                        <View style={styles.crownIcon}>
                            <CustomText weight="semiBold" style={styles.crownText}>👑</CustomText>
                        </View>
                    </TouchableOpacity>

                    {/* Tool 3 */}
                    <TouchableOpacity style={styles.premiumTool}>
                        <View style={styles.toolIcon}>
                            <Filter width={24} height={24} />
                        </View>
                        <CustomText weight="semiBold" style={styles.toolText}>HDR Boost</CustomText>
                        <View style={styles.crownIcon}>
                            <CustomText weight="semiBold" style={styles.crownText}>👑</CustomText>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Continue Button */}
            <ThemeButton
                text="Continue"
                onPress={() => navigation.navigate('ClickPhotoThree')}
                style={{ width: '100%' }}
            />

            {/* Modal */}
            <PremiumModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                beforeImage={beforeImage}
                afterImage={afterImage}
            />
        </View>
    );
};

export default PhotoEditMenu;

const styles = StyleSheet.create({
    bottomPanel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000000CC',
        padding: 20,
        paddingBottom: 40,
        zIndex: 15,
    },
    brightnessSection: { marginBottom: 25 },
    brightnessHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    brightnessLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    closeBtn: {
        color: '#ffffff',
        fontSize: 20,
        paddingHorizontal: 10,
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    customSlider: { flex: 1, height: 40, justifyContent: 'center' },
    sliderTrack: {
        height: 4,
        backgroundColor: '#333',
        borderRadius: 2,
        position: 'relative',
    },
    sliderFill: {
        height: 4,
        backgroundColor: '#4CAF50',
        borderRadius: 2,
    },
    sliderThumb: {
        width: 20,
        height: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        position: 'absolute',
        top: -8,
        marginLeft: -10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    brightnessValue: {
        color: '#fff',
        fontSize: 14,
        minWidth: 35,
    },
    premiumSection: { marginBottom: 25 },
    premiumTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 15,
    },
    toolsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    premiumTool: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        position: 'relative',
    },
    toolIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    toolText: {
        color: '#000',
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
    },
    crownIcon: {
        position: 'absolute',
        top: 8,
        right: 10,
    },
    crownText: { fontSize: 14 },
});
