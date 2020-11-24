import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, Alert, Clipboard } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
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
        //height: responsiveScreenHeight(10),
        width: Dimensions.get('window').width,
        justifyContent: "center",
        alignItems: 'center',
        textAlign: "center",
        marginVertical: responsiveScreenHeight(1),
        marginTop: responsiveScreenHeight(3),
    },
    button: {
        width: Dimensions.get('window').width*0.6,
        borderRadius: 25,
        //marginVertical: responsiveScreenHeight(1),
        //marginHorizontal: responsiveScreenWidth(1),
        paddingVertical: responsiveScreenWidth(4),
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: responsiveScreenFontSize(1.4),
        fontWeight: '500',
        color: 'seashell',
        marginRight: responsiveScreenWidth(5),
        textAlign: 'right',
        fontWeight: 'bold',
    },
    tinyLogo: {
        position: "absolute",
        width: responsiveScreenHeight(7.5),
        height: responsiveScreenHeight(7.5),
        opacity: 0.8,
        marginLeft: responsiveScreenWidth(3),
    },
})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(CompanyCode)