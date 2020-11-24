import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { connect } from 'react-redux'
import { globalObject } from '../../src/globalObject'

function Main({ navigation, style }) {
    return (
        <View style={{ ...styles.view, ...style.view }}>
            <View style={styles.buttonsContainer}>
                <Text style={globalObject.styles.menuTitle}>הוספת שעות</Text>
                <View style={styles.infoConteiner}>
                    <Image style={styles.tinyLogo} source={require('../../assets/information_icon.png')} />

                    <View style={{ ...styles.infoTextConteiner, ...style.btn2 }}>
                        <Text style={styles.infoText}>שים לב, שעות העבודה נוספות באופן אוטומטי לדו"ח החודשי כאשר אתה מפעיל את שעון העבודה שבמסך הראשי.</Text>
                    </View>
                </View>
                <TextInput style={globalObject.styles.regInputBox} placeholder="תאריך. דוגמה: 1.1.19" />
                <TextInput style={globalObject.styles.regInputBox} placeholder="שעת התחלה" />
                <TextInput style={globalObject.styles.regInputBox} placeholder="שעת סיום" />
                <TouchableOpacity style={{ ...globalObject.styles.regButton, ...style.btn2 }}>
                    <Text style={globalObject.styles.regButtonText}>כניסה</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalObject.styles.exitButton} onPress={() => navigation.pop()}>
                    <Image style={globalObject.styles.exitIcon} source={require('../../assets/exit_icon.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoConteiner: {
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    infoTextConteiner: {
        textAlign: 'center',
        padding: responsiveScreenWidth(1),
        //marginHorizontal: 82,
        marginRight: responsiveScreenWidth(10),
        marginLeft: responsiveScreenWidth(12),
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "seashell",
    },
    infoText: {
        fontSize: responsiveScreenFontSize(1.4),//14
        color: "seashell",
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tinyLogo: {
        width: responsiveScreenHeight(3),
        height: responsiveScreenHeight(3),
        left: responsiveScreenWidth(8),
        bottom: responsiveScreenHeight(0.2),
        zIndex: 5,

    },
})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)