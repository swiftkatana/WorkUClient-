import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import {Picker} from '@react-native-community/picker';
import { globalObject } from '../src/globalObject'




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

export default function UpdateTaskScreen() {
    const [type, SetType] = useState("חולי");

    const [priority, SetPriority] = useState("דחוף");
    const [title, SetTitle] = useState("חיכעיכעיכע עכ יכע כע כע כופש");
    const [text, SetText] = useState("אני רוצה לצאת לחופש בימים בלה בלה ובלהיעכיכעיכעיכעיכעיכעיעכחעיחעיחעיחיעחעיחעיחיעחעוטאואטואטואטוטאואטואחעיחעיחעיחעיחעיחעיחעיחעיחעיחעיחעיחיעחיעחעיחעיחעיחעיחעיחחעיחעיחעיחעיחעיחעיחעיחעיחעיחעיחעיחעיחעייכע ואני סיימתי את כל המשימות שלי אז הכל טוב וזה ");
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.exitButton} onPress={()=>globalObject.Navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.container}>
            <View style={styles.infoContainer}>
                    <View > 
                        <Text style={styles.header}>משימה</Text>
                    </View>
                    <Text style={styles.subTitle}>דחיפות: {priority}</Text>
                    <Text style={styles.subTitle}>תקציר: {title}</Text>
                    <Text style={styles.bodyHeader}>פירוט:</Text>
                    <Text style={styles.subTitle}>{text}</Text>
            </View>


                <View style={styles.inputBoxContainer}>
                    <TextInput
                    style={styles.inputBox}
                    placeholder= 'גוף הבקשה (אופציונלי)'
                    />
                </View>
                <View style={styles.picker}>
                    <Text style={styles.subTitle}>סטטוס משימה:</Text>
                    
                    <Picker prompt='test' mode='dropdown' selectedValue={type} style={styles.itemList} onValueChange={(itemValue) => SetType(itemValue)}>
                        <Picker.Item  style={styles.pickerItem}  label="המשימה הושלמה" value="המשימה הושלמה" />
                        <Picker.Item  style={styles.pickerItem}  label="המשימה לא הושלמה" value="המשימה לא הושלמה" />
                    </Picker>
                    <TouchableOpacity style={styles.button} onPress={()=>SendTask(type,text)}>
                    <Text style={styles.buttonText} >שלח עדכון</Text> 
                    </TouchableOpacity>
                </View>
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
        flex: 1,

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
    infoContainer:{
        flex: 2,
            //marginRight:30,
            //marginLeft:30,
    },
    inputBoxContainer:{
        flex: 1,
            //marginRight:30,
            //marginLeft:30,
        },
        inputBox:{
            width: 300,
            height: 100,
            backgroundColor: '#ededed',
            borderRadius: 25,
            //paddingHorizontal: 16,
            marginVertical: 60,
            marginHorizontal: 30,
            textAlign: "right",

        },
        picker:{
            flex:2,
            textAlign: 'right',
            justifyContent: 'center',
    
        },
        itemList:
        {
            textAlign:"right",
            width: 300,
            textAlign: 'right',
            justifyContent: 'center',
    
                
        },
        pickerItem:{
    
            fontSize: 16,
            color: "green",
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
