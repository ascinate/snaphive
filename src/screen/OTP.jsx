import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const OTP = ({navigation}) => {

    const [email, setEmail] = useState("");


    return (
        <SafeAreaProvider style={styles.container}>
            <View style={styles.flex}>
                <Text style={styles.title}>Enter Code</Text>
            </View>
            <Text style={styles.description}>
                Enter the six-digit code that we sent to
                your number.
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 20, marginBottom: 20 }}>
                <TextInput style={styles.emailInput} value={email} onChangeText={setEmail} />
                <TextInput style={styles.emailInput} value={email} onChangeText={setEmail} />
                <TextInput style={styles.emailInput} value={email} onChangeText={setEmail} />
                <TextInput style={styles.emailInput} value={email} onChangeText={setEmail} />
            </View>



            <TouchableWithoutFeedback     onPress={() => navigation.navigate("MyTabs")}>
                <View style={styles.continueBtn}>
                    <Text style={styles.continueTxt}>Confirm →</Text>
                </View>
            </TouchableWithoutFeedback>


            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text>Don’t receive a code ?   </Text>
                <TouchableWithoutFeedback >
                    <View>
                        <Text style={[styles.continueTxt, { fontWeight: 600 }]}>Resend</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>


            <Text style={[styles.description, { marginTop: 200 }]}>
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
        marginTop: 1,
        width: 63,
        borderColor: '#ccc',
        backgroundColor: '#F0F5F5',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 21,
        fontSize: 16,
        textAlign: 'left',
    },

    continueBtn: {
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


});

export default OTP;