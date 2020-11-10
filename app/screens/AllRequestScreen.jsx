import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { globalObject } from '../src/globalObject'



var arr = [{type:"חופשת מחלה",status:"מחכה",date:"10.2.20",id:"123"},{type:"חופשתvv מחלה",status:"מחכה",date:"10.2.20",id:"124"} ]


const render = ({item})=>
{
    return(   
     <View style={styles.list}>
        <Text style={styles.listText}>תאריך: {item.date}</Text>
        <Text style={styles.listText} >סוג הבקשה: {item.type}</Text>
        <Text style={styles.status}>סטטוס: {item.status}</Text>
     </View>
    )    
}  

export default function AllRequestScreen() {
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.exitButton} onPress={()=>globalObject.Navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.container}>

                <Text style={styles.title}>
                    כל הבקשות
                </Text>
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
        backgroundColor: "#bf3b49",
        //alignItems: 'center',
    },
    container:{
        //paddingTop: 70,
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
    list:
    {
        //borderWidth: 1,
        height:80,
        width:Dimensions.get('window').width-50,
        backgroundColor:"seashell",
        //backgroundColor:"white",
        flexDirection:"row-reverse",
        alignItems: 'center',
        textAlign: "center",
        marginHorizontal: 20,
        justifyContent: 'center',
        borderRadius:25,
        marginBottom:10,
        borderWidth:1,
        borderColor: "lightgray",


    },
    listText:
    {   flex:3,
        textAlign:"center",
        fontSize: 14,

    },
    status:    
    {   flex:3,
        textAlign:"center",
        marginRight:15,
        fontSize: 14,
        fontWeight: "bold",

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
