import React,{useState} from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { userRegisterUrl } from "../src/api/apiKeys";
import {globalObject} from "../src/globalObject";

export default function UserRegisterScreen() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')

  const pressHandler = async (firstName,lastName,email,password,verifyPassword)=>
  {
    if(!firstName || !lastName || !email || !password || !verifyPassword){
      title = "ההרשמה נכשלה";
      msg = "אחד או יותר מהשדות ריקים, נסו שנית"
      alertButton = [{text: "הבנתי",onPress: () => console.log("OK Pressed")}];
      Alert.alert(title,msg,alertButton,{cancelable: false});
    }else if(password != verifyPassword){
      title = "ההרשמה נכשלה";
      msg = "הוזנו שני סיסמאות שונות, נסו שנית"
      alertButton = [{text: "הבנתי",onPress: () => console.log("OK Pressed")}];
      Alert.alert(title,msg,alertButton,{cancelable: false});
    }else{
      const  res = await globalObject.SendRequest(userRegisterUrl,{firstName,lastName,email,password});
      if(res.error){
        globalObject.ErrorHandler(res.error);
      }else{// register content ok
        globalObject.User = res.data;
        globalObject.Navigation.navigate('MainScreen');
      }
    }
  }
    return (

        <View style={styles.container}>
            <Text style= {styles.logoText}>הרשמה</Text>
            <TextInput value ={firstName} onChangeText={setFirstName} style={styles.inputBox} placeholder='שם פרטי' />
            <TextInput value ={lastName} onChangeText={setLastName} style={styles.inputBox} placeholder="שם משפחה"/>
            <TextInput value ={email} onChangeText={setEmail} style={styles.inputBox} placeholder='כתובת דוא"ל' />
            <TextInput value ={password} onChangeText={setPassword} style={styles.inputBox} placeholder="סיסמה" secureTextEntry={true}/>
            <TextInput value ={verifyPassword} onChangeText={setVerifyPassword} style={styles.inputBox} placeholder="אימות סיסמה" secureTextEntry={true}/>
            <TouchableOpacity style={styles.button} onPress={() => pressHandler(firstName,lastName,email,password,verifyPassword)}>
                <Text style={styles.buttonText}>אישור</Text>
            </TouchableOpacity>
        </View>
  
        
    )
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
    logoText: {
        marginVertical: 20,
        fontSize: 22,
        color: '#000000',
        fontWeight: "bold"
    }
  
  });