import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import Shifts from '../../components/Shifts'
import { globalObject } from '../../src/globalObject'
import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux';

const CreateList = (fill, options, handler) => {
    var arr2 = [];
    var arrDay = Object.keys(fill);
    var state = Object.keys(fill[arrDay[0]]);
    let key = 0;
    for (let row = 0; row < 7; row++) {

        var arr = [];
        for (let column = 0; column < 3; column++) {

            arr.push(<View key={key} style={styles.fillBox}><View style={styles.notTouchableStyle} onPress={() => handler(row, column)}><Image style={styles.tinyPluse} source={options[fill[arrDay[row]][state[column]]]} /></View></View>);
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
function Main({ navigation, style }) {
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
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

    const blue = require('../../assets/checked_icon_blue.png');
    const pressHandlerFill = () => {
    };

    return (
        <View style={{ ...styles.view, ...style.view }}>
            <View style={styles.buttonsContainer}>
                <Text style={styles.title}>המשמרות שלי</Text>
                <Text style={styles.header}>המשמרות שלך לשבוע הנוכחי:</Text>

                <View style={styles.shiftsCon}>
                <View style={styles.view}>
                <View style={styles.shiftsCon}>
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
                        {CreateList(fill, blue, pressHandlerFill)}


                    </View>

                </View>

            </View>
                </View>
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
    buttonsContainer:
    {
        flex: 1,
        //paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',


    },
    shiftsCon:{
        //alignItems:'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height/2,
    },
    title:
    {
        textAlign:"center",
        width: Dimensions.get('window').width*0.80,
        margin: 20,
        //marginRight: 30,
        fontSize: 48,
        color: "seashell",
        borderBottomWidth:2,
        borderColor: "seashell",
    },
    checkBoxContainer: {
        flex: 1,
        backgroundColor: 'seashell',
        margin: 20,
        marginVertical: 150,
        borderRadius: 30,
    },

    lableContainer: {
        width: Dimensions.get('window').width,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
    },

    tinyPluse: {
        width: 15,
        height: 15,

    },
    header: {
        fontSize: 18,
        color: "seashell",
       // marginHorizontal: 22,
       // marginVertical: 2,
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
        backgroundColor:"lightgrey",
    },
    fillBox:{
        textAlign: "center",
        width: Dimensions.get('window').width / 12,
        height: 35,
        margin: 5,
        backgroundColor: "seashell",
        borderRadius: 10,
        fontWeight: "bold",
    },
    notTouchableStyle: {
        textAlign: "center",
        width: Dimensions.get('window').width / 12,
        height: 35,
        margin: 5,
        borderRadius: 10,
        fontWeight: "bold",
    },
    fillContainer: {
        width: Dimensions.get('window').width,
        flexDirection: 'row-reverse',
        marginHorizontal: 10,
    },
    stateContainer: {
        alignItems: 'flex-end',
        flexDirection: 'column',
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
        backgroundColor:"lightgrey",

    },
    button: {
        width: 200,
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
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