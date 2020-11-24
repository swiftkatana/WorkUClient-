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

import { StackActions, NavigationActions } from "react-navigation";

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
        //globalObject.sendSocketMessage("loginToTheWebSite", email, "das");
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

      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: naviTo })],
      });
      navigation.dispatch(resetAction);
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
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.inputBox}
        placeholder='כתובת דוא"ל'
        autoCapitalize="none"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.inputBox}
        placeholder="סיסמה"
        secureTextEntry={true}
      />
      <TouchableOpacity
        onPress={() => pressHandler(email, password, setShouldShow)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>כניסה</Text>
      </TouchableOpacity>

      <View style={styles.signupTextCont}>
        <Text style={styles.signupText}> שכחת סיסמה?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("GetCodeForRes")}>
          <Text style={{ ...styles.signupButton }}>לחץ כאן</Text>
        </TouchableOpacity>
        <Text style={{ ...styles.signupButton }} />
      </View>

      {}

      {shouldShow ? (
        <Image
          style={styles.tinyLogo}
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
    justifyContent: "center",
  },
  buttonText: {
    fontSize: responsiveScreenFontSize(2),
    color: "seashell",
    textAlign: "center",
  },
  tinyLogo: {
    marginTop: 40,
    width: 30,
    height: 30,
  },
  signupTextCont: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: responsiveScreenFontSize(2),
  },
  signupButton: {
    paddingRight: 5,
    color: "#7f71e3",
    fontSize: responsiveScreenFontSize(2.2),
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => {
  return { style: state.styles };
};
export default connect(mapStateToProps, { changeLoginStyle })(LoginForm);
