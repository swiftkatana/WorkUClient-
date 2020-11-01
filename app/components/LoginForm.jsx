import React,{useState} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

import {LoginUrl} from '../src/api/apiKeys';
import serverApi from '../src/api/serverApi';
import {loginUser} from '../src/action'

 function LoginForm(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handlerLogin=async ()=>{
      // TODO: check input password and email 

      // valid info send to the server
      props.loginUser({email,password})
  }

  return (
    <View style={styles.container}>
      <TextInput value={email} onChangeText={setEmail} style={styles.inputBox} placeholder='כתובת דוא"ל' />
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.inputBox}
        placeholder="סיסמה"
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handlerLogin} style={styles.button}>
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


const mapStateToProps = (state) => ({
 len:state.len 
})



export default connect(mapStateToProps,{loginUser})(LoginForm);
