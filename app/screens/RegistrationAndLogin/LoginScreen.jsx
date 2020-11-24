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
    flexGrow: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: responsiveScreenFontSize(2),
    flexDirection: 'row-reverse'
  },
  signupText: {
    fontSize: responsiveScreenFontSize(2),
  },
  signupButton: {
    paddingRight: responsiveScreenWidth(1),
    color: "#7f71e3",
    fontSize: responsiveScreenFontSize(2.2),
    fontWeight: "bold",
  },
});
const mapStateToProps = (state) => ({
  style: state.styles
})



export default connect(mapStateToProps, { changeStyle })(Main);