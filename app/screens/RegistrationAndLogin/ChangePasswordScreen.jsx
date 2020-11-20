import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import apiKeys from '../../src/api/apiKeys'
import { globalObject } from '../../src/globalObject'

export default function ChangePasswordScreen({ navigation }) {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setnewPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')

    const pressHandler = async () => {
        if (!verifyPassword || !oldPassword || !newPassword) {
            title = "השינוי נכשל";
            msg = "אחד או יותר מהשדות ריקים, נסו שנית"
            alertButton = [{ text: "הבנתי" }];
            Alert.alert(title, msg, alertButton, { cancelable: false });
        } else if (newPassword != verifyPassword) {
            title = "השינוי נכשל";
            msg = "הוזנו שני סיסמאות שונות, נסו שנית"
            alertButton = [{ text: "הבנתי" }];
            Alert.alert(title, msg, alertButton, { cancelable: false });
        } else {
            const user = await globalObject.SendRequest(apiKeys.userChangePasswrordUrl, { newPassword, oldPassword, email: globalObject.User.email });
            if (user) {
                navigation.pop()
            }
        }
    }

    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.title}>שינוי סיסמה</Text>
            <View style={styles.container}>
                <TextInput value={oldPassword} onChangeText={setOldPassword} style={styles.inputBox} placeholder='סיסמה ישנה' />
                <TextInput value={newPassword} onChangeText={setnewPassword} style={styles.inputBox} placeholder="סיסמה חדשה" secureTextEntry={true} />
                <TextInput value={verifyPassword} onChangeText={setVerifyPassword} style={styles.inputBox} placeholder="אימות סיסמה" secureTextEntry={true} />
                <TouchableOpacity style={styles.button} onPress={pressHandler} >
                    <Text style={styles.buttonText} >שנה סיסמה</Text>
                </TouchableOpacity>
            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        //flexGrow: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,

    },
    view: {
        //marginTop:50,
        flex: 1,
        backgroundColor: globalObject.styles.backGroundColors,


    }, logoText: {
        marginVertical: 20,
        fontSize: 22,
        color: '#000000',
        fontWeight: "bold"
    },
    buttonsContainer:
    {
        //paddingTop: 10,
        alignItems: 'flex-end',
    },
    button: {
        width: 300,
        backgroundColor: "#6f61ca",// #6357b5
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 30,
        textAlign: "center",

    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'seashell',
        textAlign: 'center',
    },
    title:
    {
        margin: 20,
        marginRight: 30,
        fontSize: 28,
        color: "seashell",
        textDecorationLine: "underline"

    }, inputBox: {
        width: 300,
        height: 60,
        backgroundColor: '#ededed',
        borderRadius: 25,
        paddingHorizontal: 16,
        marginVertical: 10,
        textAlign: "right"
    },
    exitButton:
    {
        paddingTop: 60,
        //position:'absolute',
        marginLeft: 30,

    },
    exitText:
    {
        fontSize: 30,
        color: "seashell",

    }
})
