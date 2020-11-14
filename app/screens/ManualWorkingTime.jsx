import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { globalObject } from '../src/globalObject'

export default function ManualWorkingTime() {
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.exitButton} onPress={()=>globalObject.Navigation.pop()}>
                    <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.buttonsContainer}>
                <Text style={styles.title}>הוספת שעות</Text>
                <View style={styles.infoConteiner}>
                    <Image style={styles.tinyLogo} source={require('../assets/information_icon.png')}/>

                    <View style={styles.infoTextConteiner} onPress={()=>globalObject.Navigation.navigate("AllRequestScreen")}>
                        <Text style={styles.infoText}>שים לב, שעות העבודה נוספות באופן אוטומטי לדו"ח החודשי כאשר אתה מפעיל את שעון העבודה שבמסך הראשי.</Text>
                    </View>
                </View>
                <TextInput style={styles.inputBox} placeholder="תאריך. דוגמה: 1.1.19" />
                <TextInput style={styles.inputBox} placeholder="שעת התחלה" />
                <TextInput style={styles.inputBox} placeholder="שעת סיום" />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>כניסה</Text>
                </TouchableOpacity>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        //marginTop:50,
        flex:1,
        backgroundColor: "#7f71e3",
        
        
    },
    buttonsContainer:
    {
        //paddingTop: 10,
        alignItems: 'flex-end',
    },
    button: {
        width: 300,
        backgroundColor: "#6f61ca",
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 20,
        marginHorizontal: 45,

      },
      buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'seashell',
        textAlign: 'center',
      },
    infoConteiner:{
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems:'center',
        
    },
    infoTextConteiner:{
        padding:10,
        //marginHorizontal: 82,
        marginRight:35,
        marginLeft:55,
        backgroundColor: "#6f61ca",
        borderRadius: 20,
        //borderEndWidth: 1,
        //borderStartWidth: 1,
        borderWidth: 1,
        //right: 10,
        justifyContent: 'center',
        alignItems:'center',
        borderColor: "seashell",

    },
    infoText:{
        fontSize: 11,
        color: "seashell",
        fontWeight:'bold',
    },
    tinyLogo:{
        width: 20,
        height: 20,
        //alignItems: 'center',
        //justifyContent: 'center',
        //marginBottom: 50,
        //marginRight: 10,
        //marginTop: 14,
        left: 30,
        bottom: 2,
        zIndex: 5,
        
    },
    inputBox: {
        width: 300,
        height: 60,
        backgroundColor: '#ededed',
        borderRadius: 25,
        paddingHorizontal: 16,
        marginVertical: 10,
        marginHorizontal: 45,
        textAlign: "right",
        justifyContent: 'center',
        alignItems:'center',

      },
    title:
    {
        margin:20,
        marginBottom:30,
        marginRight:30,
        fontSize: 28,
        color: "seashell",
        textDecorationLine: "underline"

    },
    exitButton:
    {
        paddingTop: 60,
        //position:'absolute',
        marginLeft:30,
        
    },
    exitText:
    {
        fontSize:30,
        color: "seashell",

    }
})
