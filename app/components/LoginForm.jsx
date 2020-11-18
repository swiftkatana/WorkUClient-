import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { globalObject } from "../src/globalObject";
import requestList from "../src/api/apiKeys";
import AsyncStorage from '@react-native-async-storage/async-storage';


const storeData = async (value, key) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
  }
}

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
}

const pressHandler = async (email, password, setShouldShow) => {
  if (!email || !password) {
    title = "הכניסה נכשלה";
    msg = "אחד או יותר מהשדות ריקים, נסו שנית"
    alertButton = [{ text: "הבנתי", onPress: () => console.log("OK Pressed") }];
    Alert.alert(title, msg, alertButton, { cancelable: false });
  } else {
    setShouldShow(true);
    storeData(password, 'password');
    storeData(email, 'email')
    const user = await globalObject.SendRequest(requestList.userLoginUrl, { email: email.trim().toLowerCase(), password });
    if (user) {
      globalObject.User = user;
      if (globalObject.User.permission.manager) {
        const company = await globalObject.SendRequest(requestList.getCompanyUrl, { email: user.email, joinCode: user.joinCode });
        console.log(company);
        if (company) {
          globalObject.User.tasks = company.tasks;
          globalObject.User.personalRequests = company.personalRequests;
          globalObject.company = company;

          console.log(globalObject.User);
          globalObject.Navigation.navigate('ManagerMainScreen');
          setShouldShow(false);
          return;
        }
      }
      if (globalObject.User.company) {
        console.log(globalObject.User);
        globalObject.Navigation.navigate('EmployeeMainScreen');
        setShouldShow(false);
      }
      else {
        globalObject.Navigation.navigate('SelectionScreen', { user: globalObject.User });
        setShouldShow(false);
      }

    } else {
      setShouldShow(false);

    }
  }
}

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    (async () => {
      let password = await getData('password')
      let email = await getData('email')

      if (password && email) {
        setEmail(email);
        setPassword(password);
        console.log('found email and password on login', email, password)
      } else {
        console.log('didnt find password and email');
      }
    })()
  }, [])

  return (

    <View style={styles.container}>
      <TextInput value={email} onChangeText={setEmail} style={styles.inputBox} placeholder='כתובת דוא"ל' autoCapitalize="none" secureTextEntry={true} keyboardType={"visible-password"} />
      <TextInput value={password} onChangeText={setPassword} style={styles.inputBox} placeholder="סיסמה" secureTextEntry={true} />
      <TouchableOpacity onPress={() => pressHandler(email, password, setShouldShow)} style={styles.button}>
        <Text style={styles.buttonText}>כניסה</Text>
      </TouchableOpacity>

      <View style={styles.signupTextCont}>
        <Text style={styles.signupText}> שכחת סיסמה?</Text>
        <TouchableOpacity onPress={() => globalObject.Navigation.navigate('GetCodeForRes')}>
          <Text style={styles.signupButton}>לחץ כאן</Text>
        </TouchableOpacity>
        <Text style={styles.signupButton} />
      </View>

      {}

      {shouldShow ? <Image style={styles.tinyLogo} source={require('../assets/loading_animation.gif')} /> : null}

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
  tinyLogo: {
    marginTop: 40,
    width: 30,
    height: 30,

  },
  signupTextCont: {

    flexDirection: 'row-reverse'
  },
  signupText: {
    fontSize: 16,
  },
  signupButton: {
    paddingRight: 5,
    color: "#7f71e3",
    fontSize: 18,
    fontWeight: "bold",
  },

});

