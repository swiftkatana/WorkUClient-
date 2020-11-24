import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { responsiveHeight } from 'react-native-responsive-dimensions';
import apiKeys from '../../src/api/apiKeys';
import { globalObject } from "../../src/globalObject";


export default function Main({ navigation }) {
    const [email, setEmail] = useState('')


    const handlerSenReq = async () => {

        let res = await globalObject.SendRequest(apiKeys.userRequestRestCode, { email });
        if (res) {
            navigation.navigate('RestPasswordWithCode');
        }

    }
    return (
        <View style={styles.container}>
            <View >
                <Text style={globalObject.styles.regTitleText}  >שכחתי סיסמה</Text>
            </View>
            <TextInput value={email} onChangeText={setEmail} style={globalObject.styles.regInputBox} placeholder=' כתובת דוא"ל איתה נרשמת' autoCapitalize="none" secureTextEntry={true} keyboardType={"visible-password"} />
            <TouchableOpacity onPress={handlerSenReq} style={globalObject.styles.regButton}>
                <Text style={globalObject.styles.regButtonText}>שלח</Text>
            </TouchableOpacity>
            <View style={styles.signupTextCont}>
                <Text style={globalObject.styles.signupOrLoginText}> יש לך קוד?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('RestPasswordWithCode')}>
                    <Text style={globalObject.styles.signupOrLoginButton}>לחץ כאן</Text>
                </TouchableOpacity>
                <Text style={globalObject.styles.signupOrLoginText} />
            </View>
            <View style={styles.signupTextCont}>
                <Text style={globalObject.styles.signupOrLoginText}> זוכר את הסיסמה?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={globalObject.styles.signupOrLoginButton}>לחץ כאן</Text>
                </TouchableOpacity>
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
        paddingVertical: responsiveHeight(2),
        flexDirection: 'row-reverse'
    },
});

