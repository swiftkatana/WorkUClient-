import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { responsiveHeight, responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
import requestList from "../../src/api/apiKeys";
import { globalObject } from "../../src/globalObject";
const storeData = async (value, key) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export default function Main({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [expoId, setexpoId] = useState("");

  useEffect(() => {
   ( async () => {
      let expoId = await globalObject.registerForPushNotificationsAsync();
      setexpoId(expoId);
    })();
  }, []); 

  const pressHandler = async () => {
    if (!firstName || !lastName || !email || !password || !verifyPassword) {
      title = "ההרשמה נכשלה";
      msg = "אחד או יותר מהשדות ריקים, נסו שנית";
      alertButton = [{ text: "הבנתי" }];
      Alert.alert(title, msg, alertButton, { cancelable: false });
    } else if (password != verifyPassword) {
      title = "ההרשמה נכשלה";
      msg = "הוזנו שני סיסמאות שונות, נסו שנית";
      alertButton = [{ text: "הבנתי" }];
      Alert.alert(title, msg, alertButton, { cancelable: false });
    } else {
      const user = await globalObject.SendRequest(requestList.userRegisterUrl, {
        firstName,
        lastName,
        phone,
        email: email.trim().toLowerCase(),
        password,
        expoId
      });
      if (user) {
        storeData(password, "password");
        storeData(email, "email");
        // register content ok
        globalObject.User = user;
        navigation.navigate("SelectionScreen", { user: globalObject.User });
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={globalObject.styles.regTitleText}>הרשמה</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          style={globalObject.styles.regInputBox}
          placeholder="שם פרטי"
        />
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          style={globalObject.styles.regInputBox}
          placeholder="שם משפחה"
        />
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={globalObject.styles.regInputBox}
          placeholder="מספר טלפון"
          keyboardType={"numeric"}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={globalObject.styles.regInputBox}
          placeholder='כתובת דוא"ל'
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={globalObject.styles.regInputBox}
          placeholder="סיסמה"
          secureTextEntry={true}
        />
        <TextInput
          value={verifyPassword}
          onChangeText={setVerifyPassword}
          style={globalObject.styles.regInputBox}
          placeholder="אימות סיסמה"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={globalObject.styles.regButton}
          onPress={() =>
            pressHandler(firstName, lastName, email, password, verifyPassword)
          }
        >
          <Text style={globalObject.styles.regButtonText}>אישור</Text>
        </TouchableOpacity>
      </View>
      <View style={globalObject.styles.signupOrLoginTextCont}>
        <Text style={globalObject.styles.signupOrLoginText}> כבר יש לך משתמש?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={globalObject.styles.signupOrLoginButton}>כניסה</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(5),
  },
});
