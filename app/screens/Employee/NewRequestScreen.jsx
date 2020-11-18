import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Picker } from '@react-native-community/picker';
import requestList from '../../src/api/apiKeys'
import { globalObject } from '../../src/globalObject'


export default function Main({ navigation }) {
    const [type, SetType] = useState("חל''ת");
    const [text, SetText] = useState("");
    const PressHandler = async (type, body) => {
        // send {type,body,fullName,email}
        // recive {reuqest}
        const res = await globalObject.SendRequest(requestList.userSendPersonalRequestUrl, { type, body, fullName: globalObject.User.fullName, email: globalObject.User.email });
        if (res) {
            globalObject.User.personalRequests[res._id] = res;
            navigation.navigate('EmployeeMainScreen');

        }
    }
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.container}>

                <View>
                    <Text style={styles.header}>בקשה חדשה</Text>
                </View>
                <View style={styles.picker}>
                    <Text style={styles.subTitle}>סוג הבקשה</Text>
                    <Picker
                        prompt='test'
                        mode='dropdown'
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

                <TouchableOpacity style={styles.button} onPress={() => PressHandler(type, text)}>
                    <Text style={styles.buttonText} >שלח בקשה</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view:
    {
        flex: 1,
        backgroundColor: "#7f71e3",

    },
    container:
    {
        alignItems: 'flex-end',
    },
    header:
    {
        margin: 20,
        marginRight: 30,
        fontSize: 28,
        color: "seashell",
        textDecorationLine: "underline"

    },
    subTitle:
    {
        marginRight: 30,
        fontSize: 16,
        color: "seashell",


    },
    picker: {
        textAlign: 'right',
        justifyContent: 'center',


    },
    itemList:
    {
        width: 200,
        color: "#ffffff",
        textAlign: 'right',
        justifyContent: 'center',

    },
    pickerItem: {
        color: "#00ffff",

    },
    test:
    {

    },
    inputBoxContainer: {
        marginRight: 30,
    },
    inputBox: {
        width: 300,
        height: 100,
        backgroundColor: '#ededed',
        borderRadius: 25,
        paddingHorizontal: 16,
        marginVertical: 10,
        textAlign: "right"
    },
    button: {
        width: 300,
        backgroundColor: "#6f61ca",// #6357b5
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 30,


    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'seashell',
        textAlign: 'center',
    },
    exitButton:
    {
        marginLeft: 30,
        paddingTop: 60,

    },
    exitText:
    {
        fontSize: 30,
        color: "seashell",

    }

})
