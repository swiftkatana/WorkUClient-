import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Shifts from '../../components/Shifts'
import { globalObject } from '../../src/globalObject'
import CheckBox from '@react-native-community/checkbox';
export default function Main({ navigation }) {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.buttonsContainer}>
                <Text style={styles.title}>משמרות</Text>
                <Shifts navigation={navigation} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: "#7f71e3",
    },
    buttonsContainer:
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
    checkBoxContainer: {
        flex: 1,
        backgroundColor: 'seashell',
        margin: 20,
        marginVertical: 150,
        borderRadius: 30,
    },
    checkboxStyle: {

    },
    exitButton:
    {
        paddingTop: 60,
        marginLeft: 30,
    },
    exitText:
    {
        fontSize: 30,
        color: "seashell",

    }
})
