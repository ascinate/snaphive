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
  const cropPositionRef = useRef({ x: SCREEN_WIDTH * 0.1, y: SCREEN_HEIGHT * 0.2 });
  const cropSizeRef = useRef({ width: SCREEN_WIDTH * 0.8, height: SCREEN_HEIGHT * 0.4 });

  // PanResponder for moving the crop area
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        cropPositionRef.current = { x: cropArea.x, y: cropArea.y };
      },
      onPanResponderMove: (_, gestureState) => {
        const maxX = SCREEN_WIDTH - cropSizeRef.current.width;
        const maxY = SCREEN_HEIGHT - cropSizeRef.current.height;
        
        const newX = Math.max(0, Math.min(cropPositionRef.current.x + gestureState.dx, maxX));
        const newY = Math.max(0, Math.min(cropPositionRef.current.y + gestureState.dy, maxY));
        
        setCropArea({
          x: newX,
          y: newY,
          width: cropSizeRef.current.width,
          height: cropSizeRef.current.height,
        });
      },
      onPanResponderRelease: () => {
        cropPositionRef.current = { x: cropArea.x, y: cropArea.y };
      },
    })
  ).current;

  // PanResponder for resizing the crop area
  const resizeResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        cropSizeRef.current = { width: cropArea.width, height: cropArea.height };
      },
      onPanResponderMove: (_, gestureState) => {
        const maxWidth = SCREEN_WIDTH - cropArea.x;
        const maxHeight = SCREEN_HEIGHT - cropArea.y;
        
        const newWidth = Math.max(100, Math.min(cropSizeRef.current.width + gestureState.dx, maxWidth));
        const newHeight = Math.max(100, Math.min(cropSizeRef.current.height + gestureState.dy, maxHeight));
        
        setCropArea({
          x: cropArea.x,
          y: cropArea.y,
          width: newWidth,
          height: newHeight,
        });
      },
      onPanResponderRelease: () => {
        cropSizeRef.current = { width: cropArea.width, height: cropArea.height };
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
    const resetArea = {
      x: SCREEN_WIDTH * 0.1,
      y: SCREEN_HEIGHT * 0.2,
      width: SCREEN_WIDTH * 0.8,
      height: SCREEN_HEIGHT * 0.4,
    };
    setCropArea(resetArea);
    cropPositionRef.current = { x: resetArea.x, y: resetArea.y };
    cropSizeRef.current = { width: resetArea.width, height: resetArea.height };
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
          <View style={styles.overlay} pointerEvents="box-none">
            {/* Top overlay */}
            <View style={[styles.overlaySection, { height: cropArea.y }]} pointerEvents="none" />

            {/* Middle section */}
            <View style={styles.middleSection} pointerEvents="box-none">
              <View style={[styles.overlaySection, { width: cropArea.x }]} pointerEvents="none" />
              
              {/* Crop Area - this is the interactive part */}
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
                <View style={styles.cropBorder} pointerEvents="none">
                  {/* Grid lines */}
                  <View style={[styles.gridLine, styles.gridVertical1]} />
                  <View style={[styles.gridLine, styles.gridVertical2]} />
                  <View style={[styles.gridLine, styles.gridHorizontal1]} />
                  <View style={[styles.gridLine, styles.gridHorizontal2]} />
                  
                  {/* Corner handles */}
                  <View style={[styles.corner, styles.topLeft]} />
                  <View style={[styles.corner, styles.topRight]} />
                  <View style={[styles.corner, styles.bottomLeft]} />
                  <View style={[styles.corner, styles.bottomRight]} />
                </View>

                {/* Resize handle */}
                <View
                  style={styles.resizeHandle}
                  {...resizeResponder.panHandlers}
                >
                  <View style={styles.resizeIcon} />
                </View>
              </View>

              <View
                style={[
                  styles.overlaySection,
                  { width: SCREEN_WIDTH - cropArea.x - cropArea.width },
                ]}
                pointerEvents="none"
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
              pointerEvents="none"
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  gridVertical1: {
    left: '33.33%',
    width: 1,
    height: '100%',
  },
  gridVertical2: {
    left: '66.66%',
    width: 1,
    height: '100%',
  },
  gridHorizontal1: {
    top: '33.33%',
    width: '100%',
    height: 1,
  },
  gridHorizontal2: {
    top: '66.66%',
    width: '100%',
    height: 1,
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
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000',
  },
  resizeIcon: {
    width: 12,
    height: 12,
    borderRightWidth: 3,
    borderBottomWidth: 3,
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