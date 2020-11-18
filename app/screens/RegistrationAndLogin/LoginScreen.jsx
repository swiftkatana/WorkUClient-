import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import LoginForm from "../../components/LoginForm";
import Logo from '../../components/Logo';
import { globalObject } from "../../src/globalObject";


export default function Main({ navigation }) {

  return (
    <View style={styles.container}>
      <Logo />
      <LoginForm navigation={navigation} />
      <View style={styles.signupTextCont}>
        <Text style={styles.signupText}> אין לך משתמש?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterUserScreen')}>
          <Text style={styles.signupButton}>הירשם</Text>
        </TouchableOpacity>
        <Text style={styles.signupButton} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
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
    color: "#7f71e3",
    fontSize: 18,
    fontWeight: "bold",
  },
});

