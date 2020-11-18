import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
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

export default function Main() {
    const [sum, setSum] = useState(0)
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.exitButton} onPress={() => globalObject.Navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.container}>

                <Text style={styles.title}>
                    דו"ח שעות חודשי
                </Text>
                <View style={styles.header}>
                    <FlatList
                        data={[{ sumOfTime: "סך שעות", endTime: "שעת סיום", startTime: "שעת התחלה", date: "תאריך", id: "13" }]}
                        renderItem={render}
                        keyExtractor={item => item.id}
                    />
                </View>
                <FlatList

                    data={globalObject.User.workTimes}
                    renderItem={render}
                    keyExtractor={item => item.id}
                />
                <Text style={styles.mainSum}>סה"כ שעות עבודה במצטבר לחודש זה: {sum}</Text>
                <TouchableOpacity style={styles.logo} onPress={() => globalObject.Navigation.navigate("ManualWorkingTime")}>
                    <Image style={styles.tinyLogo} source={require('../../assets/plus_icon.png')} />

                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    view:
    {
        flex: 1,
        backgroundColor: "#7f71e3",
    },
    container: {
        flex: 1,
        alignItems: 'flex-end',
    },
    title:
    {
        margin: 20,
        marginRight: 30,
        fontSize: 28,
        color: "seashell",
        textDecorationLine: "underline"

    },
    header: {
        height: 40,
        marginBottom: 5,
        borderColor: "lightgray",

    },
    list:
    {
        height: 42,
        width: Dimensions.get('window').width - 50,
        backgroundColor: "seashell",
        flexDirection: "row-reverse",
        alignItems: 'center',
        textAlign: "center",
        marginLeft: 25,
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
        flexGrow: 1,
        margin: 20,
        marginBottom: 40,
        marginRight: 30,
        fontSize: 16,
        color: "seashell",
    },
    status:
    {
        flex: 1,
        textAlign: "center",
        marginRight: 15,
        fontSize: 14,
        fontWeight: "bold",
    },
    logo: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    tinyLogo: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        marginRight: 30,
    },
    exitButton:
    {
        marginLeft: 30,
        paddingTop: 60,

    },
    exitText:
    {
        fontSize: 30,
        color: "seashell",

    }
})
