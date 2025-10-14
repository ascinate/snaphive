import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableWithoutFeedback, useWindowDimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
//components
import CustomText from '../components/CustomText';
import ThemeButton from '../components/ThemeButton';
import GlobalStyle from '../utils/GlobalStyle';
//svg
import Igoogle from "../../assets/Igoogle.svg";
import Logo from '../components/Logo'
import Imail from "../../assets/Imail.svg";
//images
const logo = require("../../assets/logo-snaphive.png");

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const { width, height } = useWindowDimensions(); 
  return (
    <SafeAreaProvider style={[styles.container, { padding: width * 0.05 }]}>
      {/* Logo + Title */}
  <Logo/>

      {/* Description */}
      <Text style={[styles.description, { fontSize: width * 0.04 }]}>
        Automatically share photos taken by members of your group
      </Text>

      {/* Email Input */}
      <TextInput 
        style={[
          styles.emailInput, 
          { 
            fontSize: width * 0.04, 
            paddingVertical: height * 0.02 
          }
        ]}
        value={email} 
        onChangeText={setEmail} 
        placeholder='Enter your email address' 
      />

      {/* Continue Button */}
          <ThemeButton
                    text="Continue →"
                    onPress={() => navigation.navigate("Login")}
                    style={{ width: "100%", marginTop: 20 }}
                />

      {/* OR line */}
      <View style={styles.orLine}>
        <View style={[styles.line, { width: width * 0.35 }]} />
        <Text style={[styles.text, { fontSize: width * 0.04 }]}>Or</Text>
        <View style={[styles.line, { width: width * 0.35 }]} />
      </View>



      <TouchableWithoutFeedback>
        <View style={[
          styles.outlineBtn, 
          { paddingVertical: height * 0.02 }
        ]}>
          <View style={styles.iconContainer}>
            <Igoogle width={width * 0.06} height={width * 0.06} />
          </View>
          <Text style={[styles.continueTxt, { fontSize: width * 0.04,fontFamily: 'Montserrat-Medium',fontWeight:'500',color:'#000' }]}>
            Continue with Google
          </Text>
        </View>
      </TouchableWithoutFeedback>

      {/* Already a user */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <CustomText  style={{ fontSize: width * 0.04 }}>Already a user ?  </CustomText>
        <TouchableWithoutFeedback>
          <View>
            <CustomText weight="bold" style={[styles.continueTxt, { fontWeight: '500', fontSize: width * 0.04 }]}>
              Log in
            </CustomText>
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/* Terms & Privacy */}
      <Text style={[styles.description, { marginTop: height * 0.07, fontSize: width * 0.035 }]}>
        By continuing I accept Selfso's Terms of Use and
        <TouchableWithoutFeedback>
          <Text style={[styles.continueTxt, { 
            fontWeight: '600', 
            textDecorationLine: "underline", 
            color: "#000", 
            fontSize: width * 0.035 
          }]}>
            {" "}Privacy Policy
          </Text>
        </TouchableWithoutFeedback>
      </Text>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: "#fff" 
  },
  flex: { 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: 'center', 
    marginBottom: 24 
  },
  logo: { resizeMode: "contain", marginRight: 10 },
  title: { color: '#000', fontWeight: '700', textAlign: 'center' },
  description: { color: '#646464', textAlign: 'center', width: '100%' },

  emailInput: {
    marginTop: 36,
    width: "100%",
    borderColor: '#ccc',
    backgroundColor: '#F0F5F5',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    textAlign: 'center',
  },



  outlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
    width: "100%",
    marginVertical: 21,
    position: 'relative',
  },

  iconContainer: {
    position: 'absolute',
    left: 22,
  },

  orLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  line: {
    height: 1,
    backgroundColor: '#ccc',
  },

  text: {
    marginHorizontal: 10,
    color: '#000',
  },
});

export default Signup;
