import React,{useState} from 'react'
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {globalObject} from "../src/globalObject";
import requestList from "../src/api/apiKeys";

const pressHandler = async (email,password,setShouldShow)=>
{
  if(!email || !password ){
    title = "הכניסה נכשלה";
    msg = "אחד או יותר מהשדות ריקים, נסו שנית"
    alertButton = [{text: "הבנתי",onPress: () => console.log("OK Pressed")}];
    Alert.alert(title,msg,alertButton,{cancelable: false});
  }else
  {
    setShouldShow(true);
    const  user = await globalObject.SendRequest(requestList.userLoginUrl,{email:email.trim().toLowerCase(),password});
    if(user)
    { 
      globalObject.User = user;
      if(globalObject.User.permission.manager)
      {
        const  company = await globalObject.SendRequest(requestList.getCompanyUrl,{email:user.email,joinCode:user.joinCode});
        console.log(company);
        if(company)
        {
          globalObject.User.tasks =  company.tasks ? company.tasks : [];
          globalObject.User.personalRequests = company.personalRequests ? company.personalRequests : [] ;
          globalObject.campany = company;
          
          console.log(globalObject.User);
          globalObject.Navigation.navigate('ManagerMainScreen');
          setShouldShow(false);
          return;
        }
      }
      if(globalObject.User.company)
      {
        console.log(globalObject.User);
        globalObject.Navigation.navigate('EmpolyeeMainScreen');
        setShouldShow(false);
      }
      else
      {
        globalObject.Navigation.navigate('SelectScreen',{user:globalObject.User});
        setShouldShow(false);
      }

    }else{
      setShouldShow(false);

    }
  }
}

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [shouldShow, setShouldShow] = useState(false);
  
  return (

    <View style={styles.container}>
      <TextInput value={email} onChangeText={setEmail} style={styles.inputBox} placeholder='כתובת דוא"ל'  autoCapitalize="none"  secureTextEntry={true}  keyboardType={"visible-password"} />
      <TextInput value={password} onChangeText={setPassword} style={styles.inputBox} placeholder="סיסמה" secureTextEntry={true}/>
      <TouchableOpacity onPress={()=>pressHandler(email,password,setShouldShow)} style={styles.button}>
        <Text style={styles.buttonText}>כניסה</Text>
      </TouchableOpacity>
      {}
      {shouldShow ? <Image style={styles.tinyLogo}  source={require('../assets/loading_animation.gif')}/> : null}
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
  tinyLogo:{
    marginTop: 40,
    width: 30,
    height: 30,

  }

});

