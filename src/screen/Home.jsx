import React, { useState, useCallback, useEffect, useContext, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Animated
} from 'react-native';
import { RefreshControl } from 'react-native';
import { Sparkles, Users, FileImage, Clock5, ImagePlus, MoveRight } from 'lucide-react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { EventContext } from '../context/EventContext';


// components
import TopNav from '../components/TopNavbar';
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

          <View
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
          </View>


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
          <View style={{ paddingBottom: 100, }}>
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

                        <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                          <Clock5 width={14} height={14} color="#ea580c" />
                          <CustomText style={{ color: '#ea580c' }}>3</CustomText>
                        </View>
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

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <CustomText
                    weight="bold"
                    style={{ color: '#C084FC' }}
                    onPress={() => navigation.navigate('CreateHive')}
                  >
                    Create your first hive
                  </CustomText>
                  <MoveRight color="#C084FC" />
                </View>
              </View>
            )}


            {/* Recent Activity */}
            {/* <View style={{ paddingBottom: 150 }}>
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
          </View> */}
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
    backgroundColor: '#a131d3', 
    marginTop: height * 0.025,
    borderRadius: 24,
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
    width: "30%",
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

});

export default Home;