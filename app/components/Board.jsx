import React, { useState } from 'react'
import { StyleSheet, Text, View ,Dimensions, FlatList, Button} from 'react-native'
import { ScrollView,TouchableOpacity,TouchableWithoutFeedback } from 'react-native-gesture-handler';

var arr = []
for(let i = 0;i<4;i++)
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
          <Text>פירוט</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.but}>
          <Text>עדכן</Text>
        </TouchableOpacity>
        </View>


    </View>
    )    
}  

export default function Board() {

    return (
        <View style={styles.view}>
            <Text style={styles.taskBorad}>
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
        borderWidth:1,
        height: Dimensions.get('window').height *0.7,
        
    },
    listText:
    {   flex:5,
        textAlign:"right",
        marginRight:2,
    },
    list:
    {
        borderWidth: 1,
        height:100,
        width:Dimensions.get('window').width,
        backgroundColor:"#00ffff",
        flexDirection:"row-reverse",
    },  
    taskBorad:
    {
        textAlign:"center",
        fontSize:40,
        
    },
    but:
    {
       
    width: 50,
    height: 40,
    backgroundColor: 'tomato', 

    marginBottom:5,
    },
    koral:
    {
        flex:1,
        flexDirection:"column",
    },
})
