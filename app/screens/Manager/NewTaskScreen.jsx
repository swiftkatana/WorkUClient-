import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Picker } from '@react-native-community/picker';
import requestList from '../../src/api/apiKeys'
import { globalObject } from '../../src/globalObject'





export default function Main() {

    const [priority, SetPriority] = useState("גבוהה");
    const [header, SetHeader] = useState("");
    const [text, SetText] = useState("");
    const [sendTo, SetSendTo] = useState({});
    const [employees, SetEmployyes] = useState({});
    const [shouldShow, setShouldShow] = useState(false);
    const PressHandler = async () => {

        if (!employees) {
            Alert.alert("הפעולה נחשלה", "לא תויג עובד", [{ text: "הבנתי" }]);
            return;
        }

        const res = await globalObject.SendRequest(requestList.createTaskUrl, { employees: [sendTo.email], task: { title: header, priority: priority, description: text } });
        if (res) {
            globalObject.User.tasks.processing[res._id] = res;
            globalObject.Navigation.navigate('ManagerMainScreen');

        }
    }


    const render = ({ item }) => {
        return (
            <View>
                <TouchableOpacity style={styles.list} onPress={() => SetSendTo(item)}>

                    <Text style={styles.listText}>שם: {item.firstName + " " + item.lastName}</Text>
                    <Image style={styles.tinyLogo} source={require('../../assets/plus_icon.png')} />
                </TouchableOpacity>
            </View>
        )
    }

    useEffect(() => {
        var arr = [];
        var employees = globalObject.company.employees;
        for (let i in employees) {
            let employee = employees[i];
            arr.push(employee);
        }
        if (arr.length == 0) {
            setShouldShow(true);
        } else {
            setShouldShow(false);
        }
        SetEmployyes(arr);
        arr = [];
    }, [])


    return (
        <KeyboardAvoidingView style={styles.view} behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
            enabled={Platform.OS === "ios" ? true : false}>
            <TouchableOpacity style={styles.exitButton} onPress={() => globalObject.Navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.container}>

                <View>
                    <Text style={styles.header}>משימה חדשה</Text>
                </View>
                <Text style={styles.subTitle}>תייג עובד: {sendTo.firstName ? sendTo.firstName + " " + sendTo.lastName : null}  </Text>
                {shouldShow ? (
                    <View style={styles.infoConteiner}>
                        <Image style={styles.tinyLogo} source={require('../../assets/information_icon.png')} />

                        <View style={styles.infoTextConteiner}>
                            <Text style={styles.infoText}>אין לך עובדים כרגע. להוספת עובדים לחץ על כפתור קוד גישה להוספת עובדים במסך הראשי</Text>
                        </View>
                    </View>
                )
                    : null}
                <FlatList style={styles.test}
                    data={employees}
                    renderItem={render}
                    keyExtractor={item => item.email}
                />
                <View style={styles.inputBoxContainer}>
                    <TextInput
                        style={styles.shortInputBox}
                        onChangeText={header => SetHeader(header)}
                        value={header}
                        placeholder='תקציר המשימה'
                    />
                </View>
                <View style={styles.inputBoxContainer}>
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={text => SetText(text)}
                        value={text}
                        placeholder='פירוט המשימה (אופציונלי)'
                    />
                </View>
                <View style={styles.picker}>
                    <Text style={styles.subTitle}>דחיפות:</Text>
                    <Picker
                        prompt='test'
                        mode='dropdown'
                        selectedValue={priority}
                        style={styles.itemList}

                        onValueChange={(itemValue) => SetPriority(itemValue)}>

                        <Picker.Item label="גבוהה" value="גבוהה" />
                        <Picker.Item label="בינונית" value="בינונית" />
                        <Picker.Item label="נמוכה" value="נמוכה" />
                    </Picker>
                </View>


                <TouchableOpacity style={styles.button} onPress={() => { PressHandler() }}>
                    <Text style={styles.buttonText} >שלח בקשה</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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
        flex: 1,
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
        marginBottom: 10,


    },
    list:
    {
        flex: 1,
        height: 35,
        width: Dimensions.get('window').width - 100,
        backgroundColor: "seashell",
        flexDirection: "row-reverse",
        alignItems: 'center',
        marginHorizontal: 35,
        justifyContent: 'flex-start',
        borderRadius: 5,
        marginBottom: 2,
        borderWidth: 1,
        borderColor: "lightgray",
    },
    listText:
    {
        // flex:1,
        textAlign: "right",
        fontSize: 14,
    },

    tinyLogo:
    {
        width: 20,
        height: 20,

    },
    picker: {
        flexGrow: 3,
        textAlign: 'right',
        justifyContent: 'center',
        marginTop: 5,


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
    shortInputBox: {
        width: 300,
        height: 60,
        backgroundColor: '#ededed',
        borderRadius: 20,
        paddingHorizontal: 16,
        marginVertical: 10,
        textAlign: "right"
    },
    button: {
        width: 300,
        backgroundColor: "#6f61ca",// #6357b5
        borderRadius: 25,
        marginBottom: 120,
        paddingVertical: 16,
        marginHorizontal: 30,

    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'seashell',
        textAlign: 'center',
    },
    infoConteiner: {
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',

    },
    infoTextConteiner: {
        padding: 10,
        //marginHorizontal: 82,
        marginRight: 35,
        marginLeft: 55,
        backgroundColor: "#6f61ca",
        borderRadius: 20,
        //borderEndWidth: 1,
        //borderStartWidth: 1,
        borderWidth: 1,
        //right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "seashell",

    },
    infoText: {
        fontSize: 11,
        color: "seashell",
        fontWeight: 'bold',
    },
    tinyLogo: {
        width: 20,
        height: 20,
        //alignItems: 'center',
        //justifyContent: 'center',
        //marginBottom: 50,
        //marginRight: 10,
        //marginTop: 14,
        left: 30,
        bottom: 2,
        zIndex: 5,

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
