import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { globalObject } from "../src/globalObject";
import requestList from "../src/api/apiKeys";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { changeLoginStyle } from '../src/action';


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

function LoginForm({ navigation, changeLoginStyle }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [shouldShow, setShouldShow] = useState(false);

  const pressHandler = async (email, password, setShouldShow) => {
    if (!email || !password) {
      title = "הכניסה נכשלה";
      msg = "אחד או יותר מהשדות ריקים, נסו שנית"
      alertButton = [{ text: "הבנתי" }];
      Alert.alert(title, msg, alertButton, { cancelable: false });
    } else {
      setShouldShow(true);

      var naviTo = "";
      let expoId = await globalObject.registerForPushNotificationsAsync();
      const user = await globalObject.SendRequest(requestList.userLoginUrl, { email: email.trim().toLowerCase(), password, expoId });
      if (user) {
        globalObject.socket.emit('loginToTheWebSite',email)
        console.log(globalObject.socket);
        storeData(password, 'password');
        storeData(email, 'email')
        globalObject.User = user;
        if (user.styles) changeLoginStyle(user.styles);
        if (globalObject.User.permission.manager) {
          const company = await globalObject.SendRequest(requestList.getCompanyUrl, { email: user.email, joinCode: user.joinCode });
          if (company) {
            globalObject.User.tasks = company.tasks;
            globalObject.User.personalRequests = company.personalRequests;
            globalObject.User.employees = company.employees;
            globalObject.company = company;
            naviTo = "ManagerMainScreen";
          }
        }
        else if (globalObject.User.company)
          naviTo = 'EmployeeMainScreen';
        else
          naviTo = 'SelectionScreen';
      }
      navigation.navigate(naviTo);
    }
    setShouldShow(false);
  }

  useEffect(() => {
    (async () => {
      let password = await getData('password')
      let email = await getData('email')

      if (password && email) {
        setEmail(email);
        setPassword(password);
        pressHandler(email, password, setShouldShow);
      }
    })()
  }, [])

  return (

    <View style={styles.container}>
      <TextInput value={email} onChangeText={setEmail} style={styles.inputBox} placeholder='כתובת דוא"ל' autoCapitalize="none" />
      <TextInput value={password} onChangeText={setPassword} style={styles.inputBox} placeholder="סיסמה" secureTextEntry={true} />
      <TouchableOpacity onPress={() => pressHandler(email, password, setShouldShow)} style={styles.button}>
        <Text style={styles.buttonText}>כניסה</Text>
      </TouchableOpacity>

      <View style={styles.signupTextCont}>
        <Text style={styles.signupText}> שכחת סיסמה?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('GetCodeForRes')}>
          <Text style={{ ...styles.signupButton, }}>לחץ כאן</Text>
        </TouchableOpacity>
        <Text style={{ ...styles.signupButton, }} />
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

const mapStateToProps = (state) => {
  return { style: state.styles }
}
export default connect(mapStateToProps, { changeLoginStyle })(LoginForm)