import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalObject } from "../src/globalObject";
import requestList from "../src/api/apiKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { changeLoginStyle } from "../src/action";
import io from "socket.io-client/dist/socket.io";
import ip from "../src/api/serverIP";
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";

const storeData = async (value, key) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {}
};

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {}
};

function LoginForm({ navigation, changeLoginStyle }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldShow, setShouldShow] = useState(false);

  const pressHandler = async (email, password, setShouldShow) => {
    if (!email || !password) {
      title = "הכניסה נכשלה";
      msg = "אחד או יותר מהשדות ריקים, נסו שנית";
      alertButton = [{ text: "הבנתי" }];
      Alert.alert(title, msg, alertButton, { cancelable: false });
    } else {
      setShouldShow(true);

      var naviTo = "";
      let expoId = await globalObject.registerForPushNotificationsAsync();
      const user = await globalObject.SendRequest(requestList.userLoginUrl, {
        email: email.trim().toLowerCase(),
        password,
        expoId,
      });
      if (user) {
        globalObject.sendSocketMessage("loginToTheWebSite", email, "das");
        storeData(password, "password");
        storeData(email, "email");
        globalObject.User = user;
        if (user.styles) changeLoginStyle(user.styles);
        if (globalObject.User.permission.manager) {
          const company = await globalObject.SendRequest(
            requestList.getCompanyUrl,
            { email: user.email, joinCode: user.joinCode }
          );
          if (company) {
            globalObject.User.tasks = company.tasks;
            globalObject.User.personalRequests = company.personalRequests;
            globalObject.User.employees = company.employees;
            globalObject.company = company;
            naviTo = "ManagerMainScreen";
          }
        } else if (globalObject.User.company) naviTo = "EmployeeMainScreen";
        else naviTo = "SelectionScreen";
      }
      navigation.navigate(naviTo);
    }
    setShouldShow(false);
  };

  useEffect(() => {
    (async () => {
      let password = await getData("password");
      let email = await getData("email");

      if (password && email) {
        setEmail(email);
        setPassword(password);
        pressHandler(email, password, setShouldShow);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput value={email} onChangeText={setEmail} style={globalObject.styles.regInputBox} placeholder='כתובת דוא"ל' autoCapitalize="none" />
      <TextInput value={password} onChangeText={setPassword} style={globalObject.styles.regInputBox} placeholder="סיסמה" secureTextEntry={true} />
      <TouchableOpacity onPress={() => pressHandler(email, password, setShouldShow)} style={globalObject.styles.regButton}>
        <Text style={globalObject.styles.regButtonText}>כניסה</Text>
      </TouchableOpacity>

      <View style={globalObject.styles.signupOrLoginTextCont}>
        <Text style={globalObject.styles.signupOrLoginText}> שכחת סיסמה?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("GetCodeForRes")}>
          <Text style={globalObject.styles.signupOrLoginButton}>לחץ כאן</Text>
        </TouchableOpacity>
      </View>


      {shouldShow ? (
        <Image
          style={globalObject.styles.loadingIcon}
          source={require("../assets/loading_animation.gif")}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return { style: state.styles };
};
export default connect(mapStateToProps, { changeLoginStyle })(LoginForm);
