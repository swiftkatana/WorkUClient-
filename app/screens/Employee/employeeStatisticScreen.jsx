import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { globalObject } from '../../src/globalObject'

export default function Main() 
{
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.exitButton} onPress={()=>globalObject.Navigation.pop()}>
                    <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.buttonsContainer}>
                <Text style={styles.title}>הסטטיסטיקות שלי</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view:
    {
        flex:1,
        backgroundColor: "#7f71e3",
    },
    buttonsContainer:
    {
        alignItems: 'flex-end',
    },

    title:
    {
        margin:20,
        marginRight:30,
        fontSize: 28,
        color: "seashell",
        textDecorationLine: "underline"
    },
    exitButton:
    {
        paddingTop: 60,
        marginLeft:30,     
    },
    exitText:
    {
        fontSize:30,
        color: "seashell",

    }
})
