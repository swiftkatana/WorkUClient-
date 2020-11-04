import React from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {gobalObject} from "../src/gobalObject";

export default function RegisterSelectScreen() {

  return (
    
    <View style={styles.container}>
      <Text style= {styles.logoText}>שלום, יעקוב</Text>
      <View style={styles.signupTextCont}>
        <Text style= {styles.signupText}>התחבר לבית עסק קיים:</Text>
      </View>
      <TextInput  style={styles.inputBox} placeholder='שם בית העסק' />
      <TouchableOpacity  style={styles.button}>
        <Text style={styles.buttonText}>התחל לעבוד</Text>
      </TouchableOpacity>
      <View style={styles.signupTextCont}>
        <Text style={styles.signupText}> בית העסק שלך עדיין לא רשום?</Text>
        <TouchableOpacity onPress={() => gobalObject.Navigation.navigate('UserRegisterScreen')}>
          <Text style={styles.signupButton}>לחץ כאן</Text>
        </TouchableOpacity>
        <Text style={styles.signupButton}  />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 60,
    justifyContent: 'flex-start',
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
  signupTextCont: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row-reverse'
  },
  signupText: {
    fontSize: 16,
  },
  signupButton: {
    paddingRight: 5,
    color: "tomato",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoText: {
    marginVertical: 20,
    fontSize: 22,
    color: '#000000',
    fontWeight: "bold"
  }

});

