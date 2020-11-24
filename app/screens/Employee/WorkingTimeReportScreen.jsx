import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { connect } from 'react-redux'
import { globalObject } from '../../src/globalObject'






const render = ({ item }) => {
    return (
        <View style={styles.list}>
            <Text style={styles.listText}>{item.date}</Text>
            <Text style={styles.listText}>{item.startTime}</Text>
            <Text style={styles.listText}>{item.endTime}</Text>
            <Text style={styles.listText}>{item.sumOfTime}</Text>

        </View>
    )
}

function Main({ navigation, style }) {
    const [sum, setSum] = useState(0)
    return (
        <View style={{ ...styles.view, ...style.view }}>
            <View style={styles.container}>

                <Text style={globalObject.styles.menuTitle}>
                    דו"ח שעות חודשי
                </Text>
                <View style={{ ...styles.mainListCon, ...style.btn2, borderColor: style.btn3.backgroundColor }}>
                    <View style={styles.header}>
                        <FlatList
                            data={[{ sumOfTime: "סך שעות", endTime: "שעת סיום", startTime: "שעת התחלה", date: "תאריך", id: "13" }]}
                            renderItem={render}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <View style={styles.listContainer}>
                        <FlatList

                            data={globalObject.User.workTimes}
                            renderItem={render}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
                {/* <Text style={styles.mainSum}>סה"כ שעות במצטבר לחודש זה: {sum}</Text> */}
                <TouchableOpacity style={styles.logo} onPress={() => navigation.navigate("ManualWorkingTime")}>
                    <Image style={styles.tinyLogo} source={require('../../assets/plus_icon_white.png')} />
                    <Text style={styles.btnText}>הוסף שעות ידנית</Text>
                </TouchableOpacity>
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainListCon: {
        height: responsiveScreenHeight(45),
        width: responsiveScreenWidth(90),
        backgroundColor: "#6f61ca",
        borderWidth: 1,
        borderColor: "#584DA1",
        borderRadius: 2,

    },
    listContainer: {
        //flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: responsiveScreenHeight(42),
        width: responsiveScreenWidth(90),
        marginTop: responsiveScreenHeight(0.5),
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        height: responsiveScreenHeight(5),
    },
    list:
    {
        height: responsiveScreenHeight(5),
        width: responsiveScreenWidth(90),
        backgroundColor: "seashell",
        flexDirection: "row-reverse",
        alignItems: 'center',
        textAlign: "center",
        justifyContent: 'center',
        borderRadius: 2,
        marginBottom: 1,
        borderWidth: 1,
        borderColor: "lightgray",
    },
    listText:
    {
        flex: 3,
        textAlign: "center",
        fontSize: responsiveScreenFontSize(1.7),//14
        },
    // mainSum:
    // {
    //     textAlign: 'center',
    //     margin: 20,
    //     fontSize: 22,
    //     color: "seashell",
    // },
    logo: {
        marginTop: responsiveScreenHeight(2),
        alignItems: 'center',
        justifyContent: 'center',

    },
    tinyLogo: {
        width: responsiveScreenHeight(4),
        height: responsiveScreenHeight(4),
        alignItems: 'center',
        justifyContent: 'center',

    },
    btnText: {
        marginTop: responsiveScreenHeight(1),
        color: "seashell",
        fontSize: responsiveScreenFontSize(1.7),//14
        fontWeight: 'bold',
    },
})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)