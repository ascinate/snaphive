import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  Dimensions,
  PanResponder,
  Image,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const PhotoCropModal = ({ visible, photoUri, onClose, onCropComplete }) => {
  const [cropArea, setCropArea] = useState({
    x: SCREEN_WIDTH * 0.1,
    y: SCREEN_HEIGHT * 0.2,
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.4,
  });

  const [imageLayout, setImageLayout] = useState(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        setCropArea((prev) => {
          const newX = Math.max(0, Math.min(prev.x + gestureState.dx, SCREEN_WIDTH - prev.width));
          const newY = Math.max(0, Math.min(prev.y + gestureState.dy, SCREEN_HEIGHT - prev.height));
          return { ...prev, x: newX, y: newY };
        });
      },
    })
  ).current;

  const resizeResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        setCropArea((prev) => {
          const newWidth = Math.max(100, Math.min(prev.width + gestureState.dx, SCREEN_WIDTH - prev.x));
          const newHeight = Math.max(100, Math.min(prev.height + gestureState.dy, SCREEN_HEIGHT - prev.y));
          return { ...prev, width: newWidth, height: newHeight };
        });
      },
    })
  ).current;

  const handleCrop = () => {
    if (!imageLayout) {
      onCropComplete(cropArea);
      return;
    }

    // Calculate crop coordinates relative to the actual image
    const cropData = {
      x: cropArea.x - imageLayout.x,
      y: cropArea.y - imageLayout.y,
      width: cropArea.width,
      height: cropArea.height,
      imageWidth: imageLayout.width,
      imageHeight: imageLayout.height,
    };

    onCropComplete(cropData);
  };

  const handleReset = () => {
    setCropArea({
      x: SCREEN_WIDTH * 0.1,
      y: SCREEN_HEIGHT * 0.2,
      width: SCREEN_WIDTH * 0.8,
      height: SCREEN_HEIGHT * 0.4,
    });
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Crop Photo</Text>
          <TouchableOpacity onPress={handleReset} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: photoUri }}
            style={styles.image}
            resizeMode="contain"
            onLayout={(event) => {
              const { x, y, width, height } = event.nativeEvent.layout;
              setImageLayout({ x, y, width, height });
            }}
          />

          {/* Overlay */}
          <View style={styles.overlay}>
            {/* Top overlay */}
            <View style={[styles.overlaySection, { height: cropArea.y }]} />

            {/* Middle section with left, crop area, and right */}
            <View style={styles.middleSection}>
              <View style={[styles.overlaySection, { width: cropArea.x }]} />
              
              {/* Crop Area */}
              <View
                style={[
                  styles.cropArea,
                  {
                    width: cropArea.width,
                    height: cropArea.height,
                  },
                ]}
                {...panResponder.panHandlers}
              >
                <View style={styles.cropBorder}>
                  {/* Corner handles */}
                  <View style={[styles.corner, styles.topLeft]} />
                  <View style={[styles.corner, styles.topRight]} />
                  <View style={[styles.corner, styles.bottomLeft]} />
                  <View style={[styles.corner, styles.bottomRight]} />

                  {/* Resize handle */}
                  <View
                    style={styles.resizeHandle}
                    {...resizeResponder.panHandlers}
                  >
                    <View style={styles.resizeIcon} />
                  </View>
                </View>
              </View>

              <View
                style={[
                  styles.overlaySection,
                  { width: SCREEN_WIDTH - cropArea.x - cropArea.width },
                ]}
              />
            </View>

            {/* Bottom overlay */}
            <View
              style={[
                styles.overlaySection,
                {
                  height: SCREEN_HEIGHT - cropArea.y - cropArea.height,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={handleCrop} style={styles.cropButton}>
            <Text style={styles.cropButtonText}>Apply Crop</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1a1a1a',
  },
  headerButton: {
    padding: 5,
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageWrapper: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
  },
  overlaySection: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  middleSection: {
    flexDirection: 'row',
  },
  cropArea: {
    position: 'relative',
  },
  cropBorder: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'dashed',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#fff',
    borderWidth: 3,
  },
  topLeft: {
    top: -2,
    left: -2,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: -2,
    right: -2,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  resizeHandle: {
    position: 'absolute',
    bottom: -15,
    right: -15,
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resizeIcon: {
    width: 10,
    height: 10,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#000',
    transform: [{ rotate: '-45deg' }],
  },
  footer: {
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
  cropButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cropButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PhotoCropModal;