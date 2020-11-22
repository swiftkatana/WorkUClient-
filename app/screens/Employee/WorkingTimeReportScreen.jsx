import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
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

                <Text style={styles.title}>
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
        height: Dimensions.get('window').height / 2.5,
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
        height: Dimensions.get('window').height / 2.5 - 20,
        width: Dimensions.get('window').width / 1.1,
        marginTop: 10,
    },
    title:
    {

        textAlign: "center",
        width: Dimensions.get('window').width * 0.90,
        margin: 20,
        //marginRight: 30,
        fontSize: 48,
        color: "seashell",
        borderBottomWidth: 2,
        borderColor: "seashell",
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