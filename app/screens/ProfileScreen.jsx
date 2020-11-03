import React from "react"
import {Image, StyleSheet, Text, View } from 'react-native'
import {gobalObject} from "../src/gobalObject";


export default function ProfileScreen() {

        return (

            <View style={styles.continer}>
            <Text style={styles.info}> </Text>
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

