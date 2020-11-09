import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalObject } from '../src/globalObject';
export default function UserNaviButton() {



    return (
        <View style={styles.view}>


        <TouchableOpacity style={styles.settings} onPress={()=>globalObject.Navigation.navigate('MainRequestScreen')}>
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
        flex:2,
        flexDirection:"row-reverse",
        justifyContent:"space-evenly",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "#bf3b49",
        marginHorizontal: 5,
        marginBottom: 5,
        textAlign: "center",
        alignItems: 'center',

    },
    settings:
    {
      marginHorizontal:4,
      borderRadius:20,
      backgroundColor:"seashell",
      width:75,
      height:60,
      justifyContent: 'center',
      alignItems: 'center',

    },
    settingsFont:
    {
        marginHorizontal: 2,
        textAlign: "center",
        fontSize: 16,
     },
})
