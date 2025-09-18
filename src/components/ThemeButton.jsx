import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ThemeButton = ({ text, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.continueBtn, style]}>
      <Text style={[styles.continueTxt, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  continueBtn: {
    backgroundColor: '#FDD32E',
    paddingVertical: 21,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginVertical: 21,
  },
  continueTxt: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
});

export default ThemeButton;
