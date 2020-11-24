import React, { useState } from "react"
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { responsiveHeight, responsiveScreenHeight } from "react-native-responsive-dimensions";
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
                <Text style={globalObject.styles.regTitleText}>שינוי סיסמה</Text>
                <TextInput value={restCode} onChangeText={setRestCode} style={globalObject.styles.regInputBox} placeholder="קוד איפוס" />
                <TextInput value={email} onChangeText={setEmail} style={globalObject.styles.regInputBox} placeholder='כתובת דוא"ל' />
                <TextInput value={password} onChangeText={setPassword} style={globalObject.styles.regInputBox} placeholder="סיסמה" secureTextEntry={true} />
                <TextInput value={verifyPassword} onChangeText={setVerifyPassword} style={globalObject.styles.regInputBox} placeholder="אימות סיסמה" secureTextEntry={true} />
                <TouchableOpacity style={globalObject.styles.regButton} onPress={pressHandler}>
                    <Text style={globalObject.styles.regButtonText}>אישור</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.signinTextCont}>
                <Text style={globalObject.styles.signupOrLoginText}> לחזור אחרוה?</Text>
                <TouchableOpacity style={globalObject.styles.signupOrLoginTextCont} onPress={() => navigation.navigate('GetCodeForRes')}>
                    <Text style={globalObject.styles.signupOrLoginButton}>לחץ כאן</Text>
                </TouchableOpacity>
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveScreenHeight(5),

    },
    
    signinTextCont: {
        //flexGrow: 0.1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: responsiveHeight(1),
        flexDirection: 'row-reverse'
    },
});