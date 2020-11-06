import React from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {gobalObject} from "../src/gobalObject";

export default function UserRegisterScreen() {

    return (

        <View style={styles.container}>
            <Text style= {styles.logoText}>הרשמה</Text>
            <TextInput style={styles.inputBox} placeholder='כתובת דוא"ל' />
            <TextInput style={styles.inputBox} placeholder="סיסמה" secureTextEntry={true}/>
            <TextInput style={styles.inputBox} placeholder="אימות סיסמה" secureTextEntry={true}/>
            <TouchableOpacity style={styles.button} onPress={() => gobalObject.Navigation.navigate('UserRegisterScreen2')}>
                <Text style={styles.buttonText}>אישור</Text>
            </TouchableOpacity>
        </View>
  
        
    )
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputBox: {
      width: 300,
      height: 60,
      backgroundColor: '#ededed',
      borderRadius: 25,
      paddingHorizontal: 16,
      marginVertical: 10,
      textAlign: "right"
    },
    button: {
      width: 300,
      backgroundColor: "tomato",
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 16,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#000000',
      textAlign: 'center',
    },
    logoText: {
        marginVertical: 20,
        fontSize: 22,
        color: '#000000',
        fontWeight: "bold"
    }
  
  });