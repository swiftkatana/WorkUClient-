import React, { useState } from 'react'
import { StyleSheet, Text, View ,Dimensions, FlatList, Button} from 'react-native'
import { ScrollView,TouchableOpacity,TouchableWithoutFeedback } from 'react-native-gesture-handler';

var arr = []
for(let i = 0;i<6;i++)
{ 
    if(i == 0)
    arr.push({title:"222222222kkkkkkkkkkkkkkkkkkלנקות את וחנות ועדכן את שמואל",value:(9999).toString()});
else
    arr.push({title:i.toString(),value:(i+40).toString()});

}

const render = ({item})=>
{
    return(   
    <View style={styles.list}>
        <Text style={styles.listText}>תקציר: {item.title}</Text>

        <View style={styles.koral}>
        <TouchableOpacity style={styles.but}>
          <Text style ={styles.butText}>פירוט</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.but}>
          <Text style ={styles.butText}>עדכן</Text>
        </TouchableOpacity>
        </View>


    </View>
    )    
}  

export default function Board() {

    return (
        <View style={styles.view}>
            <Text style={styles.boardTitle}>
                לוח משימות
            </Text>
            <FlatList
            data={arr}
            renderItem={render}
            keyExtractor={item => item.value}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view:
    {
        flex:9,
        //borderWidth:1,
        height: Dimensions.get('window').height,
        alignItems: 'center',
        backgroundColor: "#bf3b49",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 90,
        marginHorizontal: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        

        
    },
    listText:
    {   flex:3,
        textAlign:"right",
        marginRight:15,
        fontSize: 14,

    },
    list:
    {
        //borderWidth: 1,
        height:80,
        width:Dimensions.get('window').width-50,
        //backgroundColor:"seashell",
        backgroundColor:"white",
        flexDirection:"row-reverse",
        alignItems: 'center',
        marginHorizontal: 20,

        borderRadius:25,
        marginBottom:10,
        borderWidth:1,
        borderColor: "lightgray",


    },  
    boardTitle:
    {
        width:Dimensions.get('window').width -10,
        textAlign:"right",
        marginRight: 90,
        marginTop: 10,
        fontSize:18,
        //backgroundColor: "tomato",
        paddingVertical: 10,
        borderRadius:20,
        marginBottom: 10,
        color: "seashell",
        fontWeight: "bold",

    },
    but:
    {
    width: 50,
    height: 30,
    marginHorizontal: 15,
    backgroundColor: '#a22434',
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
    marginVertical:3,
    },
    butText:
    {
        color:"seashell",
    },
    koral:
    {
        flex:1,
        flexDirection:"column",
    },
})
