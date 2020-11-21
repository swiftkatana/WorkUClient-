import React, { useState } from "react";
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalObject } from "../../src/globalObject";
import requestList from "../../src/api/apiKeys";
import { connect } from "react-redux";
import Recorder from '../../class/VoiceRecording';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

const pressHandler = () => {
    title = "שים לב";
    msg = "פעולה זו תעביר את המשימה לסטטוס ''הושלמה'' ולאחר מכן חדר המשימה יסגר ויוסר מרשימת המשימות הפתוחות"
    alertButton = [
        { text: "אישור", },
        { text: "ביטול", },
    ];
    Alert.alert(title, msg, alertButton, { cancelable: false });

}
function Main({ navigation, style }) {

    const play = require('../../assets/play_button_icon.png');
    const pause = require('../../assets/pause_icon.png');
    const square = require('../../assets/square_icon.png');
    var imgSrc = play;
    const item = navigation.state.params.item;
    const [status, SetStatus] = useState("completed");
    const [onPlay, setOnPlay] = useState(false);
    const Rec = new Recorder();
    const playVoiceBtn = () => {
        if (onPlay) {
            setOnPlay(false);
            imgSrc = play;
        } else {
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
        <View style={{ ...styles.view, ...style.view }}>
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>משימה</Text>

                    <Text style={styles.subTitle}>דחיפות: {item.priority}</Text>
                    <Text style={styles.subTitle}>תקציר: {item.title}</Text>
                    <Text style={styles.subTitle}>שם עובד: </Text>
                    <View style={styles.scrollView}>

                        <ScrollView>
                            <View style={styles.myVoiceMsg}>
                                <TouchableOpacity
                                    style={{ ...styles.myVoiceButton, ...style.btn3 }}
                                    onPress={playVoiceBtn}
                                >
                                    <Image style={styles.tinyLogo} source={imgSrc} />
                                    <Text style={styles.buttonText}>אני</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.yourVoiceMsg}>
                                <TouchableOpacity
                                    style={{ ...styles.yourVoiceButton, ...style.btn2 }}
                                    onPress={() => SendUpdateTask(item.id, status)}
                                >
                                    <Image style={styles.tinyLogo} source={require('../../assets/play_button_icon.png')} />
                                    <Text style={styles.buttonText}>נוח</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.yourVoiceMsg}>
                                <TouchableOpacity
                                    style={{ ...styles.yourVoiceButton, ...style.btn2 }}
                                    onPress={() => SendUpdateTask(item.id, status)}
                                >
                                    <Image style={styles.tinyLogo} source={require('../../assets/play_button_icon.png')} />
                                    <Text style={styles.buttonText}>נוח</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.myVoiceMsg}>
                                <TouchableOpacity
                                    style={{ ...styles.myVoiceButton, ...style.btn3 }}
                                    onPress={() => SendUpdateTask(item.id, status)}
                                >
                                    <Image style={styles.tinyLogo} source={require('../../assets/play_button_icon.png')} />
                                    <Text style={styles.buttonText}>אני</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
            <View style={styles.recordSendBtnList}>
                <TouchableOpacity style={{ ...styles.button, ...style.btn2 }} onPressIn={Rec.StartRecording} onPressOut={Rec.StopRecording}>
                    <Image style={styles.tinyLogo} source={require('../../assets/microphone_icon.png')} />
                    <Text style={styles.buttonText}>הקלט</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.button, ...style.btn2 }} >
                    <Image style={styles.tinyLogo} source={require('../../assets/play_button_icon.png')} />
                    <Text style={styles.buttonText}>נגן הקלטה</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.button, ...style.btn2 }}

                >
                    <Image style={styles.tinyLogo} source={require('../../assets/paper_plane_icon.png')} />
                    <Text style={styles.buttonText}>שלח הודעה</Text>
                </TouchableOpacity>


            </View>
            <View style={styles.updateBtnContainer}>
                <TouchableOpacity
                    style={styles.updateButton}
                    onPress={pressHandler}
                >
                    <Image style={styles.lessTinyLogo} source={require('../../assets/star_icon.png')} />
                    <Text style={styles.buttonText}>סיימתי בהצלחה</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                    <Image style={styles.exitIcon} source={require('../../assets/exit_icon.png')} />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        //marginTop:50,
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',


    },
    container: {
        height: responsiveHeight(53),
        alignItems:'center',
        justifyContent: 'center',
        
    },
    scrollView:
    {
        height: responsiveHeight(28),
        marginTop: 10,
        justifyContent: 'flex-end',
        textAlign: "right",
        backgroundColor: "seashell",
        marginHorizontal: 25,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "lightgrey",
    },
    title:
    {

        textAlign:"center",
        //width: Dimensions.get('window').width*0.80,
        margin: 20,
        //marginRight: 30,
        fontSize: 48,
        color: "seashell",
        borderBottomWidth:2,
        borderColor: "seashell",
    },
    subTitle: {
        marginRight: 30,
        marginLeft: 30,
        fontSize: 18,
        color: "seashell",
    },
    descriptionStyle: {
        textAlign: "right",
        marginRight: 30,
        marginLeft: 30,
        fontSize: 18,
        color: "seashell",
    },
    tinyLogo: {
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        //marginBottom: 50,

    },
    lessTinyLogo: {
        width: 25,
        height: 25,
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
        height: responsiveHeight(63),
        width: responsiveWidth(14.5),
        textAlign: "right",
        justifyContent: "center",
    },
    infoContainer: {},
    inputBoxContainer: {},
    inputBox: {
        width: responsiveWidth(14.5),
        height: responsiveHeight(63),
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
        width: responsiveWidth(14.5),
        textAlign: "right",
        justifyContent: "center",
    },
    pickerItem: {
        fontSize: 16,
        color: "green",
        textAlign: "right",
        justifyContent: "center",
    },
    recordSendBtnList: {
        width: Dimensions.get('window').width,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,

    },
    myVoiceMsg: {
        width: responsiveWidth(14.5),
        alignItems: 'flex-start',
    },
    yourVoiceMsg: {
        width: Dimensions.get('window').width - 55,
        alignItems: 'flex-end',
    },
    myVoiceButton: {
        width: responsiveWidth(50),
        height: responsiveHeight(10.1),
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 10,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: "lightgrey",
    },
    yourVoiceButton: {
        width: responsiveWidth(50),
        height: responsiveHeight(10.1),
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 10,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: "lightgrey",
    },
    button: {
        width: responsiveWidth(25),
        height: responsiveHeight(11),
        backgroundColor: "#6f61ca", // #6357b5
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    updateButton: {
        width: responsiveWidth(50),
        height: responsiveHeight(11),
        backgroundColor: "#6a61ca", // #6357b5
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
    exitButton:
    {
        paddingTop: 10,
    },
    exitIcon:{
        height:50,
        width:50,
    },
});
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)