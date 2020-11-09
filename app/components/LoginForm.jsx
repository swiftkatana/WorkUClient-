import React,{useState} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {globalObject} from "../src/globalObject";
import { userLoginUrl } from "../src/api/apiKeys";
import serverApi from '../src/api/serverApi';
//add import

const pressHandler = async (email,password)=>
{
  if(!firstName || !lastName || !email || !password || !verifyPassword){
    title = "הכניסה נכשלה";
    msg = "אחד או יותר מהשדות ריקים, נסו שנית"
    alertButton = [{text: "הבנתי",onPress: () => console.log("OK Pressed")}];
    Alert.alert(title,msg,alertButton,{cancelable: false});
  }else{
    const  res = await globalObject.SendRequest(userLoginUrl,{email,password});
    if(res.error){
      globalObject.ErrorHandler(res.error);
    }else{ // login content ok
      globalObject.User = res.data;
      globalObject.Navigation.navigate('ProfileScreen');
    }
}
}

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    
    <View style={styles.container}>
      <TextInput value={email} onChangeText={setEmail} style={styles.inputBox} placeholder='כתובת דוא"ל' />
      <TextInput value={password} onChangeText={setPassword} style={styles.inputBox} placeholder="סיסמה" secureTextEntry={true}/>
      <TouchableOpacity onPress={()=>pressHandler(email,password)} style={styles.button}>
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
    backgroundColor: "#bf3b49",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'seashell',
    textAlign: 'center',
  },

});

