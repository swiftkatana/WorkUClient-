import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm';
import Logo from '../components/Logo';

 function WelcomeScreen(props) {
  return (
    <View style={styles.container}>
      <Logo />
      <LoginForm />
      <View style={styles.signupTextCont}>
        <Text style={styles.signupText}>אין לך משתמש?</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
          <Text style={styles.signupButton}>הירשם</Text>
        </TouchableOpacity>
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

const mapStateToProps = (state) => ({
  user:state.user
})



export default connect(mapStateToProps,null)(WelcomeScreen);