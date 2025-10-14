import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Logo from '../components/Logo';
import ThemeButton from '../components/ThemeButton';
import CustomText from '../components/CustomText';

const logo = require("../../assets/logo.png");

const Login = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <SafeAreaProvider style={styles.container}>
    <Logo/>
            <CustomText weight='medium' style={styles.description}>
                Login to your account in Snaphive to start Photo and video share
            </CustomText>

            <TextInput style={styles.emailInput} value={email} onChangeText={setEmail} placeholder='Enter your email address' />
            <TextInput style={styles.emailInput} value={password} onChangeText={setPassword} placeholder='Enter your password' secureTextEntry={true}/>


          <ThemeButton
                    text="Continue →"
                    onPress={() => navigation.navigate("OTP")}
                    style={{ width: "100%", marginTop: 20 }}
                />
            

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CustomText weight='medium' style={{color: '#000000ff'}}>Don’t have an account ?  </CustomText>
                <TouchableWithoutFeedback >
                    <TouchableWithoutFeedback onPress={()=> navigation.navigate('Signup')}>
                        <CustomText weight="bold" style={[styles.continueTxt, { fontWeight: 600 }]}>Sign up</CustomText>
                    </TouchableWithoutFeedback>
                </TouchableWithoutFeedback>
            </View>


            <CustomText weight='medium' style={[styles.description, { marginTop: 80 }]}>
                By continuing I accept Selfso's Terms of Use
                and
                <TouchableWithoutFeedback >
                    <CustomText weight='bold' style={[styles.continueTxt, { fontWeight: 600, textDecorationLine: "underline", color: "#000000ff" }]}> Privacy Policy</CustomText>
                </TouchableWithoutFeedback>
            </CustomText>

        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#ffffff", padding: 20 },
    flex: { flexDirection: "row", justifyContent: "center", alignItems: 'center', marginBottom: 24 },
    logo: { width: 50, height: 50, resizeMode: "contain", marginRight: 10 },
    title: { fontSize: 35, color: '#000', fontWeight: '700', textAlign: 'center', },
    description: { fontSize: 16, color: '#646464', textAlign: 'center', width: '100%' },

    emailInput: {
        marginTop: 36,
        width: "100%",
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 21,
        fontSize: 16,
        textAlign: 'left',
        paddingLeft: 27,

    },



});

export default Login;