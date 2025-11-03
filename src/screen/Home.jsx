import React, { useState, useCallback, useEffect, useContext, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Animated
} from 'react-native';
import { RefreshControl } from 'react-native';
import { Sparkles, Users, FileImage, Clock5 } from 'lucide-react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { EventContext } from '../context/EventContext';

// SVGs
import Brush from '../../assets/svg/brush.svg';
import Photo from '../../assets/svg/photo.svg';
import CameraIcon from '../../assets/svg/camera.svg';
import Import from '../../assets/svg/import.svg';
import Camera from '../../assets/svg/camera.svg';
import RightArrow from '../../assets/svg/rightArrow.svg';

// components
import TopNav from '../components/TopNavbar';
import ThemeButton from '../components/ThemeButton';
import CustomText from '../components/CustomText';

// assets
const hero = require('../../assets/hero.png');
const picnic1 = require('../../assets/picnic1.jpg');

const { width, height } = Dimensions.get('window');

const Home = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [showImportBanner, setShowImportBanner] = useState(true);
  const { events, setEvents } = useContext(EventContext);
  const slideAnim = useRef(new Animated.Value(0)).current; // for slide
  const opacityAnim = useRef(new Animated.Value(1)).current; // for fade out
  useEffect(() => {
    if (route?.params?.newEvent) {
      const { name, photos } = route.params.newEvent;

      const newEventObj = {
        img: { uri: photos[0]?.uri },
        title: name,
        count: `${photos.length} Photos`,
        photos,
      };

      setEvents(prevEvents => [newEventObj, ...prevEvents]);
      navigation.setParams({ newEvent: null });
    }
  }, [route?.params?.newEvent]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setEvents(prev => [...prev]);
      setRefreshing(false);
    }, 1000);
  }, []);


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

          <Animated.View
            style={{
              marginTop: height * 0.025,
              transform: [{ translateX: slideAnim }],
              opacity: opacityAnim,
            }}
          >
            <LinearGradient
              colors={[
                '#a131d3',
                '#b128c4',
                '#bd22b5',
                '#c61fa7',
                '#cc2199',
                '#d71f8c',
                '#df227f',
                '#e52a73',
                '#ef3462',
                '#f44250',
                '#f5533d',
                '#f36529',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }} // right bottom direction
              style={styles.ImportSection}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: width * 0.03,
                }}
              >

                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Sparkles color='#ffffff' size={22} />
                    <CustomText weight="medium" style={styles.importHeading}>
                      Welcome back!
                    </CustomText>
                  </View>
                  <CustomText weight="bold" style={styles.importSub}>
                    pritam
                  </CustomText>

                  <CustomText weight="medium" style={styles.importSubLine}>
                    Share your moments with your hives
                  </CustomText>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: width * 0.02,
                }}
              >



              </View>
            </LinearGradient>
          </Animated.View>





          {/* <View style={styles.heroSection}>
            <Image source={hero} style={styles.heroImg} />
            <CustomText weight="bold" style={styles.HeroHeading}>
              Welcome to Snaphive
            </CustomText>
            <CustomText weight="medium" style={styles.HeroSubText}>
              Import your photos, enhance automatically, and organize by events.
            </CustomText>

            <TouchableOpacity
              style={styles.importBtn}
              onPress={() => navigation.navigate('PhotoShare')}
            >
              <Import width={width * 0.045} height={width * 0.045} />
              <CustomText weight="bold" style={styles.continueTxt}>
                Import photo
              </CustomText>
            </TouchableOpacity>
          </View> */}


          {/* Gradient Section */}

          {/* {showImportBanner && (
            <Animated.View
              style={{
                marginTop: height * 0.025,
                transform: [{ translateX: slideAnim }],
                opacity: opacityAnim,
              }}
            >
              <LinearGradient
                colors={['#FDD32E', '#FFA500']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.ImportSection}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: width * 0.03,
                  }}
                >
                  <View style={styles.cameraIcon}>
                    <Camera width={width * 0.07} height={width * 0.07} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <CustomText weight="bold" style={styles.importHeading}>
                      We found 10 new photos in your library.
                    </CustomText>
                    <CustomText weight="medium" style={styles.importSub}>
                      Import into Birthday Party?
                    </CustomText>
                  </View> 
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: width * 0.02,
                  }}
                >
                  <TouchableOpacity
                    style={[styles.importBtnWhite, { flex: 0.7 }]}
                    onPress={() => navigation.navigate('PhotoShare')}
                  >
                    <Import width={width * 0.04} height={width * 0.04} />
                    <CustomText weight="bold" style={styles.continueTxt}>
                      Import
                    </CustomText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.laterBtn, { flex: 0.3 }]}
                    onPress={handleLater}
                  >
                    <CustomText
                      weight="bold"
                      style={[styles.continueTxt, { color: '#fff' }]}
                    >
                      Later
                    </CustomText>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </Animated.View>
          )} */}


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
              <View>
                <CustomText weight="bold" style={[styles.cardText, { color: '#9f31d8' }]}>
                  11
                </CustomText>
                <CustomText weight="medium" style={styles.dashText}>
                  Hives
                </CustomText>
              </View>
            </View>

            <View style={styles.dashCard}>
              <View>
                <CustomText weight="bold" style={[styles.cardText, { color: '#d92779' }]}>
                  1
                </CustomText>
                <CustomText weight="medium" style={styles.dashText}>
                  Photos
                </CustomText>
              </View>
            </View>
            <View style={styles.dashCard}>
              <View>
                <CustomText weight="bold" style={[styles.cardText, { color: '#f56824' }]}>
                  1
                </CustomText>

                <CustomText weight="medium" style={styles.dashText}>
                  Members
                </CustomText>
              </View>
            </View>



          </View>

          {/* Events Section */}
          <View>
            <View style={styles.eventHeader}>
              <CustomText weight="medium" style={styles.eventSection}>
                Your Hives
              </CustomText>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CreateEvent');
                }}
              >
                <CustomText weight="bold" style={styles.newEvent}>
                  See all
                </CustomText>
              </TouchableOpacity>
            </View>

            {events.map((item, index) => (
              <TouchableOpacity key={index} onPress={() =>
                navigation.navigate('PhotoFolder', {
                  eventPhotos: item.photos,
                })
              }>

                <View style={styles.eventRow} >
                  <Image source={item.img} style={styles.cardImg} />
                  <View style={styles.eventRowInformation}>
                    <CustomText weight="bold" style={{ fontSize: 18, marginBottom: 4 }}>{item.title}</CustomText>
                    <CustomText weight="medium" style={{ fontSize: 14, color: '#6B7280', marginBottom: 12 }}>I travel rajasthan</CustomText>

                    <View style={{ flexDirection: 'row', gap: 20 }}>
                      <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                        <Users width={14} height={14} color='#6B7280' />
                        <CustomText style={{ color: '#6B7280' }}>1</CustomText>
                      </View>

                      <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', }}>
                        <FileImage width={14} height={14} color='#6B7280' />
                        <CustomText style={{ color: '#6B7280' }}>{item.count}</CustomText>
                      </View>

                      <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', }}>
                        <Clock5 width={14} height={14} color='#ea580c' />
                        <CustomText style={{ color: '#ea580c' }}>3</CustomText>
                      </View>
                    </View>
                  </View>

                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recent Activity */}
          <View style={{ paddingBottom: 150 }}>
            <View style={styles.eventHeader}>
              <CustomText weight="bold" style={styles.eventSection}>
                Recent Activity
              </CustomText>
            </View>
            {[picnic1].map((img, i) => (
              <TouchableOpacity key={i} onPress={() =>
                navigation.navigate('PhotoFolder', {
                  eventPhotos: item.photos,
                })
              }>

                <View style={styles.eventRow} >
                  <Image source={img} style={styles.cardImg} />
                  <View style={styles.eventRowInformation}>
                    <CustomText weight="bold" style={{ fontSize: 18, marginBottom: 4 }}>rajasthan</CustomText>
                    <CustomText weight="medium" style={{ fontSize: 14, color: '#6B7280', marginBottom: 12 }}>I travel rajasthan</CustomText>
                    <View style={{ flexDirection: 'row', gap: 20 }}>
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
                </View>
              </TouchableOpacity>
            ))}
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
    borderRadius: 24,
    padding: width * 0.06,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 20,
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
    marginTop: 4,
    fontSize: 24,
    color: '#ffffffff',
  },
  importSubLine: {
    marginTop: 4,
    fontSize: 14,
    color: '#ffffffff',
  },
  importBtnWhite: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: width * 0.02,
    backgroundColor: '#FFFFFF',
    paddingVertical: height * 0.015,
    borderRadius: 6,
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
    justifyContent: 'space-between',
    width: 120,
    padding: width * 0.045,
    backgroundColor: '#FFFFFF',
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
        elevation: 1,
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
    color: '#9333EA',
  },
  eventSection: {
    fontSize: 20,
    fontWeight: '800',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.03,
  },




  // event style
  // eventRow: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginTop: height * 0.02,
  //   padding: width * 0.03,
  //   borderRadius: 8,
  //   backgroundColor: '#fff',
  //   borderWidth: 1,
  //   borderColor: '#EFEFEF',
  //   ...Platform.select({
  //     ios: {
  //       shadowColor: '#000',
  //       shadowOpacity: 0.15,
  //       shadowRadius: 3,
  //       shadowOffset: { width: 0, height: 2 },
  //     },
  //     android: {
  //       elevation: 3,
  //     },
  //   }),
  // },
  // mtop: {
  //   marginTop: height * 0.01,
  // },

  //   cardImg: {
  //   width: width * 0.25,
  //   height: width * 0.22,
  //   borderRadius: 8,
  // },
  //   eventTitle: {
  //   fontSize: width * 0.04,
  //   fontWeight: '600',
  //   color: '#000',
  // },
  //   profileIcon: {
  //   marginTop: height * 0.01,
  //   width: width * 0.08,
  //   height: width * 0.08,
  //   borderRadius: (width * 0.08) / 2,
  //   backgroundColor: '#ED3C50',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },

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
  }

  // mtop: {
  //   marginTop: height * 0.01,
  // },

  // eventTitle: {
  //   fontSize: width * 0.04,
  //   fontWeight: '600',
  //   color: '#000',
  // },
  // profileIcon: {
  //   marginTop: height * 0.01,
  //   width: width * 0.08,
  //   height: width * 0.08,
  //   borderRadius: (width * 0.08) / 2,
  //   backgroundColor: '#ED3C50',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});

export default Home;