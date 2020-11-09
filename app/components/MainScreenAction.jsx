import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function MainScreenAction() {



    return (
        <View style={styles.view}>


        <TouchableOpacity style={styles.settings}>
        <Text style={styles.settingsFont}>בקשה חדשה</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.settings}>
        <Text style={styles.settingsFont}>פורפיל שכר</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.settings}>
        <Text style={styles.settingsFont}>משמרות</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.settings}>
        <Text style={styles.settingsFont}>צ'אט</Text> 
        </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    view:
    {
        marginTop:5,
        flex:1.5,
        flexDirection:"row-reverse",
        justifyContent:"space-between",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: "lightgrey",
        marginHorizontal: 5,
        textAlign: "center",
        alignItems: 'center',

    },
    settings:
    {
      marginHorizontal:5,
      borderRadius:20,
      backgroundColor:"seashell",
      width:70,
      height:60,
      justifyContent: 'center',
      alignItems: 'center',

    },
    settingsFont:
    {
        marginHorizontal: 5,
        textAlign: "center",
        fontWeight: "bold",
     },
})
