import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Picker } from '@react-native-community/picker';
import requestList from '../../src/api/apiKeys'
import { globalObject } from '../../src/globalObject'
import { connect } from 'react-redux';

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
                    <Text style={styles.title}>בקשה חדשה</Text>
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

                <TouchableOpacity style={{ ...styles.button, ...style.btn2 }} onPress={() => PressHandler(type, text)}>
                    <Text style={styles.buttonText} >שלח בקשה</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                    <Image style={styles.exitIcon} source={require('../../assets/exit_icon.png')} />
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
    title:
    {

        textAlign:"center",
        width: Dimensions.get('window').width*0.80,
       // margin: 20,
        //marginRight: 30,
        fontSize: 48,
        color: "seashell",
        borderBottomWidth:2,
        borderColor: "seashell",
    },
    subTitle:
    {
        margin:20,
        fontSize: 18,
        color: "seashell",


    },
    picker: {
        width: Dimensions.get('window').width / 2,
        flexDirection: 'row-reverse',
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,




    },
    itemList:
    {
        width: Dimensions.get('window').width / 3,
        color: "#ffffff",
        textAlign: 'right',
        justifyContent: 'center',
        alignItems: 'center',


    },
    pickerItem: {
        color: "#00ffff",

    },
    test:
    {

    },
    inputBoxContainer: {
//marginRight: 30,
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
export default connect(mapStateToProps, {})(Main)