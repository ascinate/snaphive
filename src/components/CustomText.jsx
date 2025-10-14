// src/components/CustomText.js
import React from 'react';
import { Text } from 'react-native';

// Map font weights to your Montserrat font files
const fontMap = {
  thin: 'Montserrat-Thin',
  thinItalic: 'Montserrat-ThinItalic',
  extraLight: 'Montserrat-ExtraLight',
  extraLightItalic: 'Montserrat-ExtraLightItalic',
  light: 'Montserrat-Light',
  lightItalic: 'Montserrat-LightItalic',
  regular: 'Montserrat-Regular',
  italic: 'Montserrat-Italic',
  medium: 'Montserrat-Medium',
  mediumItalic: 'Montserrat-MediumItalic',
  semiBold: 'Montserrat-SemiBold',
  semiBoldItalic: 'Montserrat-SemiBoldItalic',
  bold: 'Montserrat-Bold',
  boldItalic: 'Montserrat-BoldItalic',
  extraBold: 'Montserrat-ExtraBold',
  extraBoldItalic: 'Montserrat-ExtraBoldItalic',
  black: 'Montserrat-Black',
  blackItalic: 'Montserrat-BlackItalic',
  variable: 'Montserrat-VariableFont_wght',
};

const CustomText = ({ style, weight = 'regular', children, ...props }) => {
  return (
    <Text style={[{ fontFamily: fontMap[weight] }, style]} {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
