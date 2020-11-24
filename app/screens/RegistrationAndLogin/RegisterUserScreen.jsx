import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { responsiveHeight, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
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
        <Text style={styles.logoText}>הרשמה</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          style={styles.inputBox}
          placeholder="שם פרטי"
        />
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          style={styles.inputBox}
          placeholder="שם משפחה"
        />
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={styles.inputBox}
          placeholder="מספר טלפון"
          keyboardType={"numeric"}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.inputBox}
          placeholder='כתובת דוא"ל'
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.inputBox}
          placeholder="סיסמה"
          secureTextEntry={true}
        />
        <TextInput
          value={verifyPassword}
          onChangeText={setVerifyPassword}
          style={styles.inputBox}
          placeholder="אימות סיסמה"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            pressHandler(firstName, lastName, email, password, verifyPassword)
          }
        >
          <Text style={styles.buttonText}>אישור</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signinTextCont}>
        <Text style={styles.signinText}> כבר יש לך משתמש?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.signinButton}>כניסה</Text>
        </TouchableOpacity>
        <Text style={styles.signinButton} />
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
  inputBox: {
    width: responsiveScreenWidth(80),
    height: responsiveScreenHeight(7),
    backgroundColor: "#ededed",
    borderRadius: 25,
    paddingHorizontal: responsiveScreenWidth(6),
    marginVertical: responsiveScreenHeight(1),
    textAlign: "right",
  },
  button: {
    width: responsiveScreenWidth(80),
    height: responsiveScreenHeight(7),
    backgroundColor: "#7f71e3",
    borderRadius: 25,
    marginVertical: responsiveScreenHeight(1),
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "seashell",
    textAlign: "center",
  },
  logoText: {
    marginVertical: 20,
    fontSize: 22,
    color: "#000000",
    fontWeight: "bold",
  },
  signinTextCont: {
    //flexGrow: 0.1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row-reverse",
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
