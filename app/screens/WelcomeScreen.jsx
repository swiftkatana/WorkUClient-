import React,{useState} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import LoginForm from '../components/LoginForm';
import Logo from '../components/Logo';
import {gobalObject} from "../src/globalObject";


export default function WelcomeScreen({navigation}) {

  gobalObject.Navigation = navigation;
  return (
    <View style={styles.container}>
      <Logo />
      <LoginForm/>
      <View style={styles.signupTextCont}>
        <Text style={styles.signupText}> אין לך משתמש?</Text>
        <TouchableOpacity onPress={() => gobalObject.Navigation.navigate('UserRegisterScreen')}>
          <Text style={styles.signupButton}>הירשם</Text>
        </TouchableOpacity>
        <Text style={styles.signupButton}  />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signupTextCont: {
    flexGrow: 1,
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
});

