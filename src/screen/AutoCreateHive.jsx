import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useFocusEffect } from '@react-navigation/native';
import TopNav from '../components/TopNavbar';
import ThemeButton from '../components/ThemeButton';
import { colors } from '../Theme/theme';
import eventBus from '../utils/eventBus';

const { width, height } = Dimensions.get('window');

const AutoCreateHive = ({ navigation }) => {

// 1️⃣ ALL useStates at top
const [images, setImages] = useState([]);
const [loading, setLoading] = useState(true);
const [hasPermission, setHasPermission] = useState(false);
const [selectedImages, setSelectedImages] = useState([]);

console.log("🔵 AutoCreateHive component rendered");

// 3️⃣ Permission Request
const requestPermissions = async () => {
  console.log("🟡 requestPermissions called");
  if (Platform.OS === 'android') {
    try {
      const apiLevel = Platform.Version;
      if (apiLevel >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        );
        console.log("🟢 Permission result (API 33+):", granted);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        console.log("🟢 Permission result (API <33):", granted);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (err) {
      console.warn("❌ Permission error:", err);
      return false;
    }
  }
  console.log("🟢 iOS - permission granted by default");
  return true;
};

// 4️⃣ Load only Camera Photos
const loadPhotos = useCallback(async () => {
  try {
    setLoading(true);

    const photos = await CameraRoll.getPhotos({
      first: 999999,
      assetType: 'Photos',
      include: ['filename', 'imageSize', 'playableDurity'],
    });

    // 🚨 SHOW ALERT WITH PHOTO INFO
    const first5 = photos.edges.slice(0, 5);
    const photoInfo = first5.map((edge, i) => 
      `${i}: ${edge.node.image.filename}`
    ).join('\n');
    
    Alert.alert(
      'Photo Debug Info',
      `Total: ${photos.edges.length}\n\nFirst 5:\n${photoInfo}`,
      [
        {
          text: 'Copy to Clipboard',
          onPress: () => {
            // Show detailed info for first 2 photos
            const detailed = photos.edges.slice(0, 2).map((edge, i) => 
              `${i}:\nFile: ${edge.node.image.filename}\nURI: ${edge.node.image.uri}`
            ).join('\n\n');
            
            Alert.alert('Photo Details', detailed);
          }
        },
        { text: 'OK' }
      ]
    );

    // TEMPORARILY SHOW ALL PHOTOS (no filter)
    const allPhotos = photos.edges
      .map(edge => ({
        uri: edge.node.image.uri,
        timestamp: edge.node.timestamp,
        filename: edge.node.image.filename,
      }))
      .sort((a, b) => b.timestamp - a.timestamp);

    setImages(allPhotos);
    setLoading(false);

  } catch (error) {
    Alert.alert('Error', error.message);
    setLoading(false);
  }
}, []);

// 2️⃣ Event Listener Hook
useEffect(() => {
  console.log("🎧 Setting up event listener");

  const listener = (data) => {
    console.log("🔔 EVENT RECEIVED: photo_saved", data);
    console.log("🔔 Calling loadPhotos from event...");
    loadPhotos();
  };

  const subscription = eventBus.addListener("photo_saved", listener);
  console.log("🎧 Event listener registered");

  return () => {
    console.log("🎧 Removing event listener");
    subscription.remove();
  };
}, [loadPhotos]);


// 5️⃣ Initial load
useEffect(() => {
  console.log("🚀 Initial load useEffect triggered");
  
  const init = async () => {
    console.log("🚀 Running init...");
    const permission = await requestPermissions();
    console.log("🚀 Permission result:", permission);
    setHasPermission(permission);
    
    if (permission) {
      console.log("🚀 Permission granted, loading photos...");
      loadPhotos();
    } else {
      console.log("🚀 Permission denied, stopping...");
      setLoading(false);
    }
  };

  init();
}, []);

// 6️⃣ Reload every time screen is focused
useFocusEffect(
  useCallback(() => {
    console.log("👁️ Screen focused, hasPermission:", hasPermission);
    if (hasPermission) {
      console.log("👁️ Reloading photos on focus...");
      loadPhotos();
    }
  }, [hasPermission, loadPhotos])
);

  // 7️⃣ EARLY RETURNS (AFTER ALL HOOKS)
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <TopNav />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Loading photos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <TopNav />
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>Permission denied</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={async () => {
              const permission = await requestPermissions();
              setHasPermission(permission);
              if (permission) loadPhotos();
            }}
          >
            <Text style={styles.retryButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // 8️⃣ UI RETURN (NO HOOKS BELOW)
  return (
    <SafeAreaView style={styles.safeArea}>
      <TopNav />

      <ScrollView
        contentContainerStyle={[styles.container, { paddingBottom: height * 0.12 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.selectedText}>
              Camera Images ({images.length})
            </Text>
            <Text>Selected ({selectedImages.length})</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.cancelButton}>
              <Text style={styles.cancelText}>Back</Text>
            </View>
          </TouchableOpacity>
        </View>

        {images.length > 0 ? (
          <View style={styles.gridContainer}>
            {images.map((img, index) => (
              <TouchableOpacity
                key={img.uri}
                onPress={() =>
                  setSelectedImages(prev =>
                    prev.some(i => i.uri === img.uri)
                      ? prev.filter(i => i.uri !== img.uri)
                      : [...prev, img]
                  )
                }
                style={[
                  styles.imgContainer,
                  {
                    marginRight: (index + 1) % 3 === 0 ? 0 : width * 0.015,
                    borderWidth: 4,
                    borderColor: selectedImages.some(i => i.uri === img.uri)
                      ? '#007AFF'
                      : 'transparent',
                  },
                ]}
              >
                <Image source={{ uri: img.uri }} style={styles.img} />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No camera photos found</Text>
          </View>
        )}
      </ScrollView>

      <ThemeButton style={styles.continueBtn} text={`Next →`} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: {
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.02,
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: height * 0.02,
    alignItems: 'center',
  },
  selectedText: {
    fontWeight: '600',
    fontSize: width * 0.045,
    color: '#000',
  },
  cancelButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.01,
    borderRadius: 6,
  },
  cancelText: {
    color: '#FFF',
    fontSize: width * 0.04,
    fontWeight: '500',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  imgContainer: {
    width: (width - width * 0.09) / 3,
    height: (width - width * 0.09) / 3,
    marginBottom: width * 0.015,
    marginRight: width * 0.015,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  img: { width: '100%', height: '100%', resizeMode: 'cover' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: width * 0.04, color: '#666' },
  errorText: { fontSize: width * 0.045, color: '#ff0000', marginBottom: 20 },
  retryButton: {
    backgroundColor: '#000',
    paddingHorizontal: width * 0.08,
    paddingVertical: height * 0.015,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  emptyText: { fontSize: width * 0.045, color: '#666' },
  continueBtn: { width: '85%', alignSelf: 'center' },
});

export default AutoCreateHive;
