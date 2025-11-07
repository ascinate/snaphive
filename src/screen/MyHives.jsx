import React, { useState, useCallback, useEffect, useContext, useRef } from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Animated,
    Text,
    TextInput,
    RefreshControl,
} from 'react-native';
import {
    Sparkles,
    Users,
    FileImage,
    Clock5,
    ImagePlus,
    MoveRight,
    Brush,
    Image as Photo,
    Search,
    CirclePlus,
} from 'lucide-react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { EventContext } from '../context/EventContext';
import { useNavigation } from '@react-navigation/native';

// components
import TopNav from '../components/TopNavbar';
import CustomText from '../components/CustomText';

// assets
const picnic1 = require('../../assets/picnic1.jpg');

const { width, height } = Dimensions.get('window');

const MyHives = ({ navigation, route }) => {
    const [refreshing, setRefreshing] = useState(false);
    const { events, setEvents } = useContext(EventContext);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setEvents(prev => [...prev]);
            setRefreshing(false);
        }, 1000);
    }, [setEvents]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <TopNav />

                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    {/* Header Section */}
                    <View style={styles.headerSection}>
                        <Text style={styles.title}>My Hives</Text>
                        <CustomText style={styles.subtitle}>
                            All your shared memories in one place
                        </CustomText>
                        <View style={{ position: 'relative', justifyContent: 'center' }}>
                            <Search
                                size={18}
                                color="#9CA3AF"
                                style={{
                                    position: 'absolute',
                                    top: ' 45%',
                                    left: 14,

                                    zIndex: 10,
                                }}
                            />
                            <TextInput
                                style={[styles.searchInput, { paddingLeft: 38 }]}
                                placeholder="Search hive..."
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>


                    </View>

                    {/* Dashboard Cards */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                        }}>
                        <View style={styles.dashCard}>

                            <View>
                                <CustomText weight="bold" style={styles.cardText}>
                                    11
                                </CustomText>
                                <CustomText weight="medium">Total Hives</CustomText>
                            </View>
                        </View>

                        <View style={styles.dashCard}>

                            <View>
                                <CustomText weight="bold" style={styles.cardText}>
                                    257
                                </CustomText>
                                <CustomText weight="medium">Total Photos</CustomText>
                            </View>
                        </View>
                    </View>

                    {/* Example Event Row */}

                    {/* Event Row Section */}
                    <View style={{ marginTop: 20, paddingBottom: 100 }}>
                        {events.length > 0 ? (
                            events.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() =>
                                        navigation.navigate('FolderLayout', {
                                            image: item.img,
                                            folderName: item.title,
                                            date: item.createdAt,
                                            owner: "Pritam",
                                            photos: item.photos,
                                        })
                                    }
                                >
                                    <View style={styles.eventRow}>
                                        <Image source={item.img} style={styles.eventImg} />
                                        <View style={{ flex: 1, marginLeft: width * 0.03 }}>
                                            <CustomText weight="bold" style={styles.eventTitle}>
                                                {item.title}
                                            </CustomText>
                                            <CustomText weight="medium" style={styles.mtop}>
                                                {item.description || 'No description'}
                                            </CustomText>
                                            <View style={{ flexDirection: 'row', gap: 20, marginTop: 6 }}>
                                                <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                                                    <Users width={14} height={14} color="#6B7280" />
                                                    <CustomText style={{ color: '#6B7280' }}>1</CustomText>
                                                </View>

                                                <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                                                    <FileImage width={14} height={14} color="#6B7280" />
                                                    <CustomText style={{ color: '#6B7280' }}>{item.count}</CustomText>
                                                </View>

                                                {item.isTemporary && (
                                                    <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                                                        <Clock5 width={14} height={14} color="#ea580c" />
                                                        <CustomText style={{ color: '#ea580c' }}>
                                                           {item.expiryDate}
                                                        </CustomText>
                                                    </View>
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 10,
                                    marginTop: 60,
                                    marginBottom: 80,
                                }}
                            >
                                <View
                                    style={{
                                        width: 60,
                                        height: 60,
                                        backgroundColor: '#f1e4ff',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 50,
                                    }}
                                >
                                    <ImagePlus color="#C084FC" size={28} />
                                </View>

                                <CustomText weight="medium" style={{ color: '#6B7280' }}>
                                    No hives yet
                                </CustomText>
                                <TouchableOpacity onPress={() => navigation.navigate('CreateHive')}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 6,
                                            backgroundColor: '#AE54F0',
                                            padding: 15,
                                            borderRadius: 12,
                                            marginTop: 8,
                                        }}
                                    >
                                        <CustomText weight="bold" style={{ color: '#ffffff' }}>
                                            Create your first hive
                                        </CustomText>
                                        <CirclePlus color="#ffffffff" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/*                     
                    <TouchableOpacity
                        style={styles.eventRow}
                        onPress={() => navigation.navigate('FolderLayout')}>
                        <Image source={picnic1} style={styles.eventImg} />
                        <View style={{ flex: 1, marginLeft: width * 0.03 }}>
                            <CustomText weight="bold" style={styles.eventTitle}>
                                Rajashthan
                            </CustomText>
                            <CustomText weight="medium" style={styles.mtop}>
                                I travel Rajashthan
                            </CustomText>
                            <View style={{ flexDirection: 'row', gap: 20, marginTop: 6 }}>
                                <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                                    <Users width={14} height={14} color='#6B7280' />
                                    <CustomText style={{ color: '#6B7280' }}>1</CustomText>
                                </View>

                                <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', }}>
                                    <FileImage width={14} height={14} color='#6B7280' />
                                    <CustomText style={{ color: '#6B7280' }}>2</CustomText>
                                </View>

                                <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', }}>
                                    <Clock5 width={14} height={14} color='#ea580c' />
                                    <CustomText style={{ color: '#ea580c' }}>3</CustomText>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity> */}
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
    headerSection: {
        marginVertical: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    searchInput: {
        marginTop: 12,
        backgroundColor: '#fff',

        paddingHorizontal: 20,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        color: '#111827',
        borderRadius: 16,
    },
    eventRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 14,
        marginTop: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#f3f4f6',
    },
    eventImg: {
        width: 90,
        height: 90,
        borderRadius: 12,
        marginRight: width * 0.01,
    },
    eventTitle: {
        fontSize: 16,
        color: '#111827',
        fontWeight: '600',
    },
    mtop: {
        marginTop: 6,
        color: '#6B7280',
    },

    profileIcon: {
        position: 'absolute',
        right: -10,
        bottom: -5,
        backgroundColor: '#ec4899',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dashCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '48%',
        padding: width * 0.045,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 2,
    },
    cardText: {
        fontSize: 18,
        color: '#111827',
    },
});

export default MyHives;
