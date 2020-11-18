import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { globalObject } from '../../src/globalObject'



var arr = []

const render = ({ item }) => {
    return (
        <View>
            <TouchableOpacity style={styles.list} onPress={() => globalObject.Navigation.navigate("HandleSingleRequestScreen", { item })}>
                <Text style={styles.listText}>תאריך: {item.date}</Text>
                <Text style={styles.listText} >סוג הבקשה: {item.type}</Text>
                <Text style={styles.employeeName}>שם עובד: {item.fullName}</Text>
                <Image style={styles.tinyLogo} source={require('../../assets/arrow_icon_black.png')} />
            </TouchableOpacity>
        </View>
    )
}

export default function Main() {


    const [requests, UpdateRequests] = useState([])
    const [shouldShow, setShouldShow] = useState(false);
    const [currentLen, UpdateCurrentLen] = useState(0);

    useEffect(() => {
        var arr = [];
        const handle = setInterval(() => {
            if (globalObject.User.tasks.processing) {
                let len = Object.keys(globalObject.User.personalRequests).length;
                if (currentLen != len)
                    UpdateCurrentLen(len);
            }
        }, 1000);

        for (var obj in globalObject.User.personalRequests) {
            let request = globalObject.User.personalRequests[obj];
            arr.push({ id: request._id, email: request.email, type: request.type, body: request.body, fullName: request.fullName, status: request.status, date: request.date });
        }
        if (arr.length == 0) {
            setShouldShow(true);
        } else {
            setShouldShow(false);
        }
        UpdateRequests(arr);
        arr = [];

        return () => {
            clearInterval(handle);
        }
    }, [currentLen])



    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.exitButton} onPress={() => globalObject.Navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.container}>

                <Text style={styles.title}>
                    בקשות לטיפול
                </Text>
                <FlatList
                    data={requests}
                    renderItem={render}
                    keyExtractor={item => item.id}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    view:
    {
        flex: 1,
        backgroundColor: "#7f71e3",
        //alignItems: 'center',
    },
    container: {
        //paddingTop: 70,
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
    list:
    {
        //borderWidth: 1,
        height: 70,
        width: Dimensions.get('window').width - 40,
        backgroundColor: "seashell",
        //backgroundColor:"white",
        flexDirection: "row-reverse",
        alignItems: 'center',
        textAlign: "center",
        marginHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 25,
        marginBottom: 6,
        borderWidth: 1,
        borderColor: "lightgray",


    },
    listText:
    {
        flex: 3,
        textAlign: "center",
        fontSize: 14,
        marginLeft: 5,
        marginRight: 10,


    },
    employeeName:
    {
        flex: 3,
        textAlign: "center",
        marginRight: 10,
        fontSize: 14,
        fontWeight: "bold",

    },
    tinyLogo: {

        width: 20,
        height: 20,
        marginLeft: 15,
        marginRight: 10,
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
