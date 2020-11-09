import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'



var arr = [{type:"חופשת מחלה",status:"מחכה",date:"10.2.20",id:-1}]


const render = ({item})=>
{
    return(   
     <View>
        <Text >סוג הבקשה: {item.type}</Text>
        <Text >סטטוס: {item.status}</Text>
        <Text >תאריך: {item.date}</Text>
     </View>
    )    
}  

export default function AllRequestScreen() {
    return (
        <View style={styles.view}>
            <Text>
                כל הבקשות
            </Text>
            <FlatList
            data={arr}
            renderItem={render}
            keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    view:
    {
        marginTop:50,
    }
})
