import React from "react"
import {Image, StyleSheet, Text, View } from 'react-native'
import {globalData} from "../src/test";


export default function ProfileScreen(props) {

 


   const IsReqestProfile=()=>
    {
        if(props.IsRequest == true)
        {
            return (
                <View>

                </View>

            )
        }
        else
        {
        return (

            <View>
            <Text style={styles.info}>שם מלא:  {props.info.fullName}</Text>
            <Text style={styles.info}>סוג תפקיד:  {props.info.role}</Text>
            <Text style={styles.info}>מייל:  {props.info.email}</Text>
            <Image style={styles.Img} source={ {uri:props.info.imageProfile}}/>
            <Text style={styles.info}>שם החברה:  {props.info.company.name}</Text>
            <Text style={styles.info}>מצב:  {props.info.company.status}</Text>
            <Text style={styles.info}>נסיון:  {globalData.id}</Text>
            </View>
            
        )
        }
    }


    return (
        <View style={styles.continer}>
            {IsReqestProfile()}
        </View>
    )
}

const styles = StyleSheet.create({
continer:
{
    paddingTop :50,
},
info:
{
    fontSize:15,
    textAlign:"right",
    
},
Img:
{
    marginTop:40,
    position : "absolute",
    height :50,
    width:50
}
})
