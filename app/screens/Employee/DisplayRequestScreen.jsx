import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import requestList from '../../src/api/apiKeys'
import { globalObject } from '../../src/globalObject'


export default function Main({ navigation }) {

    const item = navigation.state.params.item;
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.container}>

                <View >
                    <Text style={styles.header}>בקשה</Text>
                </View>
                <Text style={styles.subTitle}>תאריך: {item.date}</Text>
                <Text style={styles.subTitle}>סוג בקשה: {item.type}</Text>
                <Text style={styles.subTitle}>סטטוס: {item.status}</Text>
                <Text style={styles.bodyHeader}>פירוט:</Text>
                <Text style={styles.subTitle}>{item.body}</Text>
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
    container:
    {
        alignItems: 'flex-end',
    },
    header:
    {
        margin: 20,
        marginRight: 30,
        fontSize: 28,
        color: "seashell",
        textDecorationLine: "underline"

    },
    subTitle:
    {
        marginRight: 30,
        marginLeft: 30,
        fontSize: 16,
        color: "seashell",


    },
    bodyHeader: {
        marginRight: 30,
        marginLeft: 30,

        fontSize: 16,
        color: "seashell",
        marginTop: 30,

    },
    itemList:
    {
        textAlign: "right",
        width: 300,
        textAlign: 'right',
        justifyContent: 'center',


    },
    button: {
        width: 300,
        backgroundColor: "#6f61ca",// #6357b5
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 30,


    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'seashell',
        textAlign: 'center',
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
