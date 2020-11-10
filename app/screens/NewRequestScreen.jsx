import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Picker } from 'react-native-picker-dropdown'
import { userSendPersonalRequest } from '../src/api/apiKeys'
import { globalObject } from '../src/globalObject'

// send {type,body,fullName,email}
// recive {_id,}
const SendTask = async (type,body)=>
{   
    res = await globalObject.SendRequest(userSendPersonalRequest,{type:type,body:body,fullName:globalObject.User.fullName,email:globalObject.User.email})
    if(res.error)
    {

    }
    else
    {

    }

}

export default function NewRequestScreen() {

    const [type, SetType] = useState("חולי");
    const [text, SetText] = useState("");
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.exitButton} onPress={()=>globalObject.Navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.container}>

                <View> 
                    <Text style={styles.header}>בקשה חדשה</Text>
                </View>

                <View style={styles.picker}>
                    <Text style={styles.subTitle}>סוג הבקשה</Text>
                    <Picker selectedValue={type} style={styles.itemList} onValueChange={(itemValue) => SetType(itemValue)}>
                        <Picker.Item  style={styles.pickerItem} label="חולי" value="java" />
                        <Picker.Item  style={styles.pickerItem}  label="חופש" value="js" />
                    </Picker>
                </View>

                <View style={styles.inputBoxContainer}>
                    <TextInput
                    style={styles.inputBox}
                    onChangeText={text => SetText(text)}
                    value={text}
                    placeholder= 'גוף הבקשה (אופציונלי)'
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={()=>SendTask(type,text)}>
                    <Text style={styles.buttonText} >שלח בקשה</Text> 
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view:
    {
        flex:1,
        backgroundColor: "#bf3b49",

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
        fontSize: 16,
        color: "seashell",

    },
    picker:{
        
    },
    itemList:
    {
        textAlign:"right",
            
    },
    pickerItem:{

        fontSize: 16,
        color: "green",
    },
    inputBoxContainer:{
        marginRight:30,
    },
    inputBox:{
        width: 300,
        height: 100,
        backgroundColor: '#ededed',
        borderRadius: 25,
        paddingHorizontal: 16,
        marginVertical: 10,
        textAlign: "right"
    },
    button:{
        width: 300,
        backgroundColor: "#a22434",
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
