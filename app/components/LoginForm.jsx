import React,{useState} from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {globalObject} from "../src/globalObject";
import { getCompanyUrl, userLoginUrl } from "../src/api/apiKeys";

const pressHandler = async (email,password)=>
{
  if(!email || !password ){
    title = "הכניסה נכשלה";
    msg = "אחד או יותר מהשדות ריקים, נסו שנית"
    alertButton = [{text: "הבנתי",onPress: () => console.log("OK Pressed")}];
    Alert.alert(title,msg,alertButton,{cancelable: false});
  }else
  {
    const  user = await globalObject.SendRequest(userLoginUrl,{email,password});
    if(user)
    { 
      
      globalObject.User = user;
      if(globalObject.User.permission.managar)
      {
        const  company = await globalObject.SendRequest(getCompanyUrl,{email:user.email,joinCode:user.joinCode});
        if(company)
        {
          globalObject.User.tasks = company.tasks;
          globalObject.User.personalRequests = company.personalRequests;
          globalObject.campany = company;
        }
      }
      globalObject.Navigation.navigate('TaskScreen');
    }
  }
}

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    
    <View style={styles.container}>
      <TextInput value={email} onChangeText={email=>{setEmail(email.trim().toLowerCase())}} style={styles.inputBox} placeholder='כתובת דוא"ל'  autoCapitalize="none"  secureTextEntry={true}  keyboardType={"visible-password"} />
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
    backgroundColor: "#7f71e3",
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

