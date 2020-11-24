import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, Dimensions } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import apiKeys from '../../src/api/apiKeys'
import { globalObject } from '../../src/globalObject'

function ChangePasswordScreen({ navigation, style }) {
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
        <View style={{ ...styles.view, ...style.view }}>
            <Text style={globalObject.styles.menuTitle}>שינוי סיסמה</Text>
            <View style={globalObject.styles.menuBtnContainer}>
                <TextInput value={oldPassword} onChangeText={setOldPassword} style={globalObject.styles.regInputBox} placeholder='סיסמה ישנה' />
                <TextInput value={newPassword} onChangeText={setnewPassword} style={globalObject.styles.regInputBox} placeholder="סיסמה חדשה" secureTextEntry={true} />
                <TextInput value={verifyPassword} onChangeText={setVerifyPassword} style={globalObject.styles.regInputBox} placeholder="אימות סיסמה" secureTextEntry={true} />
                <TouchableOpacity style={{ ...globalObject.styles.regButton, ...style.btn2 }} onPress={pressHandler} >
                    <Text style={globalObject.styles.regButtonText} >שנה סיסמה</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={globalObject.styles.exitButton} onPress={() => navigation.pop()}>
                    <Image style={globalObject.styles.exitIcon} source={require('../../assets/exit_icon.png')} />
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    view: {
        //marginTop:50,
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
    },
})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(ChangePasswordScreen)