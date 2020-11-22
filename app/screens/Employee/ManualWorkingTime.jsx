import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { globalObject } from '../../src/globalObject'

function Main({ navigation, style }) {
    return (
        <View style={{ ...styles.view, ...style.view }}>
            <View style={styles.buttonsContainer}>
                <Text style={styles.title}>הוספת שעות</Text>
                <View style={styles.infoConteiner}>
                    <Image style={styles.tinyLogo} source={require('../../assets/information_icon.png')} />

                    <View style={{ ...styles.infoTextConteiner, ...style.btn2 }}>
                        <Text style={styles.infoText}>שים לב, שעות העבודה נוספות באופן אוטומטי לדו"ח החודשי כאשר אתה מפעיל את שעון העבודה שבמסך הראשי.</Text>
                    </View>
                </View>
                <TextInput style={styles.inputBox} placeholder="תאריך. דוגמה: 1.1.19" />
                <TextInput style={styles.inputBox} placeholder="שעת התחלה" />
                <TextInput style={styles.inputBox} placeholder="שעת סיום" />
                <TouchableOpacity style={{ ...styles.button, ...style.btn2 }}>
                    <Text style={styles.buttonText}>כניסה</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                    <Image style={styles.exitIcon} source={require('../../assets/exit_icon.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        //marginTop:50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',


    },
    buttonsContainer:
    {
        //paddingTop: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 300,

        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 20,
        marginHorizontal: 45,

    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'seashell',
        textAlign: 'center',
    },
    infoConteiner: {
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',


    },
    infoTextConteiner: {
        textAlign: 'center',
        padding: 10,
        //marginHorizontal: 82,
        marginRight: 35,
        marginLeft: 55,

        borderRadius: 20,
        //borderEndWidth: 1,
        //borderStartWidth: 1,
        borderWidth: 1,
        //right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "seashell",

    },
    infoText: {
        fontSize: 11,
        color: "seashell",
        fontWeight: 'bold',
        textAlign: 'center',

    },
    tinyLogo: {
        width: 20,
        height: 20,
        //alignItems: 'center',
        //justifyContent: 'center',
        //marginBottom: 50,
        //marginRight: 10,
        //marginTop: 14,
        left: 30,
        bottom: 2,
        zIndex: 5,

    },
    inputBox: {
        width: 300,
        height: 60,
        backgroundColor: '#ededed',
        borderRadius: 25,
        paddingHorizontal: 16,
        marginVertical: 10,
        marginHorizontal: 45,
        textAlign: "right",
        justifyContent: 'center',
        alignItems: 'center',

    },
    title:
    {

        textAlign: "center",
        width: Dimensions.get('window').width * 0.80,
        margin: 20,
        //marginRight: 30,
        fontSize: 48,
        color: "seashell",
        borderBottomWidth: 2,
        borderColor: "seashell",
    },
    exitButton:
    {
        paddingTop: 40,


    },
    exitIcon: {
        height: 50,
        width: 50,
    },

})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)