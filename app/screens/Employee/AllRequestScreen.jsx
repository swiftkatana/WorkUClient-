import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalObject } from '../../src/globalObject';
import InfoList from '../../components/InfoList';






export default function Main() {
    const GetLen = () => {
        let keys = Object.keys(globalObject.User.personalRequests);
        let len = 0;
        for (let i = 0; i < keys.length; i++) {
            if (globalObject.User.personalRequests[keys[i]].status == "בטיפול")
                len++;
        }
        return len;
    }
    const GetList = () => {
        var arr = [];
        for (var obj in globalObject.User.personalRequests) {
            let request = globalObject.User.personalRequests[obj];
            arr.push({ id: request._id, email: request.email, type: request.type, body: request.body, fullName: request.fullName, status: request.status, date: request.date });
        }
        return arr;
    }

    const render = ({ item }) => {
        return (
            <View>
                <TouchableOpacity style={styles.list} onPress={() => globalObject.Navigation.navigate("DisplayRequestScreen", { item: item })}>
                    <Text style={styles.listText}>תאריך: {item.date}</Text>
                    <Text style={styles.listText} >סוג הבקשה: {item.type}</Text>
                    <Text style={styles.status}>סטטוס: {item.status}</Text>
                    <Image style={styles.tinyLogo} source={require('../../assets/arrow_icon_black.png')} />
                </TouchableOpacity>
            </View>
        )
    }



    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.exitButton} onPress={() => globalObject.Navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.container}>

                <Text style={styles.title}>
                    כל הבקשות
                </Text>
                <InfoList render={render} GetLen={GetLen} GetList={GetList} emptyInfo={'אין בקשות'} src={require('../../assets/empty_icon_white.png')} />
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
        height: 55,
        width: Dimensions.get('window').width - 40,
        backgroundColor: "seashell",
        flexDirection: "row-reverse",
        alignItems: 'center',
        textAlign: "center",
        marginHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 25,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "lightgray",
    },
    listText:
    {
        flex: 5,
        textAlign: "center",
        fontSize: 14,
        marginLeft: 5,
        marginRight: 10,
    },
    status:
    {
        flex: 3,
        textAlign: "center",
        marginRight: 10,
        fontSize: 14,
        fontWeight: "bold",
    },
    tinyLogo:
    {
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

    },
    tinyLogo: {
        width: 20,
        height: 20,
        marginLeft: 15,
        opacity: 0.7,

    },
})
