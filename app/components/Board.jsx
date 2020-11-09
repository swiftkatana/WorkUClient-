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
        flex:8,
        //borderWidth:1,
        height: Dimensions.get('window').height *0.65,
        alignItems: 'center',
        backgroundColor: "tomato",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 90,
        marginHorizontal: 5,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        

        
    },
    listText:
    {   flex:3,
        textAlign:"right",
        marginRight:15,
        fontSize: 16,

    },
    list:
    {
        //borderWidth: 1,
        height:100,
        width:Dimensions.get('window').width-50,
        //backgroundColor:"seashell",
        backgroundColor:"white",
        flexDirection:"row-reverse",
        alignItems: 'center',
        marginHorizontal: 20,

        borderRadius:25,
        marginBottom:8,
        borderWidth:1,
        borderColor: "lightgray",


    },  
    boardTitle:
    {
        width:Dimensions.get('window').width -10,
        textAlign:"right",
        marginRight: 85,
        marginTop: 10,
        fontSize:24,
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
    backgroundColor: 'firebrick',
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
    marginVertical:8,
    },
    butText:
    {
        color:"seashell",
        fontWeight: "bold",
    },
    koral:
    {
        flex:1,
        flexDirection:"column",
    },
})
