import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

export default function WelcomeScreen() {
  return (
    <View style ={styles.container}>
      <TextInput style ={styles.inputBox} placeholder = 'כתובת דוא"ל'/>
      <TextInput style ={styles.inputBox} placeholder = 'סיסמה'/>

    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBox: {
    width: 300,
    height: 60,
    backgroundColor: '#ededed',
    borderRadius: 25,
    paddingHorizontal:16,
    marginVertical: 10,
  }
});
