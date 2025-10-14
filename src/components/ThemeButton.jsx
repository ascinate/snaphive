import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from './CustomText';
const ThemeButton = ({ text, onPress, style, textStyle }) => {
  return (
    <LinearGradient
      colors={['#FDD32E', '#FFA600']}         
      start={{ x: 0, y: 0 }}                   
      end={{ x: 1.2, y: 0 }}                     
      style={[styles.continueBtn, style]}     
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.touchable}             
      >
        <CustomText weight='Bold' style={[styles.continueTxt, textStyle]}>{text}</CustomText>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  continueBtn: {
    borderRadius: 12,
    width: '100%',
    marginVertical: 21,
    overflow: 'hidden',       
  },
  touchable: {
    paddingVertical: 21,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default ThemeButton;
