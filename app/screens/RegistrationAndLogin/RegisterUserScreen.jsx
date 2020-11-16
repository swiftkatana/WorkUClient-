import React,{useState} from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import requestList from "../../src/api/apiKeys";
import {globalObject} from "../../src/globalObject";


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
  }else
  {
    const  user = await globalObject.SendRequest(requestList.userRegisterUrl,{firstName,lastName,email,password});
    if(user)
    {
      // register content ok
      globalObject.User = user;
      globalObject.Navigation.navigate('SelectionScreen',{user:globalObject.User});
    }
  }
}

export default function Main() 
{

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')

 
    return (
        <View style={styles.container}>
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
          <View style={styles.signinTextCont}>
                <Text style={styles.signinText}> כבר יש לך משתמש?</Text>
                <TouchableOpacity onPress={() => globalObject.Navigation.navigate('LoginScreen')}>
                  <Text style={styles.signinButton}>כניסה</Text>
                </TouchableOpacity>
                <Text style={styles.signinButton}  />
          </View>
        </View>
  
        
    )
}

const styles = StyleSheet.create({
    container: {
      //flexGrow: 0.8,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:50,

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
    logoText: {
        marginVertical: 20,
        fontSize: 22,
        color: '#000000',
        fontWeight: "bold"
    },
    signinTextCont: {
      //flexGrow: 0.1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingVertical: 16,
      flexDirection: 'row-reverse'
    },
    signinText: {
      fontSize: 16,
    },
    signinButton: {
      paddingRight: 5,
      color: "#7f71e3",
      fontSize: 18,
      fontWeight: "bold",
    },
  
  });