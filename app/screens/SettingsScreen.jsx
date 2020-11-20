import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { globalObject } from '../src/globalObject'

function Main({ navigation, style }) {
    const logout = async () => {
        await removeValue('password');
        await removeValue('email');
        globalObject.User = {};
        navigation.navigate("LoginScreen");
    }
    const removeValue = async (key) => {
        try {
            await AsyncStorage.removeItem(key)
        } catch (e) {
            // remove error
        }
    }
    return (
        <View style={{ ...styles.view, ...style.view }}>
            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.buttonsContainer}>
                <Text style={styles.title}>הגדרות</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ChangePasswordScreen")}>
                    <Text style={styles.buttonText}>שינוי סיסמה</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PreferencesOfUserForStyleScreen")}>
                    <Text style={styles.buttonText}>ערכת נושא</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SelectionScreen")}>
                    <Text style={styles.buttonText}>עזרה</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={logout}>
                    <Text style={styles.buttonText}>יציאה</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        //marginTop:50,
        flex: 1,


    },
    buttonsContainer:
    {
        //paddingTop: 10,
        alignItems: 'flex-end',
    },
    button:
    {
        margin: 20,
        marginRight: 30,

    },
    buttonText:
    {
        fontSize: 16,
        color: "seashell",

    },
    title:
    {
        margin: 20,
        marginRight: 30,
        fontSize: 28,
        color: "seashell",
        textDecorationLine: "underline"

    },
    exitButton:
    {
        paddingTop: 60,
        //position:'absolute',
        marginLeft: 30,

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