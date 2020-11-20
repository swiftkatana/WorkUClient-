import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, Alert, Clipboard } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
//import Clipboard from '@react-native-community/clipboard';
import { globalObject } from "../src/globalObject"

const copyToClipboard = () => {
    Clipboard.setString(globalObject.User.joinCode);
};

const pressHandler = () => {
    title = "קוד גישה";
    msg = "שים לב יש להעביר קוד זה לעובדים על מנת שיוכלו להתחבר לבית העסק שלך."
    alertButton = [
        { text: "העתק קוד גישה לשורת ההקלדה", onPress: () => copyToClipboard() }
    ];
    Alert.alert(title, msg, alertButton, { cancelable: false });

}



function CompanyCode({ style }) {

    return (
        <View style={styles.view}>
            <TouchableOpacity style={{ ...styles.button, ...style.btn1 }} onPress={pressHandler}>
                <Text style={styles.buttonText}>קוד גישה להוספת עובדים</Text>
                <Image style={styles.tinyLogo} source={require('../assets/employee_icon.png')} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    view:
    {
        flex: 1.5,
        height: 70,
        width: Dimensions.get('window').width,
        //flexDirection:"row-reverse",
        justifyContent: "center",
        //paddingHorizontal: 10,
        alignItems: 'center',
        textAlign: "center",
        marginVertical: 10,
        marginTop: 20,


    },


    button: {
        width: Dimensions.get('window').width - 170,
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingVertical: 16,
        //alignItems:'flex-start',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 11,
        fontWeight: '500',
        color: 'seashell',
        marginRight: 18,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    tinyLogo: {
        position: "absolute",
        width: 58,
        height: 58,
        opacity: 0.8,
        marginLeft: 10,
        //alignItems: 'flex-end',
        //justifyContent: 'flex-end',
        //marginBottom: 40,
        //marginRight: 12,
        //zIndex: 5,

    },




})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(CompanyCode)