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
  AppState,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useFocusEffect } from '@react-navigation/native';
import TopNav from '../components/TopNavbar';
import ThemeButton from '../components/ThemeButton';
import { colors } from '../Theme/theme';

const { width, height } = Dimensions.get('window');

const AutoCreateHive = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const apiLevel = Platform.Version;
        if (apiLevel >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // 🔥 Load only camera photos based on filename pattern
  const loadPhotos = async () => {
    try {
      setLoading(true);

      const photos = await CameraRoll.getPhotos({
        first: 999999,
        assetType: 'Photos',
        include: ['filename', 'imageSize', 'playableDuration'],
      });

      const cameraPhotos = photos.edges
        .filter(edge => {
          const name = edge.node.image.filename?.toLowerCase() || '';
          return (
            name.startsWith('img_') ||
            name.startsWith('pxl_') ||
            name.startsWith('camera') ||
            name.match(/^img-\d+/)
          );
        })
        .map(edge => ({
          uri: edge.node.image.uri,
          timestamp: edge.node.timestamp,
        }));

      cameraPhotos.sort((a, b) => b.timestamp - a.timestamp);

      setImages(cameraPhotos);
      setLoading(false);
    } catch (error) {
      console.log('Error loading photos:', error);
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    const init = async () => {
      const permission = await requestPermissions();
      setHasPermission(permission);
      if (permission) loadPhotos();
      else setLoading(false);
    };
    init();
  }, []);

  // 🔥 Live reload when app returns to foreground (detect new photos)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active' && hasPermission) {
        loadPhotos(); // Auto refresh on re-open
      }
    });
    return () => subscription.remove();
  }, [hasPermission]);

  // Reload when returning to this screen
  useFocusEffect(
    useCallback(() => {
      if (hasPermission) loadPhotos();
    }, [hasPermission])
  );

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
