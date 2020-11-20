import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { globalObject } from '../../src/globalObject'
import InfoList from '../../components/InfoList';
import { connect } from 'react-redux';


function Main({ navigation, style }) {

    const GetLen = () => {
        let len = 0;
        let keys = Object.keys(globalObject.User.personalRequests);
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
            if (request.status === "בטיפול")
                arr.push({ id: request._id, email: request.email, type: request.type, body: request.body, fullName: request.fullName, status: request.status, date: request.date });
        }
        return arr;
    }

    const render = ({ item }) => {
        return (
            <View>
                <TouchableOpacity style={styles.list} onPress={() => navigation.navigate("HandleSingleRequestScreen", { item })}>
                    <Text style={styles.listText}>תאריך: {item.date}</Text>
                    <Text style={styles.listText} >סוג הבקשה: {item.type}</Text>
                    <Text style={styles.employeeName}>שם עובד: {item.fullName}</Text>
                    <Image style={styles.tinyLogo} source={require('../../assets/arrow_icon_black.png')} />
                </TouchableOpacity>
            </View>
        )
    }


    return (
        <View style={{ ...styles.view, ...style.view }}>
            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.container}>

                <Text style={styles.title}>
                    בקשות לטיפול
                </Text>
                <InfoList render={render} GetLen={GetLen} GetList={GetList} emptyInfo={'אין בקשות לטפל'} opacity={0.1} src={require('../../assets/empty_icon.png')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    view:
    {
        flex: 1,

    },
    container: {
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
        height: 70,
        width: Dimensions.get('window').width - 40,
        backgroundColor: "seashell",
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
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)