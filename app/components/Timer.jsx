import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
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


export default function Timer({ style }) {

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

    let title = timePass !== "00:00:00" ? "להפסיק את השעון" : "להתחיל את השעון"
    let alertButton = [{
        text: timePass === "00:00:00" ? "התחל" : 'הפסק', onPress: () => globalObject.timer.ButtonHandler()
    }, { text: "בטל" }];

    return (
        <View style={styles.view}>
            <View style={{ ...styles.circle, borderColor: style.view.backgroundColor }}>
                <TouchableOpacity style={styles.TimerStyle} onPress={() => { Alert.alert('', title, alertButton) }}>
                    <Text style={textBottonStyle}>
                        {buttonName}
                    </Text>
                    <Text style={styles.Clock}>
                        {timePass}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    view:
    {
        flex: 1.5,
        height: responsiveScreenWidth(80),
        width: Dimensions.get('window').width,
        justifyContent: "center",
        alignItems: 'center',
        textAlign: "center",
        marginVertical: responsiveScreenHeight(1),
        marginTop: responsiveScreenHeight(3),
    },
    TimerStyle:
    {
        width: responsiveScreenWidth(15),
        //height: 60,
    },

    TimerText:
    {
        fontSize: responsiveScreenFontSize(1.6),
        textAlign: "center",
        fontWeight: "bold",
        color: "grey",
    },
    TimerTextEnd:
    {
        fontSize: responsiveScreenFontSize(1.6),
        textAlign: "center",
        fontWeight: "bold",
        color: "black",
        marginHorizontal: responsiveScreenWidth(1),
    },
    Clock:
    {
        justifyContent: 'center',
        textAlign: "center",
        fontSize: responsiveScreenFontSize(1.4),
        marginTop: responsiveScreenHeight(0.5),
    },
    circle:
    {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 60,
        width: responsiveScreenHeight(11.5),
        height: responsiveScreenHeight(11.5),
        opacity: 0.9,
        borderWidth: 2.3,
    }
})

