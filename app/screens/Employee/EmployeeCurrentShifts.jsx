import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import requestList from "../../src/api/apiKeys";
import { connect } from 'react-redux';
import { globalObject } from '../../src/globalObject';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';


function Main({ navigation, style }) {


    const blue = require('../../assets/checked_icon_blue.png');
    const options = [blue, blue, blue];
    const fill = useRef();
    const [len, setLen] = useState(0);
    useEffect(() => {

        (async () => {
            const res = await globalObject.SendRequest(requestList.getShiftUrl, { email: globalObject.User.email });
            console.log(typeof (res));
            if (!res[0])
                setLen(-1);
            else {
                fill.current = res[0];
                console.log(1);
                const keys = Object.keys(res[0]);
                if (keys === undefined)
                    setLen(-1);
                else
                    setLen(Object.keys(res[0]).length);
            }
        })();
    }, [])
    const GetLenShifts = (fill) => {

        if (!fill)
            return 0;
        var arrDay = Object.keys(fill);
        if (!arrDay.length)
            return 0;
        var state = Object.keys(fill[arrDay[0]]);
        var howmanyShiftLen = 0;

        for (let row = 0; row < 7; row++) {
            for (let column = 0; column < 3; column++) {
                if (fill[arrDay[row]][state[column]][0] === globalObject.User.email) {
                    howmanyShiftLen++;
                }
            }
        }
        return howmanyShiftLen;
    }

    const CreateList = (fill) => {

        if (!fill)
            return <View></View>;
        var arr2 = [];
        var arrDay = Object.keys(fill);
        if (!arrDay.length)
            return <View></View>;
        var state = Object.keys(fill[arrDay[0]]);
        var howmanyShiftLen = 0;
        let key = 0;
        for (let row = 0; row < 7; row++) {
            var arr = [];
            for (let column = 0; column < 3; column++) {
                if (fill[arrDay[row]][state[column]][0] === globalObject.User.email) {
                    arr.push(<View key={key} style={styles.fillBox}><View style={styles.notTouchableStyle}><Image style={styles.tinyPluse} source={blue} /></View></View>);
                    howmanyShiftLen++;
                }
                else
                    arr.push(<View key={key} style={styles.fillBox}><View style={styles.notTouchableStyle}><Image style={styles.tinyPluse} source={null} /></View></View>);
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



    const RenderLoadingScreen = () => {

        if (len === 0)
            return (<Image style={globalObject.styles.loadingIcon} source={require("../../assets/loading_animation.gif")} />)
        else if (GetLenShifts(fill.current) === 0 || len === -1)
            return (<Text style={styles.header}>אין לך משמרות השבוע</Text>)
        else
            return (
                <View style={styles.shiftsCon}>
                    <Text style={globalObject.styles.subTextWhite}>המשמרות שלך לשבוע הנוכחי:</Text>
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
                                {CreateList(fill.current, options)}
                            </View>

                        </View>
                    </View>
                </View>
            )
    }




    return (
        <View style={{ ...styles.view, ...style.view }}>

            <View style={styles.buttonsContainer}>
                <Text style={globalObject.styles.menuTitle}>המשמרות שלי</Text>

                {RenderLoadingScreen()}
                <TouchableOpacity style={globalObject.styles.exitButton} onPress={() => navigation.pop()}>
                    <Image style={globalObject.styles.exitIcon} source={require('../../assets/exit_icon.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        //marginTop:50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',


    },
    buttonsContainer:
    {
        flex: 1,
        //paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',


    },
    shiftsCon: {
        //alignItems:'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height / 2,
    },

    checkBoxContainer: {
        flex: 1,
        backgroundColor: 'seashell',
        //margin: 20,
        //marginVertical: 150,
        //borderRadius: 30,
    },

    lableContainer: {
        width: responsiveScreenWidth(100),
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
    },

    tinyPluse: {
        justifyContent: 'center',
        width: responsiveScreenHeight(2),
        height: responsiveScreenHeight(2),
    },

    header: {
        fontSize: responsiveScreenFontSize(2.2), //18
        color: "seashell",
        marginVertical: responsiveScreenWidth(1),
    },
    daysContainer: {
        width: responsiveScreenWidth(76),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row-reverse",


    },
    dayText: {
        textAlign: "center",
        width: responsiveScreenWidth(8.5),
        height: responsiveScreenHeight(4.2),
        margin: responsiveScreenWidth(1.2),
        backgroundColor: "seashell",
        borderRadius: 10,
        fontWeight: "bold",
        backgroundColor: "lightgrey",
    },
    fillBox: {
        textAlign: "center",
        width: responsiveScreenWidth(8.5),
        height: responsiveScreenHeight(4.2),
        margin: responsiveScreenWidth(1.2),
        backgroundColor: "seashell",
        borderRadius: 10,
        fontWeight: "bold",
    },
    notTouchableStyle: {
        textAlign: "center",
        width: responsiveScreenWidth(9),
        height: responsiveScreenHeight(4.4),
        //margin: 5,
        borderRadius: 11,
        fontWeight: "bold",
        borderWidth: 2,
        borderColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fillContainer: {
        width: responsiveScreenWidth(91),
        flexDirection: "row-reverse",
    },
    stateContainer: {
        alignItems: "flex-end",
        flexDirection: "column",
        justifyContent: 'center',
    },
    stateText: {
        textAlign: "center",
        justifyContent: 'center',
        width: responsiveScreenWidth(12.6),
        height: responsiveScreenHeight(4.2),
        margin: responsiveScreenWidth(1.2),
        backgroundColor: "seashell",
        borderRadius: 10,
        fontWeight: "bold",
        fontSize: responsiveScreenFontSize(1.4),
        backgroundColor: "lightgrey",
    },

})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)