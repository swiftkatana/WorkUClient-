import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { responsiveScreenFontSize, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import LoginForm from "../../components/LoginForm";
import Logo from '../../components/Logo';
import { changeStyle } from '../../src/action';
import { globalObject } from "../../src/globalObject";


function Main({ navigation, changeStyle }) {

  return (
    <View style={styles.container}>
      <Logo />
      <LoginForm navigation={navigation} />
      <View style={styles.signupTextCont}>
        <Text style={globalObject.styles.signupOrLoginText}> אין לך משתמש?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterUserScreen')}>
          <Text style={globalObject.styles.signupOrLoginButton}>הירשם</Text>
        </TouchableOpacity>
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
   // flexGrow: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: responsiveScreenFontSize(2),
    flexDirection: 'row-reverse'
  },
});
const mapStateToProps = (state) => ({
  style: state.styles
})



export default connect(mapStateToProps, { changeStyle })(Main);