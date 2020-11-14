import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Picker } from 'react-native-picker-dropdown'
import { userSendPersonalRequest } from '../src/api/apiKeys'
import { globalObject } from '../src/globalObject'


export default function DisplayRequestScreen() {



    const [date, SetDate] = useState("15.1.20");
    const [type, SetType] = useState("חופש");
    const [status, SetStatus] = useState("בטיפול");
    const [text, SetText] = useState("אני רוצה לצאת לחופש בימים בלה בלה ובלה ואני סיימתי את כל המשימות שלי אז הכל טוב וזה ");
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.exitButton} onPress={()=>globalObject.Navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.container}>

                <View > 
                    <Text style={styles.header}>בקשה</Text>
                </View>
                <Text style={styles.subTitle}>תאריך: {date}</Text>
                <Text style={styles.subTitle}>סוג בקשה: {type}</Text>
                <Text style={styles.subTitle}>סטטוס: {status}</Text>
                <Text style={styles.bodyHeader}>פירוט:</Text>
                <Text style={styles.subTitle}>{text}</Text>


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
    container:
    {  
        alignItems: 'flex-end',
    },
    header:
    {
        margin:20,
        marginRight:30,
        fontSize: 28,
        color: "seashell",
        textDecorationLine: "underline"
       
    },
    subTitle:
    {
        marginRight:30,
        marginLeft:30,
        fontSize: 16,
        color: "seashell",
        

    },
    bodyHeader:{
        marginRight:30,
        marginLeft:30,

        fontSize: 16,
        color: "seashell",
        marginTop: 30,

    },
    itemList:
    {
        textAlign:"right",
        width: 300,
        textAlign: 'right',
        justifyContent: 'center',

            
    },
    button:{
        width: 300,
        backgroundColor: "#6f61ca",// #6357b5
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 30,

        
    },

    buttonText:{
        fontSize: 16,
        fontWeight: '500',
        color: 'seashell',
        textAlign: 'center',
    },
    exitButton:
    {
        marginLeft: 30,
        paddingTop: 60,

    },
    exitText:
    {
        fontSize:30,
        color: "seashell",

    }

})
