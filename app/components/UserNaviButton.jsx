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
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "#ededed",
        marginHorizontal: 10,
        marginBottom: 5,
        textAlign: "center",
        alignItems: 'center',
//#bf3b49
    },
    settings:
    {
      //marginHorizontal:1,
      borderRadius:30,
      backgroundColor:"#bf3b49",
      width:75,
      height:70,
      justifyContent: 'center',
      alignItems: 'center',

    },
    settingsFont:
    {
        marginHorizontal: 2,
        textAlign: "center",
        fontSize: 16,
        color: "seashell",
        fontWeight: "bold",
     },
})
