import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View, VirtualizedList } from 'react-native'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { globalObject } from '../../src/globalObject'
import InfoList from '../../components/InfoList'
import apiKeys from '../../src/api/apiKeys'
import { responsiveHeight } from 'react-native-responsive-dimensions'




function Main({ navigation, style }) {
    const [sum, setSum] = useState(0);
    const [sendTo, SetSendTo] = useState({});
    const [workTimes, setworkTimes] = useState([])

    const ButHandler = async (item) => {
        let res = await globalObject.SendRequest(apiKeys.getWorkTimesOfUser, { email: item.email });
        SetSendTo(item);
        if (res)
            setworkTimes(res);
    }


    const render2 = ({ item }) => {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.list2} onPress={() => ButHandler(item)}>

                    <Text style={styles.listText2}>שם: {item.firstName + " " + item.lastName}</Text>
                    <Image style={styles.tinyLogo2} source={require('../../assets/plus_icon_black.png')} />
                </TouchableOpacity>
            </View>
        )
    }


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
    if (GetLen() <= 0) {
        return (
            <KeyboardAvoidingView style={{ ...styles.view, ...style.view }} behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
                enabled={Platform.OS === "ios" ? true : false}>
                <View style={styles.container}>

                    <View>
                        <Text style={styles.title}>דו"ח שעות של עובד</Text>
                    </View>

                    <Image style={{ ...styles.emptyIcon, opacity: 1 }} source={require('../../assets/information_icon.png')} />
                    <Text style={styles.emptyText}>אין לך עובדים כרגע. להוספת עובדים לחץ על כפתור קוד גישה להוספת עובדים במסך הראשי</Text>
                    <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                        <Image style={styles.exitIcon} source={require('../../assets/exit_icon.png')} />
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        )
    }


    return (
        <View style={{ ...styles.view, ...style.view }}>
            <View style={styles.container}>

                <Text style={styles.title}>
                    דו"ח שעות של עובד
                </Text>
                <Text style={styles.subTitle}>בחר עובד: {sendTo.firstName ? sendTo.firstName + " " + sendTo.lastName : null}  </Text>
                <View style={{ ...styles.mainListCon2, ...style.btn2, borderColor: style.btn3.backgroundColor }}>

                    <View style={styles.listContainer2}>
                        <InfoList render={render2} GetLen={GetLen} GetList={GetList} emptyInfo={'אין לך עובדים כרגע. להוספת עובדים לחץ על כפתור קוד גישה להוספת עובדים במסך הראשי'} />
                    </View>
                </View>
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
                            data={workTimes}
                            renderItem={render}
                            keyExtractor={item => item.id}
                        />

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
        alignItems: 'center',
        justifyContent: 'center',


    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainListCon: {
        height: Dimensions.get('window').height / 4,
        width: Dimensions.get('window').width / 1.1,
        backgroundColor: "#6f61ca",
        borderWidth: 1,
        borderColor: "#584DA1",
        borderRadius: 2,

    },
    listContainer: {
        //flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height / 5 - 20,
        width: Dimensions.get('window').width / 1.1,
        marginTop: 10,
    },
    title:
    {

        textAlign: "center",
        width: Dimensions.get('window').width * 0.90,
        margin: 20,
        //marginRight: 30,
        fontSize: 42,
        color: "seashell",
        borderBottomWidth: 2,
        borderColor: "seashell",
    },
    subTitle: {
        fontSize: 24,
        color: "seashell",

    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height / 18,
        //height: 40,
        //marginBottom: 5,

    },
    list:
    {
        height: 40,
        width: Dimensions.get('window').width - 50,
        backgroundColor: "seashell",
        flexDirection: "row-reverse",
        alignItems: 'center',
        textAlign: "center",
        //marginLeft: 25,
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
        fontSize: 14,
    },
    mainSum:
    {
        //flexGrow: 1,
        textAlign: 'center',
        margin: 20,
        //marginBottom: 40,
        //marginRight: 30,
        fontSize: 22,
        color: "seashell",
    },
    status:
    {
        flex: 1,
        textAlign: "center",
        //marginRight: 15,
        fontSize: 14,
        fontWeight: "bold",
    },
    logo: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    tinyLogo: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        //marginBottom: 50,
        // marginRight: 30,
    },
    tinyLogo2: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        //marginBottom: 50,

    },
    mainListCon2: {
        height: Dimensions.get('window').height / 6,
        width: Dimensions.get('window').width / 1.3,
        backgroundColor: "#6f61ca",
        borderWidth: 1,
        borderColor: "#584DA1",
        borderRadius: 25,
        marginTop: 10,
        marginBottom: 15,
    },
    listContainer2: {
        alignItems: 'center',
        justifyContent: 'center',
        height: responsiveHeight(15),
        marginTop: 10,
    },
    list2: {
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
    listText2: {
        // flex:1,
        textAlign: "right",
        fontSize: 14,
    },
    btnText: {
        marginTop: 10,
        color: "seashell",
        fontSize: 14,
        fontWeight: 'bold',
    },
    exitButton:
    {
        paddingTop: 40,


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