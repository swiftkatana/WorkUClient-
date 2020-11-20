import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native'


const CreateList = (fill, options, handler) => {
    var arr2 = [];
    var arrDay = Object.keys(fill);
    var state = Object.keys(fill[arrDay[0]]);
    let key = 0;
    for (let row = 0; row < 7; row++) {

        var arr = [];
        for (let column = 0; column < 3; column++) {

            arr.push(<View key={key} style={styles.dayText}><TouchableOpacity style={styles.touchableStyle} onPress={() => handler(row, column)}><Image style={styles.tinyPluse} source={options[fill[arrDay[row]][state[column]]]} /></TouchableOpacity></View>);
            key++;
        }
        arr2.push(
            <View key={key} style={styles.stateContainer}>
                {arr.map(item => item)}
            </View>);
        key++;
    }
    return (
        <>{arr2.map(item => item)}</>

    )
}


export default function Shifts() {

    const [lBtn, setLBtn] = useState(-1);
    const [updateScreen, SetUpdateScreen] = useState(0);
    const [fill, setFill] = useState({
        day1: {
            morning: 0,
            lunch: 0,
            evening: 0,
        },
        day2: {
            morning: 0,
            lunch: 0,
            evening: 0,
        },
        day3: {
            morning: 0,
            lunch: 0,
            evening: 0,
        },
        day4: {
            morning: 0,
            lunch: 0,
            evening: 0,
        },
        day5: {
            morning: 0,
            lunch: 0,
            evening: 0,
        },
        day6: {
            morning: 0,
            lunch: 0,
            evening: 0,
        },
        day7: {
            morning: 0,
            lunch: 0,
            evening: 0,
        },
    });


    const green = require('../assets/checked_icon_green.png');
    const yellow = require('../assets/checked_icon_yellow.png');
    const red = require('../assets/unchecked_icon_red.png');
    const options = [null, green, red, yellow];


    const pressHandler = (index) => {
        if (index == lBtn)
            index = -1;
        setLBtn(index);
    };
    const pressHandlerFill = (row, column) => {
        var newFill = fill;
        var arrDay = Object.keys(newFill);
        var state = Object.keys(newFill[arrDay[0]]);
        var checker = newFill[arrDay[row]][state[column]];
        if (checker === lBtn)
            checker = 0;
        else
            checker = lBtn;
        newFill[arrDay[row]][state[column]] = checker;
        setFill(newFill);
        SetUpdateScreen(updateScreen + 1);
    };




    return (<View style={styles.mainView}>
        <Text style={styles.header}>הגשת משמרות לשבוע הבא: </Text>
        <Text style={styles.header}>בחר תוית לסימון: </Text>
        <View style={styles.lableContainer}>

            <TouchableOpacity style={lBtn == 1 ? styles.lableButtonFocus : styles.lableButton} onPress={() => pressHandler(1)}>
                <Image style={styles.tinyPluse} source={green} />
                <Text style={styles.lableText}>יכול</Text>
            </TouchableOpacity>

            <TouchableOpacity style={lBtn == 2 ? styles.lableButtonFocus : styles.lableButton} onPress={() => pressHandler(2)}>
                <Image style={styles.tinyPluse} source={red} />
                <Text style={styles.lableText}>לא יכול</Text>
            </TouchableOpacity>
            <TouchableOpacity style={lBtn == 3 ? styles.lableButtonFocus : styles.lableButton} onPress={() => pressHandler(3)}>
                <Image style={styles.tinyPluse} source={yellow} />
                <Text style={styles.lableText}>מעדיף שלא</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.view}>
            <View >
                <View style={styles.daysContainer}>
                    <Text style={styles.dayText}>א</Text>
                    <Text style={styles.dayText}>ב</Text>
                    <Text style={styles.dayText}>ג</Text>
                    <Text style={styles.dayText}>ד</Text>
                    <Text style={styles.dayText}>ה</Text>
                    <Text style={styles.dayText}>ו</Text>
                    <Text style={styles.dayText}>ז</Text>
                </View>
                <View style={styles.fillContainer}>
                    <View style={styles.stateContainer}>
                        <Text style={styles.stateText}>בוקר</Text>
                        <Text style={styles.stateText}>צהוריים</Text>
                        <Text style={styles.stateText}>ערב</Text>
                    </View>
                    {CreateList(fill, options, pressHandlerFill)}


                </View>

            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} >שלח משמרות</Text>
            </TouchableOpacity>

        </View>
        <Text style={styles.header}>המשמרות שלך לשבוע הנוכחי: </Text>

    </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,

        alignItems: 'flex-end',
    },
    view: {
        alignItems: 'center',


    },
    lableContainer: {
        width: Dimensions.get('window').width,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        //marginHorizontal:15
    },
    lableButton: {
        textAlign: "center",
        justifyContent: 'center',
        alignItems: 'center',
        width: 109,
        height: 42,
        margin: 5,
        backgroundColor: "seashell",
        borderRadius: 10,
        fontWeight: "bold",
        borderWidth: 2,
        borderColor: "gray",
    },
    lableButtonFocus: {
        textAlign: "center",
        justifyContent: 'center',
        alignItems: 'center',
        width: 109,
        height: 42,
        margin: 5,
        backgroundColor: "seashell",
        borderRadius: 10,
        fontWeight: "bold",
        borderWidth: 2,
        borderColor: "red",
    },
    lableText: {
        textAlign: "center",
        borderRadius: 10,
        fontWeight: "bold",
    },
    tinyPluse: {
        width: 15,
        height: 15,

    },
    header: {
        fontSize: 16,
        color: "seashell",
        marginHorizontal: 22,
        marginVertical: 2,
    },
    daysContainer: {
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row-reverse',
        marginHorizontal: Dimensions.get('window').width / 50 - 10,

    },
    dayText: {
        textAlign: "center",
        width: Dimensions.get('window').width / 12,
        height: 35,
        margin: 5,
        backgroundColor: "seashell",
        borderRadius: 10,
        fontWeight: "bold",
    },
    touchableStyle: {
        textAlign: "center",
        width: Dimensions.get('window').width / 12,
        height: 35,
        margin: 5,
        //backgroundColor:"seashell",
        borderRadius: 10,
        fontWeight: "bold",
    },
    fillContainer: {
        width: Dimensions.get('window').width,
        flexDirection: 'row-reverse',
        marginHorizontal: 10,


    },
    stateContainer: {
        //flex:1,
        //justifyContent:'space-between',
        alignItems: 'flex-end',
        flexDirection: 'column',
        //marginHorizontal:20,
    },
    stateText: {
        textAlign: "center",
        width: 50,
        height: 35,
        margin: 5,
        backgroundColor: "seashell",
        borderRadius: 10,
        fontWeight: "bold",
        fontSize: 11,

    },
    button: {
        width: 200,
        backgroundColor: "#6f61ca",// #6357b5
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        //marginLeft:50,

    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'seashell',
        textAlign: 'center',
    },

})
