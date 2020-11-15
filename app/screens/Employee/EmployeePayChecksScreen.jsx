import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { globalObject } from '../../src/globalObject'

var arr = [{type:"חופשת מחלה",date:"10.2.20",id:"123"},{type:"חופשתvv מחלה",date:"10.1.20",id:"124"} ]


const render = ({item})=>
{
    return(   
     <View style={styles.list}>
        <Text style={styles.listText}>תאריך: {item.date}</Text>
        <TouchableOpacity>
            <Image style={styles.tinyLogo} source={require('../../assets/pdf_icon.png')}/>
        </TouchableOpacity>
     </View>
    )    
}  

export default function Main() {
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.exitButton} onPress={()=>globalObject.Navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.container}>

                <Text style={styles.title}>
                    תלושי שכר</Text>
                <FlatList
                data={arr}
                renderItem={render}
                keyExtractor={item => item.id}
                />
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
    container:{
        alignItems: 'flex-end',    
    },
    title:
    {
        margin:20,
        marginRight:30,
        fontSize: 28,
        color: "seashell",
        textDecorationLine: "underline"

    },
    tinyLogo: 
    {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',

    },
    list:
    {
        height:60,
        width:Dimensions.get('window').width-50,
        backgroundColor:"seashell",
        flexDirection:"row-reverse",
        alignItems: 'center',
        textAlign: "right",
        marginHorizontal: 20,
        justifyContent: 'space-evenly',
        borderRadius:25,
        marginBottom:10,
        borderWidth:1,
        borderColor: "lightgray",
    },
    listText:
    {  
        textAlign:"right",
        fontSize: 14,
        justifyContent: 'center',
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
