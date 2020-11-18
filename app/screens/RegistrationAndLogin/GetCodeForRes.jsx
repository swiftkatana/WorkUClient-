import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import LoginForm from "../../components/LoginForm";
import Logo from '../../components/Logo';
import { globalObject } from "../../src/globalObject";


export default function Main({ navigation }) {
    const [email, setEmail] = useState('')
    globalObject.Navigation = navigation;
    return (
        <View style={styles.container}>
            <Logo />
            <TextInput value={email} onChangeText={setEmail} style={styles.inputBox} placeholder='כתובת דוא"ל' autoCapitalize="none" secureTextEntry={true} keyboardType={"visible-password"} />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>שלח</Text>
            </TouchableOpacity>
            <View style={styles.signupTextCont}>
                <Text style={styles.signupText}> יש לך קוד?</Text>
                <TouchableOpacity onPress={() => globalObject.Navigation.navigate('RegisterUserScreen')}>
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
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row-reverse'
    },
    signupText: {
        fontSize: 16,
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

