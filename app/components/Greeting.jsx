import {Image, StyleSheet, Text, View,Dimensions,Button } from 'react-native'
import React, { Component,useEffect,useState } from 'react'
import {globalObject} from "../src/globalObject"
import { TouchableOpacity } from 'react-native-gesture-handler';

function GetGreetingMsg()
{
    var msg;
    var hours = new Date().getHours();
    if(hours >= 6 && hours < 12)
        msg = "בוקר טוב";
    else if(hours >= 12 && hours < 18)
        msg = "צהורים טובים";
    else if(hours >= 18 && hours < 23)
    msg = "ערב טוב";
    else
        msg = "לילה טוב";
    return msg;
            
}

export default function Greeting()
{
    const [GreetingMsg ,SetGreeting] = useState("");
    useEffect(() => {
        const id = setInterval(()=>{
        SetGreeting(GetGreetingMsg());
        }, 3600);
        SetGreeting(GetGreetingMsg());
        return () =>{clearInterval(id)};
    }, [])
    return (

        <View style={styles.view}>
        <Text style={styles.GreetingText}> {GreetingMsg},{globalObject.User.name}</Text>
        <TouchableOpacity style={styles.settings}>
        <Text style={styles.settingsFont}>הגדרות</Text> 
        </TouchableOpacity>
        </View>
        
    )

}


const styles = StyleSheet.create(
    {
        view:
        {
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 20,
            width: Dimensions.get('window').width,
            flexDirection:"row-reverse",
            justifyContent:"space-between",
            textAlign: "right",
            borderRadius:2,
            backgroundColor: "tomato",
            borderBottomRightRadius: 90,
            borderBottomLeftRadius: 5,

        },
        GreetingText:
        {
            fontSize:24,
            color: "seashell",
            fontWeight: "bold",
            paddingRight:20,
        },
        settings:
        {
          marginLeft:5,
          borderRadius:25,
          backgroundColor: "firebrick",
          width:80,
          height:60,
          justifyContent:'center',

        },
        settingsFont:
        {
            fontSize: 16,
            fontWeight: "bold",
            color:"seashell",
            textAlign: 'center',
        },
    }
)