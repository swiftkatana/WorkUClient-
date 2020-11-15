import React, { useState } from 'react'
import { Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import {Picker} from '@react-native-community/picker';
import requestList from '../../src/api/apiKeys'
import { globalObject } from '../../src/globalObject'

var arr = [{employeeName:"קורל בר-און",id:"1"},
{employeeName:"קורל בר-און",id:"2"},
{employeeName:"קורל בר-און",id:"3"},
{employeeName:"קורל בר-און",id:"4"},
{employeeName:"קורל בר-און",id:"5"},
{employeeName:"קורל בר-און",id:"6"},
{employeeName:"קורל בר-און",id:"7"},
{employeeName:"קורל בר-און",id:"8"},

 ]


const render = ({item})=>
{
    return(   
     <View>
        <TouchableOpacity style={styles.list}>
            <Text style={styles.listText}>שם: {item.employeeName}</Text>
            <Image style={styles.tinyLogo} source={require('../../assets/arrow_icon_black.png')}/>
        </TouchableOpacity>
     </View>
    )    
} 

export default function Main()
 {
    const [priority, SetPriority] = useState("");
    const [header, SetHeader] = useState("");
    const [text, SetText] = useState("");
    return (
        <KeyboardAvoidingView style={styles.view} behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
        enabled={Platform.OS === "ios" ? true : false}>
            <TouchableOpacity style={styles.exitButton} onPress={()=>globalObject.Navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.container}>

                <View> 
                    <Text style={styles.header}>משימה חדשה</Text>
                </View>
                <Text style={styles.subTitle}>תייג עובד: </Text>
                <FlatList style={styles.test}
                data={arr}
                renderItem={render}
                keyExtractor={item => item.id}
                />
                <View style={styles.inputBoxContainer}>
                    <TextInput
                    style={styles.shortInputBox}
                    onChangeText={header => SetHeader(header)}
                    value={header}
                    placeholder= 'תקציר המשימה'
                    />
                </View>
                <View style={styles.inputBoxContainer}>
                    <TextInput
                    style={styles.inputBox}
                    onChangeText={text => SetText(text)}
                    value={text}
                    placeholder= 'פירוט המשימה (אופציונלי)'
                    />
                </View>
                <View style={styles.picker}>
                    <Text style={styles.subTitle}>דחיפות:</Text>
                    <Picker 
                        prompt='test' 
                        mode='dropdown' 
                        selectedValue={priority} 
                        style={styles.itemList} 

                        onValueChange={(itemValue) => SetType(itemValue)}>
                        
                        <Picker.Item   label="גבוהה" value="" />
                        <Picker.Item   label="בינונית" value="" />
                        <Picker.Item   label="נמוכה" value="העלאה בשכר" />
                    </Picker>
                </View>


                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} >שלח בקשה</Text> 
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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
        flex:1,
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
        marginBottom: 10,
        

    },
    list:
    {
        flex: 1,
        height: 35,
        width:Dimensions.get('window').width-160,
        backgroundColor:"seashell",
        flexDirection:"row-reverse",
        alignItems: 'center',
        textAlign: "center",
        marginHorizontal: 35,
        justifyContent: 'center',
        borderRadius:15,
        marginBottom:2,
        borderWidth:1,
        borderColor: "lightgray",
    },
    listText:
    {   flex:5,
        textAlign:"center",
        fontSize: 14,
        marginLeft: 5,
        marginRight: 10,
    },

    tinyLogo:
    { 
        width: 20,
        height: 20,
        marginLeft: 15,
        marginRight: 10,
    },
    picker:{
        flexGrow: 3,
        textAlign: 'right',
        justifyContent: 'center',
        marginTop: 5,
       

    },
    itemList:
    {
        width: 200,
        color:"#ffffff",
        textAlign: 'right',
        justifyContent: 'center',
            
    },
    pickerItem:{
        color: "#00ffff",

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
    shortInputBox:{
        width: 300,
        height: 60,
        backgroundColor: '#ededed',
        borderRadius: 20,
        paddingHorizontal: 16,
        marginVertical: 10,
        textAlign: "right"
    },
    button:{
        width: 300,
        backgroundColor: "#6f61ca",// #6357b5
        borderRadius: 25,
        marginBottom: 120,
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
