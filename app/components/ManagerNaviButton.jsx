import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalObject } from '../src/globalObject';

export default function ManagerNaviButton() {



    return (
        <View style={styles.view}>


        <TouchableOpacity style={styles.settings} onPress={()=>globalObject.Navigation.navigate('ManagerManageRequestsScreen')}>
        <Image style={styles.tinyLogo} source={require('../assets/notebook_icon.png')}/>
        <Text style={styles.settingsFont}>ניהול בקשות</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.settings} onPress={()=>globalObject.Navigation.navigate('ManagerToolsScreen')}>
        <Image style={styles.tinyLogo} source={require('../assets/suitcase_icon.png')}/>
        <Text style={styles.settingsFont}>כלי ניהול</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.settings}>
        <Image style={styles.tinyLogo} source={require('../assets/statistics_icon.png')}/>
        <Text style={styles.settingsFont}>סטטיסטיקה</Text> 
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settings} onPress={()=>globalObject.Navigation.navigate('ManagerMainScreen')}>
        <Image style={styles.tinyLogo} source={require('../assets/chat_icon_2.png')}/>
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
        //backgroundColor: "#ededed",
        backgroundColor: "#efeef4",
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
      backgroundColor:"#7f71e3",
      width:75,
      height:70,
      justifyContent: 'center',
      alignItems: 'center',

    },
    settingsFont:
    {
        textAlign: "center",
        fontSize: 11,
        color: "seashell",
        fontWeight: "bold",
     },
     tinyLogo:{
        width: 30,
        height: 30,
        //alignItems: 'flex-end',
        //justifyContent: 'flex-end',
        //marginBottom: 40,
        //marginRight: 12,
        //zIndex: 5,
        
    },
})