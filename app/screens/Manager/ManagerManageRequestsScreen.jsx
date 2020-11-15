import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { globalObject } from '../../src/globalObject'



var arr = [{type:"חופשת מחלה",status:"נשלח",date:"10.2.20",id:"123"},{type:"מחלה",status:"מחכה",date:"10.2.20",id:"124"} ]


const render = ({item})=>
{
    return(   
     <View>
        <TouchableOpacity style={styles.list} onPress={()=>globalObject.Navigation.navigate("HandleSingleRequestScreen")}>
            <Text style={styles.listText}>תאריך: {item.date}</Text>
            <Text style={styles.listText} >סוג הבקשה: {item.type}</Text>
            <Text style={styles.status}>סטטוס: {item.status}</Text>
            <Image style={styles.tinyLogo} source={require('../../assets/arrow_icon_black.png')}/>
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
                    בקשות לטיפול
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
        backgroundColor: "#7f71e3",
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
        height: 55,
        width:Dimensions.get('window').width-40,
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
    {   flex:5,
        textAlign:"center",
        fontSize: 14,
        marginLeft: 5,
        marginRight: 10,


    },
    status:    
    {   flex:3,
        textAlign:"center",
        marginRight:10,
        fontSize: 14,
        fontWeight: "bold",

    },
    tinyLogo:{
        
        width: 20,
        height: 20,
        marginLeft: 15,
        marginRight: 10,
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
