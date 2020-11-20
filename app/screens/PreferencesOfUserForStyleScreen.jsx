import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import { connect } from 'react-redux'
import { changeStyle } from '../src/action'
import apiKeys from '../src/api/apiKeys'
import { globalObject } from '../src/globalObject'

let colorsArry = ["#7f71e3", "#5d8aa8", "#191970", "#a4c139", "#ff2052", "#fe6f5e"]

const storeData = async (value, key) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log(e)
        // saving error
    }
}
function Main({ navigation, style, changeStyle }) {

    const [pickColor, setPickColor] = useState('');
    const handlerForSwich = (color) => {
        setPickColor(color)
        globalObject.SendRequest(apiKeys.userUpdateStyleUrl, { styles: { view: { backgroundColor: color } }, email: globalObject.User.email })
        changeStyle({ view: { backgroundColor: color } })
    }
    const renderListColors = () => {

        return colorsArry.map(color => (
            <TouchableOpacity key={color} onPress={() => handlerForSwich(color)}>


                <View style={{ ...styles.colorPicker, backgroundColor: color, borderColor: color === pickColor ? '#000' : pickColor, }}></View>
            </TouchableOpacity>
        ))

    }

    return (
        <View style={{ ...styles.view, ...style.view }}>
            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.buttonsContainer}>
                {renderListColors()}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    view: {
        //marginTop:50,
        flex: 1,
    }, colorPicker: {
        borderWidth: 1,
        margin: 1,
        width: 50,
        height: 50
    },
    buttonsContainer:
    {
        flex: 231,
        flexDirection: "row",
        margin: 10,
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
export default connect(mapStateToProps, { changeStyle })(Main)