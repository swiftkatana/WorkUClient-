import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
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
                    <Text style={globalObject.styles.menuTitle}>בקשה</Text>
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
            <TouchableOpacity style={globalObject.styles.exitButton} onPress={() => navigation.pop()}>
                    <Image style={globalObject.styles.exitIcon} source={require('../../assets/exit_icon.png')} />
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
    requestContainer:{
        alignItems:'center',
        justifyContent: 'center',
        borderWidth:1,
        borderColor: "grey",
        borderRadius:30,
        width: Dimensions.get('window').width*0.80,
        height: Dimensions.get('window').height*0.30,
        backgroundColor: "seashell",

    },
    subTitle:
    {
        //marginRight: 30,
        fontSize: responsiveScreenFontSize(2.2),//18
        color: "black",
    },
    bodyHeader: {
        fontSize: responsiveScreenFontSize(2.2),//18
        color: "black",
        marginTop: responsiveScreenHeight(1),
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
        width: responsiveScreenWidth(60),
        height: responsiveScreenHeight(15),
        flexDirection: 'row-reverse',
        justifyContent:'space-evenly',
        alignItems:'center',
    },
    buttonText: {
        fontSize: responsiveScreenFontSize(1.5),
        fontWeight: '500',
        color: 'seashell',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    tinyLogo: {
        width: responsiveScreenHeight(6.5),
        height: responsiveScreenHeight(6.5),
        marginHorizontal: 20,
        marginBottom: responsiveScreenHeight(1),
    },


})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)