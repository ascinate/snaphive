import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeButton from '../components/ThemeButton';
import CustomText from '../components/CustomText';


const OTP = ({navigation}) => {

    const [email, setEmail] = useState("");


    return (
        <SafeAreaProvider style={styles.container}>
            <View style={styles.flex}>
                <CustomText weight="medium" style={styles.title}>Enter Code</CustomText>
            </View>
            <CustomText weight="medium" style={styles.description}>
                Enter the six-digit code that we sent to
                your number.
            </CustomText>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 20, marginBottom: 20 }}>
                <TextInput style={styles.emailInput} value={email} onChangeText={setEmail} />
                <TextInput style={styles.emailInput} value={email} onChangeText={setEmail} />
                <TextInput style={styles.emailInput} value={email} onChangeText={setEmail} />
                <TextInput style={styles.emailInput} value={email} onChangeText={setEmail} />
            </View>



          <ThemeButton
                    text="Confirm →"
                    onPress={() => navigation.navigate("MyTabs")}
                    style={{ width: "100%", marginTop: 20 }}
                />


            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <CustomText weight="medium">Don’t receive a code ?   </CustomText>
                <TouchableWithoutFeedback >
                    <View>
                        <CustomText weight="Bold" style={[styles.continueTxt, { fontWeight: 600 }]}>Resend</CustomText>
                    </View>
                </TouchableWithoutFeedback>
            </View>


            <CustomText weight="medium" style={[styles.description, { marginTop: 200 }]}>
                By continuing I accept Selfso's Terms of Use
                and
                <TouchableWithoutFeedback >
                    <CustomText weight="bold" style={[styles.continueTxt, { fontWeight: 600, textDecorationLine: "underline", color: "#000000ff" }]}> Privacy Policy</CustomText>
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
});

export default OTP;