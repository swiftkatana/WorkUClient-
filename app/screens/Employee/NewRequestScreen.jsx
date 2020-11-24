import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Picker } from '@react-native-community/picker';
import requestList from '../../src/api/apiKeys'
import { globalObject } from '../../src/globalObject'
import { connect } from 'react-redux';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

function Main({ navigation, style }) {
    const [type, SetType] = useState("חל''ת");
    const [text, SetText] = useState("");
    const PressHandler = async (type, body) => {
        // send {type,body,fullName,email}
        // recive {reuqest}
        const res = await globalObject.SendRequest(requestList.userSendPersonalRequestUrl, { type, body, fullName: globalObject.User.fullName, email: globalObject.User.email });
        if (res) {
            globalObject.User.personalRequests[res._id] = res;

            navigation.navigate('EmployeeMainScreen');

            globalObject.sendNotification(globalObject.User.managerEmail, res, type, 'בקשה חדשה התקבלה', "newPersonalRequest")

        }
    }
    return (
        <View style={{ ...styles.view, ...style.view }}>

            <View style={styles.container}>

                <View>
                    <Text style={globalObject.styles.menuTitle}>בקשה חדשה</Text>
                </View>
                <View style={styles.picker}>
                    <Text style={styles.subTitle}>סוג הבקשה</Text>
                    <Picker
                        prompt='סוג בקשה'
                        mode='dialog'
                        selectedValue={type}
                        style={styles.itemList}

                        onValueChange={(itemValue) => SetType(itemValue)}>

                        <Picker.Item label="חל''ת" value="חל''ת" />
                        <Picker.Item label="ימי חופש" value="ימי חופש" />
                        <Picker.Item label="העלאה בשכר" value="העלאה בשכר" />
                        <Picker.Item label="ימי מחלה" value="ימי מחלה" />
                        <Picker.Item label="פיטורים" value="פיטורים" />
                    </Picker>

                </View>

                <View style={styles.inputBoxContainer}>
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={text => SetText(text)}
                        value={text}
                        placeholder='גוף הבקשה (אופציונלי)'
                    />
                </View>

                <TouchableOpacity style={{ ...globalObject.styles.regButton, ...style.btn2 }} onPress={() => PressHandler(type, text)}>
                    <Text style={globalObject.styles.regButtonText} >שלח בקשה</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalObject.styles.exitButton} onPress={() => navigation.pop()}>
                    <Image style={globalObject.styles.exitIcon} source={require('../../assets/exit_icon.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        //marginTop:50,
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',


    },
    container:
    {
        alignItems:'center',
        justifyContent: 'center',
        textAlign: 'center',

    },
    subTitle:
    {
        margin:responsiveScreenHeight(2),
        fontSize: responsiveScreenFontSize(2.2),//18
        color: "seashell",


    },
    picker: {
        width: responsiveScreenWidth(50),
        flexDirection: 'row-reverse',
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: responsiveScreenHeight(1),
    },
    itemList:
    {
        width: responsiveScreenWidth(35),
        color: "#ffffff",
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: responsiveScreenWidth(80),
        height: responsiveScreenHeight(15),
        backgroundColor: "#ededed",
        borderRadius: 25,
        paddingHorizontal: responsiveScreenWidth(6),
        marginVertical: responsiveScreenHeight(1),
        textAlign: "right",
    },
})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)