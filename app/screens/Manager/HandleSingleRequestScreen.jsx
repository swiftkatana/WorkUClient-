import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import requestList from '../../src/api/apiKeys'
import { globalObject } from '../../src/globalObject'


export default function Main({Navigation}) {



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

                <View> 
                    <Text style={styles.header}>בקשה</Text>
                </View>
                
                <Text style={styles.subTitle}>תאריך: {date}</Text>
                <Text style={styles.subTitle}>סוג בקשה: {type}</Text>
                <Text style={styles.subTitle}>סטטוס: {status}</Text>
                <Text style={styles.bodyHeader}>פירוט:</Text>
                <Text style={styles.subTitle}>{text}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonOk}>
                        <Image style={styles.tinyLogo} source={require('../../assets/v_icon.png')}/>     
                        <Text style={styles.buttonText} >לאישור הבקשה</Text> 
                    </TouchableOpacity>      
                    <TouchableOpacity style={styles.buttonReject} >
                        <Image style={styles.tinyLogo} source={require('../../assets/x_icon.png')}/>
                        <Text style={styles.buttonText} >לדחיית הבקשה</Text> 
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
    bodyHeader:{
        marginRight:30,
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
    buttonContainer:{
    flexDirection:'row-reverse',
    marginTop: 20,
    marginLeft: 75,
    },
    buttonReject:{
        
        width: 100,
        //backgroundColor: "#eb4034",// #6357b5
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 10,

        
    },
    buttonOk:{
        
        width: 100,
        //backgroundColor: "#20bd57",// #6357b5
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 10,

        
    },

    buttonText:{
        fontSize: 12,
        fontWeight: '500',
        color: 'seashell',
        textAlign: 'center',
        fontWeight: 'bold',

    },
    tinyLogo:{
        width: 60,
        height: 60,
        marginHorizontal: 20,
        marginBottom: 10,
    
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
