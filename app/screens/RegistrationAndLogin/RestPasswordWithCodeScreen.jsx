import React, { useState } from "react"
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { responsiveScreenHeight } from "react-native-responsive-dimensions";
import requestList from "../../src/api/apiKeys";
import { globalObject } from "../../src/globalObject";



export default function Main({ navigation }) {

    const [restCode, setRestCode] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')

    const pressHandler = async () => {
        if (!restCode || !email || !password || !verifyPassword) {
            title = "השינוי נכשל";
            msg = "אחד או יותר מהשדות ריקים, נסו שנית"
            alertButton = [{ text: "הבנתי" }];
            Alert.alert(title, msg, alertButton, { cancelable: false });
        } else if (password != verifyPassword) {
            title = "השינוי נכשל";
            msg = "הוזנו שני סיסמאות שונות, נסו שנית"
            alertButton = [{ text: "הבנתי" }];
            Alert.alert(title, msg, alertButton, { cancelable: false });
        } else {
            var naviTo = "";
            const user = await globalObject.SendRequest(requestList.userChangePasswordWithRestCode, { restCode, email, newPassword: password });
            if (user) {
                globalObject.User = user;
                if (globalObject.User.permission.manager) {
                    const company = await globalObject.SendRequest(requestList.getCompanyUrl, { email: user.email, joinCode: user.joinCode });
                    if (company) {
                        globalObject.User.tasks = company.tasks;
                        globalObject.User.personalRequests = company.personalRequests;
                        globalObject.company = company;
                        naviTo = 'ManagerMainScreen';
                    }
                }
                else if (globalObject.User.company)
                    naviTo = 'EmployeeMainScreen';
                else
                    naviTo = 'SelectionScreen';
            }
            navigation.navigate(naviTo);
            setShouldShow(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.logoText}>שינוי סיסמה</Text>
                <TextInput value={restCode} onChangeText={setRestCode} style={styles.inputBox} placeholder="קוד איפוס" />
                <TextInput value={email} onChangeText={setEmail} style={styles.inputBox} placeholder='כתובת דוא"ל' />
                <TextInput value={password} onChangeText={setPassword} style={styles.inputBox} placeholder="סיסמה" secureTextEntry={true} />
                <TextInput value={verifyPassword} onChangeText={setVerifyPassword} style={styles.inputBox} placeholder="אימות סיסמה" secureTextEntry={true} />
                <TouchableOpacity style={styles.button} onPress={pressHandler}>
                    <Text style={styles.buttonText}>אישור</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.signinTextCont}>
                <Text style={styles.signinText}> לחזור אחרוה?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('GetCodeForRes')}>
                    <Text style={styles.signinButton}>כניסה</Text>
                </TouchableOpacity>
                <Text style={styles.signinButton} />
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        //flexGrow: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveScreenHeight(5),

    },
    inputBox: {
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
    logoText: {
        marginVertical: 20,
        fontSize: 22,
        color: '#000000',
        fontWeight: "bold"
    },
    signinTextCont: {
        //flexGrow: 0.1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row-reverse'
    },
    signinText: {
        fontSize: 16,
    },
    signinButton: {
        paddingRight: 5,
        color: "#7f71e3",
        fontSize: 18,
        fontWeight: "bold",
    },

});