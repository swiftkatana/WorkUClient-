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
            <Text style={styles.title}>שינוי סיסמה</Text>
            <View style={styles.container}>
                <TextInput value={oldPassword} onChangeText={setOldPassword} style={styles.inputBox} placeholder='סיסמה ישנה' />
                <TextInput value={newPassword} onChangeText={setnewPassword} style={styles.inputBox} placeholder="סיסמה חדשה" secureTextEntry={true} />
                <TextInput value={verifyPassword} onChangeText={setVerifyPassword} style={styles.inputBox} placeholder="אימות סיסמה" secureTextEntry={true} />
                <TouchableOpacity style={{ ...styles.button, ...style.btn2 }} onPress={pressHandler} >
                    <Text style={styles.buttonText} >שנה סיסמה</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                    <Image style={styles.exitIcon} source={require('../../assets/exit_icon.png')} />
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
    container: {
        //flexGrow: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,

    },
    logoText: {
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
        textAlign:"center",
        width: Dimensions.get('window').width*0.80,
        margin: 20,
        //marginRight: 30,
        fontSize: 48,
        color: "seashell",
        borderBottomWidth:2,
        borderColor: "seashell",
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
    exitButton:
    {
        paddingTop: 40,


    },
    exitIcon:{
        height:50,
        width:50,
    },
})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(ChangePasswordScreen)