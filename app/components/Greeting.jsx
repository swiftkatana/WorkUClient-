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
        <Text style={{fontSize:25}}> {GreetingMsg},{globalObject.User.name}</Text>
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
            height: 70,
            width: Dimensions.get('window').width,
            flexDirection:"row-reverse",
            justifyContent:"space-between",
        },
        settings:
        {
        
          marginLeft:5,
          borderRadius:30,
          backgroundColor:"#00ff00",
          width:60,
          height:60,
           
        },
        settingsFont:
        {
            marginTop:15,
            textAlign:"center",
        },
    }
)