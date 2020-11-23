import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import requestList from '../../src/api/apiKeys';
import { globalObject } from '../../src/globalObject';
import InfoList from '../../components/InfoList';
import { connect } from 'react-redux';
import Recording from '../../class/VoiceRecording';
import { responsiveHeight } from 'react-native-responsive-dimensions';


function Main({ navigation, style }) {
    const [priority, SetPriority] = useState("גבוהה");
    const [header, SetHeader] = useState("");
    const [sendTo, SetSendTo] = useState({});
    const recording = new Recording();
    const PressHandler = async () => {

        if (!sendTo.email) {
            Alert.alert("הפעולה נחשלה", "לא תויג עובד", [{ text: "הבנתי" }]);
            return;
        }
        if (header.length < 1) {
            Alert.alert("הפעולה נכשלה", "חסר תקציר", [{ text: "הבנתי" }]);
            return;
        }

        const res = await globalObject.SendRequest(requestList.createTaskUrl, { employees: [sendTo.email], task: { title: header, priority: priority } });
        if (res) {
            globalObject.User.tasks.processing[res._id] = res;
            let audio = await recording.UploadToServer(globalObject.User.email, sendTo.email, res._id, globalObject.User.fullName, globalObject.User.role);
            if (audio) {
                audio.read = true;
                globalObject.User.tasks.processing[res._id].audios.push(audio);
                navigation.navigate('ManagerMainScreen');
                globalObject.sendNotification(sendTo.email, res, 'אפשר לראות אותה בלוח המשימות', 'משימה חדשה נכנסה', 'newTask')
            }
            else {
                Alert.alert("הפעולה נכשלה", "יש להקליט הודעה קולית לפני השליחה", [{ text: "הבנתי" }]);
            }
        }
    }


    const render = ({ item }) => {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.list} onPress={() => SetSendTo(item)}>

                    <Text style={styles.listText}>שם: {item.firstName + " " + item.lastName}</Text>
                    <Image style={styles.tinyLogo} source={require('../../assets/plus_icon_black.png')} />
                </TouchableOpacity>
            </View>
        )
    }

    const GetList = () => {
        let arr = [];
        let employees = globalObject.company.employees;
        for (let i in employees) {
            let employee = employees[i];
            employee.id = employee.email;
            arr.push(employee);
        }
        return arr;
    }
    const GetLen = () => {
        return Object.keys(globalObject.company.employees).length;
    }

    return (
        <KeyboardAvoidingView style={{ ...styles.view, ...style.view }} behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
            enabled={Platform.OS === "ios" ? true : false}>
            <View style={styles.container}>

                <View>
                    <Text style={styles.title}>משימה חדשה</Text>
                </View>
                <Text style={styles.subTitle}>תייג עובד: {sendTo.firstName ? sendTo.firstName + " " + sendTo.lastName : null}  </Text>
                <View style={{ ...styles.mainListCon, ...style.btn2, borderColor: style.btn3.backgroundColor }}>

                    <View style={styles.listContainer}>
                        <InfoList render={render} GetLen={GetLen} GetList={GetList} src={require('../../assets/empty_icon_white.png')} emptyInfo={'אין לך עובדים כרגע.'}  />
                    </View>
                </View>
                {GetLen() > 0 ? <View> 

                <View style={styles.inputBoxContainer}>
                    <TextInput
                        style={styles.shortInputBox}
                        onChangeText={header => SetHeader(header)}
                        value={header}
                        placeholder='תקציר המשימה'
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
                <View style={styles.recordSendBtnList}>
                    <TouchableOpacity
                        style={{ ...styles.vButton, ...style.btn2 }}
                        onPressIn={recording.StartRecording} 
                        onPressOut={recording.StopRecording}
                    >
                        <Image style={styles.tinyLogo} source={require('../../assets/microphone_icon.png')} />
                        <Text style={styles.buttonText}>הקלט משימה</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ ...styles.vButton, ...style.btn2 }}
                        onPress={recording.playAudio}
                    >
                        <Image style={styles.tinyLogo} source={require('../../assets/play_button_icon.png')} />
                        <Text style={styles.buttonText}>נגן הקלטה</Text>
                    </TouchableOpacity>


                </View>
                <TouchableOpacity style={{ ...styles.button, ...style.btn2 }} onPress={() => { PressHandler() }}>
                    <Text style={styles.buttonText} >צור משימה</Text>
                </TouchableOpacity>
                </View> : null} 
                <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                    <Image style={styles.exitIcon} source={require('../../assets/exit_icon.png')} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    view: {
        //marginTop:50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height,


    },
    listContainer: {
        //flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height / 1.6 - 20,
        width: Dimensions.get('window').width / 1.1,
        marginTop: 10,
    },
    container:
    {
        //paddingTop: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',



    },
    emptyContainer: {
        width: Dimensions.get('window').width,
        alignItems: "center",
    },
    emptyIcon: {
        marginTop: 90,
        width: 80,
        height: 80,

    },

    emptyText: {
        color: "white",
        fontWeight: 'bold',
    },
    title: {
        margin: 20,
        //marginRight: 30,
        fontSize: 48,
        color: "seashell",
        borderBottomWidth: 2,
        borderColor: "seashell",
        textAlign: "center",
        width: Dimensions.get('window').width * 0.80,

    },
    subTitle: {
        fontSize: 24,
        color: "seashell",

    },
    mainListCon: {
        // flex: 1,
        height: Dimensions.get('window').height * 0.3,
        width: Dimensions.get('window').width / 1.3,
        backgroundColor: "#6f61ca",
        borderWidth: 1,
        borderColor: "#584DA1",
        borderRadius: 25,
        marginTop: 10,
    },
    listContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height * 0.5,
        marginTop: 10,
    },
    list: {
        flex: 1,
        height: Dimensions.get('window').height / 18,
        width: Dimensions.get('window').width / 1.5,
        backgroundColor: "seashell",
        flexDirection: "row-reverse",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        //marginHorizontal: 35,
        borderRadius: 25,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: "lightgray",
    },
    listText: {
        // flex:1,
        textAlign: "right",
        fontSize: 14,
    },
    picker: {
        width: Dimensions.get('window').width / 2,

        flexDirection: 'row-reverse',
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,


    },
    itemList: {
        width: Dimensions.get('window').width / 2.5,
        color: "#ffffff",
        textAlign: 'right',
        justifyContent: 'center',
        alignItems: 'center',


    },
    pickerItem: {
        color: "#00ffff",

    },
    inputBoxContainer: {
        //marginRight: 30,
    },
    shortInputBox: {
        width: Dimensions.get('window').width / 1.3,
        height: Dimensions.get('window').height / 15,
        backgroundColor: '#ededed',
        borderRadius: 25,
        paddingHorizontal: 16,
        marginTop: 10,
        textAlign: "right"
    },
    button: {
        width: Dimensions.get('window').width / 1.3,
        height: Dimensions.get('window').height / 13,
        borderRadius: 25,
        marginTop: 10,
        //marginBottom: 120,
        paddingVertical: 16,
        //marginHorizontal: 30,

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
        //marginRight: 35,
        //marginLeft: 55,

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
        alignItems: 'center',
        justifyContent: 'center',
        //marginBottom: 50,

    },
    recordSendBtnList: {
        width: Dimensions.get('window').width,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,

    },
    vButton: {
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').height / 9,
        backgroundColor: "#6f61ca", // #6357b5
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    exitButton: {
        paddingTop: 40,
        //position:'absolute',
        //marginLeft: 30,
        marginBottom: responsiveHeight(5),

    },
    exitIcon: {
        height: 50,
        width: 50,
    },

})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)