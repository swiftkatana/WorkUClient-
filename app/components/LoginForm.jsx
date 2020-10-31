import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function LoginForm() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.inputBox} placeholder='כתובת דוא"ל' />
      <TextInput
        style={styles.inputBox}
        placeholder="סיסמה"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>כניסה</Text>
      </TouchableOpacity>
    </View>
  );
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

});
