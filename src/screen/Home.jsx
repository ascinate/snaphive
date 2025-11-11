import React, { useState, useCallback, useEffect, useContext, useRef } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Platform, Animated } from 'react-native';
import { RefreshControl } from 'react-native';
import { Sparkles, Users, FileImage, Clock5, ImagePlus, MoveRight, Plus, FolderOpen } from 'lucide-react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { EventContext } from '../context/EventContext';
import { colors } from '../Theme/theme';
// components
import TopNav from '../components/TopNavbar';
import CustomText from '../components/CustomText';
import AsyncStorage from '@react-native-async-storage/async-storage';

// assets
const hero = require('../../assets/hero.png');
const picnic1 = require('../../assets/picnic1.jpg');

const { width, height } = Dimensions.get('window');

const Home = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [showImportBanner, setShowImportBanner] = useState(true);
  const { events, setEvents } = useContext(EventContext);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const [user, setUser] = useState(null);


  const parseExpiryDate = (dateString, timeString) => {
    try {
      if (!dateString) return null;

      // Parse DD-MM-YY format
      const [day, month, year] = dateString.split('-');
      if (!day || !month || !year) return null;

      // Convert 2-digit year to 4-digit (assuming 20XX)
      const fullYear = year.length === 2 ? `20${year}` : year;

      // Parse time if provided (HH:MM format)
      let hours = 23, minutes = 59, seconds = 59;
      if (timeString) {
        const timeParts = timeString.split(':');
        if (timeParts.length === 2) {
          hours = parseInt(timeParts[0]) || 23;
          minutes = parseInt(timeParts[1]) || 59;
        }
      }

      // Create date object (month is 0-indexed in JS)
      const expiryDate = new Date(
        parseInt(fullYear),
        parseInt(month) - 1,
        parseInt(day),
        hours,
        minutes,
        seconds
      );

      // Validate the date
      if (isNaN(expiryDate.getTime())) {
        console.warn('Invalid expiry date:', dateString);
        return null;
      }

      return expiryDate;
    } catch (error) {
      console.error('Error parsing expiry date:', error);
      return null;
    }
  };

  const removeExpiredEvents = useCallback(() => {
    const now = new Date();

    setEvents(prevEvents =>
      prevEvents.filter(event => {
        // Keep non-temporary events
        if (!event.isTemporary) return true;

        // Keep events without expiry date (safety)
        if (!event.expiryDate) return true;

        // Parse the expiry date with end time if available
        const eventExpiry = parseExpiryDate(event.expiryDate, event.endTime);

        // If parsing failed, keep the event (safety)
        if (!eventExpiry) return true;

        // Check if event has expired
        const hasExpired = eventExpiry < now;

        if (hasExpired) {
          console.log(`Removing expired event: ${event.title}, expired at: ${eventExpiry.toISOString()}`);
        }

        return !hasExpired;
      })
    );
  }, [setEvents]);

  useEffect(() => {
    // Run immediately when component mounts
    removeExpiredEvents();

    // Run every 30 seconds to auto-remove expired events
    const interval = setInterval(removeExpiredEvents, 30 * 1000);

    return () => clearInterval(interval);
  }, [removeExpiredEvents]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          console.log("Loaded user:", JSON.parse(storedUser));
        }
      } catch (error) {
        console.log("Error loading user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (route?.params?.newEvent) {
      const { name, photos } = route.params.newEvent;

      const newEvent = {
        img: { uri: uploadedImage },
        title: hiveName,
        description: hiveDescription || 'No description',
        count: '0 Photos',
        photos: [],
        createdAt: new Date().toISOString(),
      };

      setEvents(prevEvents => [newEventObj, ...prevEvents]);
      navigation.setParams({ newEvent: null });
    }
  }, [route?.params?.newEvent]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      removeExpiredEvents();
      setRefreshing(false);
    }, 1000);
  }, [removeExpiredEvents]);

  const handleLater = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setShowImportBanner(false));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <TopNav />

        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Hero Section */}
          <View style={[styles.ImportSection, {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: width * 0.03,
              }}
            >
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignSelf: 'center',
                    gap: 8,
                    backgroundColor: 'rgba(255, 219, 186, 0.5)',
                    borderRadius: 25,
                    paddingHorizontal: 16,
                    paddingVertical: 6,
                  }}
                >
                  <Sparkles color="#ffffff" size={22} />
                  <CustomText weight="medium" style={styles.importHeading}>
                    Welcome
                  </CustomText>
                  <CustomText weight="bold" style={styles.importHeading}>
                    {user ? user.name : 'Loading...'}!
                  </CustomText>
                </View>

                <CustomText weight="bold" style={[styles.importSub, { textAlign: 'center' }]}>
                  Capture your moments with hives
                </CustomText>

                <CustomText weight="medium" style={[styles.importSubLine, { textAlign: 'center' }]}>
                  Let the memories flow! ✨
                </CustomText>

                <TouchableOpacity
                  style={styles.importBtnWhite}
                  onPress={() => navigation.navigate('ImportPhotos')}
                >
                  <View>
                    <Plus color="#EA580B" size={20} />
                  </View>
                  <CustomText weight="bold" style={{ color: '#EA580B', fontSize: 14, }}>
                    Create new hive
                  </CustomText>
                </TouchableOpacity>


              </View>
            </View>
          </View>


          <View style={{ paddingHorizontal: width * 0.05, }}>
            {/* Dashboard Cards */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                marginTop: height * 0.01,
              }}
            >
              <View style={styles.dashCard}>
                <View
                  style={{
                    alignItems: 'center',   // centers horizontally
                    justifyContent: 'center', // centers vertically
                  }}
                >
                  <View
                    style={{
                      backgroundColor: '#F98935',
                      borderRadius: 8,
                      padding: 10,
                      marginBottom: 6,
                    }}
                  >
                    <FolderOpen color="#ffffff" />
                  </View>

                  <CustomText
                    weight="bold"
                    style={[styles.cardText, { color: '#000000', textAlign: 'center' }]} // center text
                  >
                    {events.length}
                  </CustomText>

                  <CustomText
                    weight="medium"
                    style={[styles.dashText, { textAlign: 'center' }]} // center text
                  >
                    Total Hives
                  </CustomText>
                </View>
              </View>





              <View style={styles.dashCard}>
                <View
                  style={{
                    alignItems: 'center',   // centers horizontally
                    justifyContent: 'center', // centers vertically
                  }}
                >
                  <View
                    style={{
                      backgroundColor: '#F4B11E',
                      borderRadius: 8,
                      padding: 10,
                      marginBottom: 6,
                    }}
                  >
                    <FileImage color="#ffffff" />
                  </View>

                  <CustomText
                    weight="bold"
                    style={[styles.cardText, { color: '#000000', textAlign: 'center' }]} // center text
                  >
                    {events.reduce((total, event) => total + (event.photos?.length || 0), 0)}
                  </CustomText>

                  <CustomText
                    weight="medium"
                    style={[styles.dashText, { textAlign: 'center' }]} // center text
                  >
                    Photos
                  </CustomText>
                </View>
              </View>


              <View style={styles.dashCard}>
                <View
                  style={{
                    alignItems: 'center',   // centers horizontally
                    justifyContent: 'center', // centers vertically
                  }}
                >
                  <View
                    style={{
                      backgroundColor: '#B674F9',
                      borderRadius: 8,
                      padding: 10,
                      marginBottom: 6,
                    }}
                  >
                    <Users color="#ffffff" />
                  </View>

                  <CustomText
                    weight="bold"
                    style={[styles.cardText, { color: '#000000', textAlign: 'center' }]} // center text
                  >
                    1
                  </CustomText>

                  <CustomText
                    weight="medium"
                    style={[styles.dashText, { textAlign: 'center' }]} // center text
                  >
                    Member
                  </CustomText>
                </View>
              </View>
            </View>

            {/* Events Section */}
            <View style={{ paddingBottom: 100, }}>
              <View style={styles.eventHeader}>
                <CustomText weight="medium" style={styles.eventSection}>
                  Your Hives
                </CustomText>
                <CustomText weight="medium" style={{ color: colors.textGray, marginTop: 4 }} >
                  Manage your photo collections
                </CustomText>

              </View>
              {/* here the event list show */}
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
                      <Image source={item.img} style={styles.cardImg} />
                      <View style={styles.eventRowInformation}>
                        <CustomText weight="bold" style={{ fontSize: 18, marginBottom: 4 }}>
                          {item.title}
                        </CustomText>
                        <CustomText
                          weight="medium"
                          style={{ fontSize: 14, color: '#6B7280', marginBottom: 12 }}
                        >
                          {item.description || 'No description'}
                        </CustomText>
                        <View style={{ flexDirection: 'row', gap: 20 }}>
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
                              <CustomText style={{ color: '#ef4444', }}>
                                {item.endTime} - {item.expiryDate}
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
                      backgroundColor: '#fecd6bff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                    }}
                  >
                    <ImagePlus color="#ffffff" size={28} />
                  </View>

                  <CustomText weight="medium" style={{ color: '#6B7280' }}>
                    No hives yet
                  </CustomText>

                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <CustomText
                      weight="bold"
                      style={{ color: '#feaa00' }}
                      onPress={() => navigation.navigate('CreateHive')}
                    >
                      Create your first hive
                    </CustomText>
                    <MoveRight color="#feaa00" />
                  </View>
                </View>
              )}
            </View>
            
          </View>



        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
  heroSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
    gap: height * 0.02,
  },
  heroImg: {
    width: width * 0.9,
    height: height * 0.28,
    resizeMode: 'contain',
  },
  HeroHeading: {
    fontSize: width * 0.06,
    fontWeight: '600',
    color: '#fff',
    position: 'absolute',
    top: height * 0.05,
  },
  HeroSubText: {
    fontSize: width * 0.035,
    fontWeight: '500',
    color: '#fff',
    position: 'absolute',
    top: height * 0.11,
    textAlign: 'center',
    paddingHorizontal: width * 0.15,
  },
  importBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: width * 0.025,
    position: 'absolute',
    top: height * 0.18,
    backgroundColor: '#FDD32E',
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.08,
    borderRadius: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  continueTxt: {
    fontSize: width * 0.04,
    color: '#000',
    fontWeight: '600',
  },
  ImportSection: {

    backgroundColor: '#ec9e00ff',
    marginTop: height * 0.025,
    padding: width * 0.06,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 12,
      },
    }),
  },
  cameraIcon: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: (width * 0.13) / 2,
    backgroundColor: '#FFE891',
    justifyContent: 'center',
    alignItems: 'center',
  },
  importHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffffff',
    marginBottom: 4,
    lineHeight: 20,
  },
  importSub: {
    marginTop: 10,
    fontSize: 24,
    color: '#ffffffff',
  },
  importSubLine: {
    marginTop: 10,
    fontSize: 14,
    color: '#ffffffff',
  },
  importBtnWhite: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: width * 0.025,
    backgroundColor: '#FFFFFF',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    borderRadius: 14,
    marginVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
      },
      android: {
        elevation: 2,
      },
    }),
  },
  laterBtn: {
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: height * 0.015,
    borderRadius: 6,
    marginVertical: 10,
  },
  dashCard: {
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'center',
    width: "30%",
    padding: width * 0.045,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    marginTop: height * 0.02,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  dashText: {
    color: '#6B7280'
  },
  icon: {
    width: width * 0.12,
    height: width * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: width * 0.06,
    fontWeight: '600',
    color: '#000',
  },
  newEvent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#feaa00',
  },
  eventSection: {
    fontSize: 20,
    fontWeight: '800',
  },
  eventHeader: {
    marginTop: height * 0.03,
  },
  eventRow: {
    marginTop: 16,
    width: '100%',
    height: 280,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#fff',
    // 💡 Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    // 💡 Shadow for Android
    elevation: 1,
  },
  cardImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  eventRowInformation: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#ffffffff',
    width: '100%',
    padding: 16,
  },
  
});
export default Home;