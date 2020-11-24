import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { globalObject } from "../src/globalObject";

function Main({ navigation, style }) {
  const logout = async () => {
    await removeValue("password");
    await removeValue("email");
    globalObject.logout();
    globalObject.User = {};
    navigation.navigate("LoginScreen");
  };
  const removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // remove error
    }
  };
  return (
    <View style={{ ...styles.view, ...style.view }}>
      <View style={styles.buttonsContainer}>
        <Text style={styles.title}>הגדרות</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ChangePasswordScreen")}
        >
          <Text style={styles.buttonText}>שינוי סיסמה</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("PreferencesOfUserForStyleScreen")}
        >
          <Text style={styles.buttonText}>ערכת נושא</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ChangeProfileImageScreen")}
        >
          <Text style={styles.buttonText}>עזרה</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>התנתקות</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => navigation.pop()}
        >
          <Image
            style={styles.exitIcon}
            source={require("../assets/exit_icon.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    //marginTop:50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    //paddingTop: 10,
    alignItems: "center",
  },
  button: {
    margin: 20,
    //marginRight: 30,
  },
  buttonText: {
    fontSize: 24,
    color: "seashell",
  },
  title: {
    textAlign: "center",
    width: Dimensions.get("window").width * 0.8,
    margin: 20,
    //marginRight: 30,
    fontSize: 48,
    color: "seashell",
    borderBottomWidth: 2,
    borderColor: "seashell",
  },
  exitButton: {
    paddingTop: 40,
  },
  exitIcon: {
    height: 50,
    width: 50,
  },
});
const mapStateToProps = (state) => {
  return { style: state.styles };
};
export default connect(mapStateToProps, {})(Main);
