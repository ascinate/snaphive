import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopNav from '../components/TopNavbar';
import ThemeButton from '../components/ThemeButton';

const { width, height } = Dimensions.get('window');

const PhotoShare = ({ navigation }) => {
  const images = [
    require('../../assets/picnic1.jpg'),
    require('../../assets/picnic2.jpg'),
    require('../../assets/picnic3.jpg'),
    require('../../assets/picnic4.jpg'),
    require('../../assets/picnic1.jpg'),
    require('../../assets/picnic2.jpg'),
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopNav />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header row */}
        <View style={styles.headerRow}>
          <Text style={styles.selectedText}>2 Selected</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Image Grid */}
        <View style={styles.gridContainer}>
          {images.map((img, index) => (
            <View style={styles.imgContainer} key={index}>
              <Image source={img} style={styles.img} />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View
        style={{
          paddingHorizontal: width * 0.03,
          borderTopWidth: 1,
          borderTopColor: '#EEEEEE',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <ThemeButton
          style={styles.continueBtn}
          text="Continue →"
          onPress={() => navigation.navigate('CreateEvent')}
        />
        <View>
          <Text style={{ fontWeight: 800, fontSize: 28 }}>...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    backgroundColor: '#000',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.01,
    borderRadius: 6,
  },
  cancelText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: '500',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: height * 0.015,
  },
  imgContainer: {
    width: (width - width * 0.16) / 3,
    height: (width - width * 0.16) / 3,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  continueBtn: {
    width: '85%',
    marginTop: height * 0.02,
    alignSelf: 'center',
  },
});

export default PhotoShare;
