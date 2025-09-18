import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Igoogle from "../../assets/Igoogle.svg";
import Imail from "../../assets/Imail.svg";
import Save from "../../assets/svg/save.svg";
const logo = require("../../assets/logo.png");

const Signup = ({ navigation }) => {

    const [email, setEmail] = useState("");

    return (
        <SafeAreaProvider style={styles.container}>
            <View style={styles.flex}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.title}>Snaphive</Text>
            </View>
            <Text style={styles.description}>
                Automatically share photos taken by members of your group
            </Text>
           

            <TextInput style={styles.emailInput} value={email} onChangeText={setEmail} placeholder='Enter your email address' />

            <TouchableWithoutFeedback>
                <View style={styles.continueBtn}>
                    <Text style={styles.continueTxt} onPress={() => navigation.navigate("Login")}>Continue  </Text>
                     <Save width={20} height={20} />
                   
                </View>
             
            </TouchableWithoutFeedback>
            <View style={styles.orLine}>
                <View style={styles.line} />
                <Text style={styles.text}>Or</Text>
                <View style={styles.line} />
            </View>


            <TouchableWithoutFeedback>
                <View style={styles.outlineBtn}>
                    <View style={styles.iconContainer}>
                        <Imail width={20} height={20} />
                    </View>
                    <Text style={styles.continueTxt}>Continue with Email</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <View style={styles.outlineBtn}>
                    <View style={styles.iconContainer}>
                        <Igoogle width={20} height={20} />
                    </View>
                    <Text style={styles.continueTxt}>Continue with Google</Text>
                </View>
            </TouchableWithoutFeedback>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text>Already a user ?  </Text>
                <TouchableWithoutFeedback >
                    <View>
                        <Text style={[styles.continueTxt, { fontWeight: 600 }]}>Log in</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>


            <Text style={[styles.description, { marginTop: 60 }]}>
                By continuing I accept Selfso's Terms of Use
                and
                <TouchableWithoutFeedback >
                    <Text style={[styles.continueTxt, { fontWeight: 600, textDecorationLine: "underline", color: "#000000ff" }]}> Privacy Policy</Text>
                </TouchableWithoutFeedback>
            </Text>

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
        backgroundColor: '#F0F5F5',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 21,
        fontSize: 16,
        textAlign: 'center',

    },

    continueBtn: {
        flexDirection: 'row',           
        alignItems: 'center',           
        justifyContent: 'center',      
        backgroundColor: '#FDD32E',
        paddingVertical: 21,
        paddingHorizontal: 30,
        borderRadius: 12,
        alignItems: 'center',
        width: "100%",
        marginBlock: 21,
    },

    continueTxt: {
        fontSize: 16,
        color: '#000',
        fontWeight: 600,
    },

    outlineBtn: {
  flexDirection: 'row',           // place icon + text in a row
  alignItems: 'center',           // center vertically
  justifyContent: 'center',       // center text horizontally
  borderWidth: 1,
  paddingVertical: 19,
  borderRadius: 12,
  width: "100%",
  marginVertical: 21,             // use marginVertical instead of marginBlock
  position: 'relative',
},

iconContainer: {
  position: 'absolute',           // keep icon fixed on left
  left: 22,
},

    continueTxt: {
        fontSize: 16,
        color: '#000',
        fontWeight: 600,
    },


    orLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    line: {
        height: 1,
        backgroundColor: '#ccc',
        width: 160,
    },
    text: {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#000',
    },

});

export default Signup;