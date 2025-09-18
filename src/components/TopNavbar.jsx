import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// Import your SVGs
import Logo from '../../assets/svg/logo.svg'; // replace with your hive logo svg
import Bell from '../../assets/svg/bell.svg'; // replace with your bell svg

const TopNav = () => {
    return (
        
        <View style={styles.container}>
            {/* Left Section: Logo + Text */}
            <View style={styles.leftSection}>
                <Logo width={28} height={28} />
                <Text style={styles.logoText}>Snaphive</Text>
            </View>

            {/* Right Section: Notification */}
            <TouchableOpacity style={styles.bellWrapper}>
                <Bell width={28} height={28} />
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>1</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 70,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',

    },
    leftSection: {
        
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
    bellWrapper: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -6,
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 1,
        minWidth: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
});

export default TopNav;
