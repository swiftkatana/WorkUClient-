import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { globalObject } from '../src/globalObject'

export default function MainRequestScreen() {
    return (
        <View style={styles.view}>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.exitButton} onPress={()=>globalObject.Navigation.pop()}>
                    <Text style={styles.exitText}>X</Text>
                </TouchableOpacity>
                <Text style={styles.title}>הבקשות שלי</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>כל הבקשות</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>globalObject.Navigation.navigate("NewRequestScreen")}>
                    <Text style={styles.buttonText}>בקשה חדשה</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        //marginTop:50,
        flex:1,
        backgroundColor: "#bf3b49",
        
    },
    buttonsContainer:
    {
        paddingTop: 70,
    },
    button:
    {
        margin:20,
        marginRight:30,

    },
    buttonText:
    {
        fontSize: 16,
        color: "seashell",

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
        //paddingTop: 60,
        //position:'absolute',
        marginLeft:30,
        
    },
    exitText:
    {
        fontSize:30,
        color: "seashell",

    }
})
