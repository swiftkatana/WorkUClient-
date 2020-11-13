import CheckBox from '@react-native-community/checkbox';
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { globalObject } from '../src/globalObject'
//import { CheckBox } from 'react-native-elements'; // 0.16.0

export default function UpdateTaskScreen() {

    const [type, SetType] = useState("חולי");
    const [text, SetText] = useState("");
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.exitButton} onPress={()=>globalObject.Navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                <View> 
                    <Text style={styles.header}>משימה</Text>
                </View>
                <View> 
                    <Text style={styles.subHeader}>פרטים</Text>
                </View>
                <View> 
                    <Text style={styles.subHeader}>שליחת עדכון</Text>
                </View>
                <View style={styles.inputBoxContainer}>
                    <TextInput
                    style={styles.inputBox}
                    onChangeText={text => SetText(text)}
                    value={text}
                    placeholder= 'גוף הבקשה (אופציונלי)'
                    />
                </View>
                <CheckBox
                    //title ='המשימה בוצעה'
                    //checked={this.state.checked}
                    //onPress={() => this.setState({checked: !this.state.checked})}
                />

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
    subHeader:{
        margin:20,
        marginRight:30,
        fontSize: 16,
        color: "seashell",
        //textDecorationLine: "underline"
        fontWeight:"bold",
    },
    itemList:
    {
        textAlign:"right",
        width: 300,
        textAlign: 'right',
        justifyContent: 'center',

            
    },
    inputBoxContainer:{
        marginHorizontal:20,
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
        backgroundColor: "#6f61ca",// #6357b5
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 20,

        
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
