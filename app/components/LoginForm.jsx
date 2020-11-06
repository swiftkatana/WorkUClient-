import React,{useState} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {gobalObject} from "../src/globalObject";
//add import
export default function LoginForm() {
  
  //refernce
  const pressHandler = async ()=>
  {
    const  res = await  serverApi.post(userLoginUrl, {email, password});
    if(res.data.err){
      
      console.log(res.data.err);
    }else{ // login content ok
      gobalObject.User = res.data;
      console.log(res.data)
      gobalObject.Navigation.navigate('ProfileScreen');
    }
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    
    <View style={styles.container}>
      <TextInput value={email} onChangeText={setEmail} style={styles.inputBox} placeholder='כתובת דוא"ל' />
      <TextInput value={password} onChangeText={setPassword} style={styles.inputBox} placeholder="סיסמה" secureTextEntry={true}/>
      <TouchableOpacity onPress={pressHandler} style={styles.button}>
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

