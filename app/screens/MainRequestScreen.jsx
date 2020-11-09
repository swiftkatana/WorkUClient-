import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { globalObject } from '../src/globalObject'

export default function MainRequestScreen() {
    return (
        <View style={styles.view}>

            <TouchableOpacity style={styles.exitButton} onPress={()=>globalObject.Navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={()=>globalObject.Navigation.navigate("AllRequestScreen")}>
                <Text>כל הבקשות</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>globalObject.Navigation.navigate("NewRequestScreen")}>
                <Text>בקשה חדשה1</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        marginTop:50,
        flex:1,
        
    },
    button:
    {
        margin:20,
    },
    exitButton:
    {
        position:'absolute',
        marginLeft:10,
        
    },
    exitText:
    {
        fontSize:30,
    }
})
