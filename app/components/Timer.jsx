import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import apiKeys from '../src/api/apiKeys';
import { globalObject } from "../src/globalObject"
var getFullDate = function (sp) {
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //As January is 0.
    var yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return (mm + sp + dd + sp + yyyy);
};

getFullTime = (time) => {
    var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((time % (1000 * 60)) / 1000);
    var print = (hours > 9 ? hours.toString() : "0" + hours.toString()) + ":";
    print += (minutes > 9 ? minutes.toString() : "0" + minutes.toString()) + ":";
    print += seconds > 9 ? seconds.toString() : "0" + seconds.toString();
    return print;
}

class timer {
    constructor() {
        this.dif = 0;
        this.now = 0;
        this.isEnd = false;

    }
    ButtonHandler = () => {
        if (this.isEnd) {
            let timeWorkObj = {
                sumOfTime: getFullTime(this.dif),
                endTime: getFullTime(new Date().getTime()),
                startTime: getFullTime(this.now),
                date: getFullDate('/'),
                id: Math.floor(Math.random() * (999999990000000 - 1000009999999) + 1000009999999).toString().replace('3', 'th3210ty').replace('6', 'ghew#!')
            }
            let d = [];

            globalObject.User.workTimes.unshift(timeWorkObj);
            globalObject.SendRequest(apiKeys.userAddNewWorkTime, { createDateOfUser: globalObject.User.createDateOfUser, email: globalObject.User.email, timeWorkObj })

            this.now = 0;
            this.isEnd = false;
        }
        else {
            this.now = new Date().getTime();
            this.isEnd = true;
        }
    }
    GetPrint() {
        var dif = new Date().getTime() - globalObject.timer.now;

        var hours = Math.floor((dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((dif % (1000 * 60)) / 1000);
        var print = (hours > 9 ? hours.toString() : "0" + hours.toString()) + ":";
        print += (minutes > 9 ? minutes.toString() : "0" + minutes.toString()) + ":";
        print += seconds > 9 ? seconds.toString() : "0" + seconds.toString();
        this.dif = dif;
        return print;
    }
}


export default function Timer() {

    const [timePass, SetTime] = useState("00:00:00");
    const [buttonName, setButtonName] = useState("תחילת עבודה")
    const [textBottonStyle, setTextButtonStyle] = useState(styles.TimerText)
    useEffect(() => {
        if (!globalObject.timer) {
            globalObject.timer = new timer();
        }
        else {
            SetTime(globalObject.timer.GetPrint());
        }
        const id = setInterval(() => {
            // {sumOfTime:"10",endTime:"22:00",startTime:"12:00",date:"10.2.20",id:"11"},

            if (globalObject.timer.isEnd) {
                SetTime(globalObject.timer.GetPrint());
                setButtonName("סיום עבודה")
                setTextButtonStyle(styles.TimerTextEnd)
            }
            else {
                SetTime("00:00:00");
                setButtonName("תחילת עבודה")
                setTextButtonStyle(styles.TimerText)
            }
        }, 100);
        return () => {
            clearInterval(id);
        }
    }, [])

    return (
        <View style={styles.view}>
            <Image style={styles.tinyLogo} source={require('../assets/circle_icon_purple.png')} />
            <TouchableOpacity style={styles.TimerStyle} onPress={() => { globalObject.timer.ButtonHandler() }}>
                <Text style={textBottonStyle}>
                    {buttonName}
                </Text>
                <Text style={styles.Clock}>
                    {timePass}
                </Text>
            </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    view:
    {
        flex: 1.5,
        height: 70,
        width: Dimensions.get('window').width,
        //flexDirection:"row-reverse",
        justifyContent: "center",
        //paddingHorizontal: 10,
        alignItems: 'center',
        textAlign: "center",
        marginVertical: 10,
        marginTop: 20,


    },
    TimerStyle:
    {

        //marginLeft:5,
        borderRadius: 21,
        //backgroundColor: "lightgray",
        width: 70,
        height: 50,
        justifyContent: 'center',
        textAlign: "center",
        //margin: 10,



    },
    TimerText:
    {
        fontSize: 12,
        textAlign: "center",
        fontWeight: "bold",
        color: "grey",

    },
    TimerTextEnd:
    {
        fontSize: 12,
        textAlign: "center",
        fontWeight: "bold",
        color: "black",
        marginHorizontal: 5,

    },
    Clock:
    {
        flexGrow: 1,
        //marginLeft: 60,
        justifyContent: 'center',
        textAlign: "center",
        fontSize: 11,
        marginTop: 2,

    },
    tinyLogo: {
        position: "absolute",
        width: 85,
        height: 85,
        opacity: 0.6,
        //alignItems: 'flex-end',
        //justifyContent: 'flex-end',
        //marginBottom: 40,
        //marginRight: 12,
        //zIndex: 5,

    },




})

const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(ManagerNaviButton)