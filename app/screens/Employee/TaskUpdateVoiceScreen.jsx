import React, { useState } from "react";
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Directions, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "@react-native-community/picker";
import { globalObject } from "../../src/globalObject";
import requestList from "../../src/api/apiKeys";
import { Audio } from 'expo-av';
import * as Permissions from "expo-permissions";
import VoiceRecording from "../../components/VoiceRecording";



const pressHandler = () => {
    title = "שים לב";
    msg = "פעולה זו תעביר את המשימה לסטטוס ''הושלמה'' ולאחר מכן חדר המשימה יסגר ויוסר מרשימת המשימות הפתוחות"
    alertButton = [
        { text: "אישור",},
        { text: "ביטול",},
    ];
    Alert.alert(title, msg, alertButton, { cancelable: false });

}
export default function Main({ navigation }) {

    const play = require('../../assets/play_button_icon.png');
    const pause = require('../../assets/pause_icon.png');
    const square = require('../../assets/square_icon.png');
    var imgSrc = play;
    const item = navigation.state.params.item;
    const [status, SetStatus] = useState("completed");
    const [onPlay, setOnPlay] = useState(false);

    const playVoiceBtn = () => {
        if(onPlay){
            setOnPlay(false);
            imgSrc = play;
        }else{
            setOnPlay(true);
            imgSrc = pause;
        }
    };

    const SendUpdateTask = async (id, status) => {
        var res = await globalObject.SendRequest(requestList.userUpdateTaskUrl, {
            _id: id,
            email: globalObject.User.email,
            complete: status,
        });
        if (res) {
            if (status == "completed") {
                globalObject.User.tasks.completed[id] = globalObject.User.tasks.processing[id];
                delete globalObject.User.tasks.processing[id];

                globalObject.sendNotification(globalObject.User.managerEmail, res, 'למידה נוסף כנס ללוח משימות', "משימה עודכנה", 'updateTask')
                navigation.navigate("EmployeeMainScreen");
            }
        }
    };
    return (
        <View style={styles.view}>
            <TouchableOpacity
                style={styles.exitButton}
                onPress={() => navigation.pop()}
            >
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.header}>משימה</Text>

                    <Text style={styles.subTitle}>דחיפות: {item.priority}</Text>
                    <Text style={styles.subTitle}>תקציר: {item.title}</Text>
                    <Text style={styles.subTitle}>שם עובד: </Text>
                    <View style={styles.scrollView}>
                    {/* <Text style={styles.bodyHeader}>פירוט:</Text> */}

                        <ScrollView>
                            {/* <Text style={styles.subTitle}>{item.description}</Text> */}
                            <View style={styles.myVoiceMsg}>
                                <TouchableOpacity
                                    style={styles.myVoiceButton}
                                    onPress={playVoiceBtn}
                                >
                                    <Image style={styles.tinyLogo} source={imgSrc}/> 
                                    <Text style={styles.buttonText}>אני</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.yourVoiceMsg}>
                                <TouchableOpacity
                                    style={styles.yourVoiceButton}
                                    onPress={() => SendUpdateTask(item.id, status)}
                                >
                                    <Image style={styles.tinyLogo} source={require('../../assets/play_button_icon.png')}/> 
                                    <Text style={styles.buttonText}>נוח</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.yourVoiceMsg}>
                                <TouchableOpacity
                                    style={styles.yourVoiceButton}
                                    onPress={() => SendUpdateTask(item.id, status)}
                                >
                                    <Image style={styles.tinyLogo} source={require('../../assets/play_button_icon.png')}/> 
                                    <Text style={styles.buttonText}>נוח</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.myVoiceMsg}>
                                <TouchableOpacity
                                    style={styles.myVoiceButton}
                                    onPress={() => SendUpdateTask(item.id, status)}
                                >
                                    <Image style={styles.tinyLogo} source={require('../../assets/play_button_icon.png')}/> 
                                    <Text style={styles.buttonText}>אני</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
            <View style={styles.recordSendBtnList}>
                    <TouchableOpacity
                            style={styles.button}
                        >
                            <Image style={styles.tinyLogo} source={require('../../assets/microphone_icon.png')}/> 
                            <Text style={styles.buttonText}>הקלט</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Image style={styles.tinyLogo} source={require('../../assets/play_button_icon.png')}/> 
                        <Text style={styles.buttonText}>נגן הקלטה</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                     
                    >
                        <Image style={styles.tinyLogo} source={require('../../assets/paper_plane_icon.png')}/> 
                        <Text style={styles.buttonText}>שלח הודעה</Text>
                    </TouchableOpacity>
                    {/* <VoiceRecording /> */}
                    
                </View>
                <View style={styles.updateBtnContainer}>
                    <TouchableOpacity
                        style={styles.updateButton}
                        onPress ={pressHandler}
                    >
                        <Image style={styles.lessTinyLogo} source={require('../../assets/star_icon.png')}/> 
                        <Text style={styles.buttonText}>סיימתי בהצלחה</Text>
                    </TouchableOpacity>
                </View>
            {/* <VoiceRecording/> */}
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: "#7f71e3",
    },
    container: {
        alignItems: "flex-end",
    },
    scrollView:
    {
        height: 300,
        marginTop: 10,
        justifyContent: 'flex-end',
        textAlign: "right",
        backgroundColor: "seashell",
        marginHorizontal:25,
        borderRadius:20,
        borderWidth: 3,
        borderColor: "lightgrey",
    },
    header: {
        margin: 20,
        marginRight: 30,
        fontSize: 28,
        color: "seashell",
        textDecorationLine: "underline",
    },
    subTitle: {
        marginRight: 30,
        marginLeft: 30,
        fontSize: 16,
        color: "seashell",
    },
    descriptionStyle: {
        textAlign: "right",
        marginRight: 30,
        marginLeft: 30,
        fontSize: 16,
        color: "seashell",
    },
    tinyLogo:{
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        //marginBottom: 50,
        
    },
    lessTinyLogo:{
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        //marginBottom: 50,
    },
    bodyHeader: {

        marginRight: 30,
        marginLeft: 30,
        fontSize: 16,
        color: "seashell",
    },
    itemList: {
        textAlign: "right",
        width: 300,
        textAlign: "right",
        justifyContent: "center",
    },
    infoContainer: {},
    inputBoxContainer: {},
    inputBox: {
        width: 300,
        height: 100,
        backgroundColor: "#ededed",
        borderRadius: 25,
        marginVertical: 60,
        marginHorizontal: 30,
        textAlign: "right",
    },
    updateBtnContainer: {
        justifyContent: "center",
        alignItems: 'center',
    },
    itemList: {
        textAlign: "right",
        width: 300,
        textAlign: "right",
        justifyContent: "center",
    },
    pickerItem: {
        fontSize: 16,
        color: "green",
        textAlign: "right",
        justifyContent: "center",
    },
    recordSendBtnList:{
        width: Dimensions.get('window').width,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10,

    },
    myVoiceMsg:{
    width: Dimensions.get('window').width,
    alignItems:'flex-start',
    },
    yourVoiceMsg:{
    width: Dimensions.get('window').width-55,
    alignItems:'flex-end',
    },
    myVoiceButton: {
        width: 170,
        height: 70,
        backgroundColor: "#584DA1", // #6357b5
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 10,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: "lightgrey",
    },
    yourVoiceButton: {
        width: 170,
        height: 70,
        backgroundColor: "#6f61ca", // #6357b5
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 10,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: "lightgrey",
    },
    button: {
        width: 100,
        height: 80,
        backgroundColor: "#6f61ca", // #6357b5
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    updateButton:{
        width: 200,
        height: 80,
        backgroundColor: "#6f61ca", // #6357b5
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 10,
        alignItems: 'center',
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "500",
        color: "seashell",
        textAlign: "center",
    },
    exitButton: {
        marginLeft: 30,
        paddingTop: 60,
    },
    exitText: {
        fontSize: 30,
        color: "seashell",
    },
});
