import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function MainScreenAction() {
    return (
        <View style={styles.view}>

        <TouchableOpacity style={styles.settings}>
        <Text style={styles.settingsFont}>פרופיל אישי</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.settings}>
        <Text style={styles.settingsFont}>בקשה חדשה</Text> 
        </TouchableOpacity>


        <TouchableOpacity style={styles.settings}>
        <Text style={styles.settingsFont}>צ'אט</Text> 
        </TouchableOpacity>


        <TouchableOpacity style={styles.settings}>
        <Text style={styles.settingsFont}>פורפיל שכר</Text> 
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.settings}>
        <Text style={styles.settingsFont}>בקשות שהוגשו</Text> 
        </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    view:
    {
        height:75,
        flexDirection:"row-reverse",
        justifyContent:"space-between",
      
    },
    settings:
    {
    
      marginLeft:5,
      borderRadius:10,
      backgroundColor:"#00ff00",
      width:60,
      height:60,
       
    },
    settingsFont:
    {
        marginTop:15,
        textAlign:"center",
    },
})
