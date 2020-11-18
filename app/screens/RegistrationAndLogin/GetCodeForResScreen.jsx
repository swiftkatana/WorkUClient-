import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import apiKeys from '../../src/api/apiKeys';
import { globalObject } from "../../src/globalObject";


export default function Main({ navigation }) {
    const [email, setEmail] = useState('')
    globalObject.Navigation = navigation;

    const handlerSenReq = async () => {

        let res = await globalObject.SendRequest(apiKeys.userRequestRestCode, { email });
        if (res) {
            globalObject.Navigation.navigate('RestPasswordWithCode');
        }

    }
    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.logoText}  >שכחתי סיסמה</Text>
            </View>
            <TextInput value={email} onChangeText={setEmail} style={styles.inputBox} placeholder=' כתובת דוא"ל איתה נרשמת' autoCapitalize="none" secureTextEntry={true} keyboardType={"visible-password"} />
            <TouchableOpacity onPress={handlerSenReq} style={styles.button}>
                <Text style={styles.buttonText}>שלח</Text>
            </TouchableOpacity>
            <View style={styles.signupTextCont}>
                <Text style={styles.signupText}> יש לך קוד?</Text>
                <TouchableOpacity onPress={() => globalObject.Navigation.navigate('RestPasswordWithCode')}>
                    <Text style={styles.signupButton}>לחץ כאן</Text>
                </TouchableOpacity>
                <Text style={styles.signupButton} />
            </View>
            <View style={styles.signupTextCont}>
                <Text style={styles.signupText}> לחזור אחרוה ?</Text>
                <TouchableOpacity onPress={() => globalObject.Navigation.navigate('LoginScreen')}>
                    <Text style={styles.signupButton}>לחץ כאן</Text>
                </TouchableOpacity>
                <Text style={styles.signupButton} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signupTextCont: {
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row-reverse'
    },
    signupText: {
        fontSize: 16,
    }, logoText: {
        marginVertical: 20,
        fontSize: 22,
        color: '#000000',
        fontWeight: "bold"
    },
    signupButton: {
        paddingRight: 5,
        color: "#7f71e3",
        fontSize: 18,
        fontWeight: "bold",
    }, inputBox: {
        width: 300,
        height: 60,
        backgroundColor: '#ededed',
        borderRadius: 25,
        paddingHorizontal: 16,
        marginVertical: 10,
        textAlign: "right"
    },
    button: {
        width: 300,
        backgroundColor: "#7f71e3",
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'seashell',
        textAlign: 'center',
    },
    tinyLogo: {
        marginTop: 40,
        width: 30,
        height: 30,

    },
});

