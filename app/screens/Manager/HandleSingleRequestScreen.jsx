import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import requestList from '../../src/api/apiKeys'
import { globalObject } from '../../src/globalObject'


function Main({ navigation, style }) {

    const pressHandler = async (_id, status, email) => {
        const res = await globalObject.SendRequest(requestList.updatePersonalRequestUrl, { _id, status, email });
        if (res) {
            globalObject.sendNotification(email, res, 'כנס לבקשות שלי', 'בקשה אישית עודכנה', 'updatePersonalReq');
            globalObject.User.personalRequests[res._id] = res;
            navigation.pop();
        }
    }

    const item = navigation.state.params.item;
    return (
        <View style={{ ...styles.view, ...style.view }}>
            <View style={styles.container}>

                <View>
                    <Text style={styles.title}>בקשה</Text>
                </View>
                <View style={styles.requestContainer}>
                        <Text style={styles.subTitle}>תאריך: {item.date}</Text>
                        <Text style={styles.subTitle}>סוג בקשה: {item.type}</Text>
                        <Text style={styles.subTitle}>שם עובד: {item.fullName}</Text>
                        <Text style={styles.bodyHeader}>פירוט:</Text>
                        <Text style={styles.subTitle}>{item.body}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonOk} onPress={() => pressHandler(item.id, "אושר", item.email)}>
                        <Image style={styles.tinyLogo} source={require('../../assets/v_icon.png')} />
                        <Text style={styles.buttonText} >לאישור הבקשה</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonReject} onPress={() => pressHandler(item.id, "נדחה", item.email)}>
                        <Image style={styles.tinyLogo} source={require('../../assets/x_icon.png')} />
                        <Text style={styles.buttonText} >לדחיית הבקשה</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                    <Image style={styles.exitIcon} source={require('../../assets/exit_icon.png')} />
            </TouchableOpacity>
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
    container:
    {
        alignItems:'center',
        justifyContent: 'center',

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
    requestContainer:{
        alignItems:'center',
        justifyContent: 'center',
        borderWidth:2,
        borderColor: "grey",
        borderRadius:30,
        width: Dimensions.get('window').width*0.80,
        height: Dimensions.get('window').height*0.30,
        backgroundColor: "seashell",

    },
    subTitle:
    {
        //marginRight: 30,
        fontSize: 18,
        color: "black",

    },
    bodyHeader: {
        //marginRight: 30,
        fontSize: 18,
        color: "black",
        marginTop: 10,
        alignItems:'center',
        justifyContent: 'center',
    },
    itemList:
    {
        textAlign: "center",
        width: Dimensions.get('window').width*0.70,
        justifyContent: 'center',


    },
    buttonContainer: {
        flexDirection: 'row-reverse',
        //marginTop: 20,
    },
    buttonReject: {

        width: 100,
        //backgroundColor: "#eb4034",// #6357b5
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 10,


    },
    buttonOk: {

        width: 100,
        //backgroundColor: "#20bd57",// #6357b5
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 10,


    },

    buttonText: {
        fontSize: 12,
        fontWeight: '500',
        color: 'seashell',
        textAlign: 'center',
        fontWeight: 'bold',

    },
    tinyLogo: {
        width: 60,
        height: 60,
        marginHorizontal: 20,
        marginBottom: 10,

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