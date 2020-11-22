import React, { useEffect, useRef, useState } from "react";
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalObject } from "../../src/globalObject";
import requestList from "../../src/api/apiKeys";
import { connect } from "react-redux";
import Recorder from '../../class/VoiceRecording';
import {responsiveHeight,responsiveWidth} from "react-native-responsive-dimensions";

function Main({ navigation, style }) {

    const play = require('../../assets/play_button_icon.png');
    const pause = require('../../assets/pause_icon.png');
    const square = require('../../assets/square_icon.png');
    const microphone = require('../../assets/microphone_icon.png');
    const paper_plane = require('../../assets/paper_plane_icon.png');
    const imgSrc = [play, pause, square, microphone, paper_plane];
    const item = navigation.state.params.item;
    const [update, setUpdate] = useState(0);
    const myScroll = useRef(null)
    const Rec = new Recorder();
    const status = globalObject.User.role === "manager" ?  "בוטל" : "הושלם";
    const  navi = globalObject.User.role === "manager" ?  "ManagerMainScreen"  : "EmployeeMainScreen";
    const butText = globalObject.User.role === "manager" ?  "ביטול משימה": "סיימתי בהצלחה" ;
    const email = item.employee;
    const notiEmail = globalObject.User.role === "manager" ?  item.employee : globalObject.User.managerEmail;
    const audios = navigation.state.params.shouldRender ?  globalObject.User.tasks.processing[item._id].audios : globalObject.User.tasks.completed[item._id].audios ;
    const renderTaskOptions = ()=>
    {
        if (!navigation.state.params.shouldRender)
            return null;


        return (
            <View>
                <View style={styles.recordSendBtnList}>
                <TouchableOpacity style={{ ...styles.button, ...style.btn2 }} onPressIn={Rec.StartRecording} onPressOut={Rec.StopRecording}>
                    <Image style={styles.tinyLogo} source={imgSrc[3]} />
                    <Text style={styles.buttonText}>הקלט</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.button, ...style.btn2 }} onPress={Rec.playAudio} >
                    <Image style={styles.tinyLogo} source={imgSrc[0]} />
                    <Text style={styles.buttonText}>נגן הקלטה</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.button, ...style.btn2 }}
                    onPress={handlerSendVoice}
                >
                    <Image style={styles.tinyLogo} source={imgSrc[4]} />
                    <Text style={styles.buttonText}>שלח הודעה</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.updateBtnContainer}>
                    <TouchableOpacity
                        style={styles.updateButton}
                        onPress={pressHandler}
                    >
                        <Image style={styles.lessTinyLogo} source={require('../../assets/star_icon.png')} />
                        <Text style={styles.buttonText}> {butText} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    useEffect(() => {

        const handle = setInterval(() => {
                if (update !== audios.length)
                    setUpdate(update + 1)

        }, 100);
        myScroll.current.scrollToEnd({ animated: true })
        return () => {
            clearInterval(handle);
        }
    }, [update])

    const SendUpdateTask = async () => {
        var res = await globalObject.SendRequest(requestList.userUpdateTaskUrl, {
            _id: item._id,
            email,
            complete: "completed",
            status,
        });
        if (res) {
                globalObject.User.tasks.completed[item._id] = res;
                delete globalObject.User.tasks.processing[item._id];

                globalObject.sendNotification(notiEmail, res, 'למידה נוסף כנס ללוח משימות', "משימה עודכנה", 'updateTask')
                navigation.navigate(navi);
            }
    }
    const pressHandler = () => {
        title = "שים לב";
        msg = "פעולה זו תעביר את המשימה לסטטוס ''הושלמה'' ולאחר מכן חדר המשימה יסגר ויוסר מרשימת המשימות הפתוחות"
        alertButton = [
            { text: "אישור", onPress:()=>{SendUpdateTask()}},
            { text: "ביטול", },
        ];
        Alert.alert(title, msg, alertButton, { cancelable: false });
    
    }
    const handlerSendVoice = async () => {
        let to = item.employee;
        let noti = globalObject.User.email === globalObject.User.tasks.processing[item._id].employee ? globalObject.User.managerEmail : globalObject.User.tasks.processing[item._id].employee;

        let audio = await Rec.UploadToServer(globalObject.User.email, to, item._id, globalObject.User.fullName);
        if (audio) {
            audios.push(audio);
            audio.taskId = item._id;
            globalObject.sendNotification(noti, audio, 'התקבלה הודעה קולית חדשה', 'התקבל עדכון', 'updateTaskVoice');
            setUpdate(update + 1);
        }
    }

    const renderVoiceList = () => {
        return audios.map(obj => {
            if (obj.email === globalObject.User.email) {
                return (
                    <View key={obj.url} style={styles.myVoiceMsg}>
                        <TouchableOpacity
                            style={{ ...styles.myVoiceButton, ...style.btn3 }}
                            onPress={() => Rec.playAudio(obj.url)}
                        >
                            <Image style={styles.tinyLogo} source={imgSrc[0]} />
                            <Text style={styles.buttonText}>אני</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
            return (
                <View key={obj.url} style={styles.yourVoiceMsg}>
                    <TouchableOpacity
                        style={{ ...styles.yourVoiceButton, ...style.btn2 }}
                        onPress={() => Rec.playAudio(obj.url)}
                    >
                        <Image style={styles.tinyLogo} source={imgSrc[0]} />
                        <Text style={styles.buttonText}>{obj.fullName}</Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    return (
        <View style={{ ...styles.view, ...style.view }}>
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>משימה</Text>

                    <Text style={styles.subTitle}>דחיפות: {item.priority}</Text>
                    <Text style={styles.subTitle}>תקציר: {item.title}</Text>
                    <Text style={styles.subTitle}>שם עובד: </Text>
                    <View style={styles.scrollView}>

                        <ScrollView ref={(ref) => myScroll.current = ref}>

                            {renderVoiceList()}

                        </ScrollView>
                    </View>
                </View>
            </View>
            
            {renderTaskOptions()}

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
        alignItems: 'center',
        justifyContent: 'center',


    },
    container: {
        height: responsiveHeight(53),
        alignItems: 'center',
        justifyContent: 'center',

    },
    scrollView:
    {
        height: responsiveHeight(28),
        width: responsiveWidth(85),

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
        textAlign: "center",
        margin: 20,
        fontSize: 48,
        color: "seashell",
        borderBottomWidth: 2,
        borderColor: "seashell",
    },
    subTitle: {
        textAlign: "center",
        fontSize: 18,
        color: "seashell",
    },
    descriptionStyle: {
        textAlign: "center",
        marginLeft: 30,
        fontSize: 18,
        color: "seashell",
    },
    tinyLogo: {
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lessTinyLogo: {
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
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
    recordSendBtnList: {
        width: Dimensions.get('window').width,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,

    },
    myVoiceMsg: {
        width: Dimensions.get('window').width,
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
        height: responsiveHeight(10.2),
        backgroundColor: "#6f61ca",
        borderRadius: 25,
        marginVertical: 5,
        paddingVertical: 16,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    updateButton: {
        width: responsiveWidth(50),
        height: responsiveHeight(10.2),
        backgroundColor: "#6a61ca", 
        borderRadius: 25,
        marginVertical: 5,
        paddingVertical: 12,
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
    exitIcon: {
        height: 50,
        width: 50,
    },
});
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)