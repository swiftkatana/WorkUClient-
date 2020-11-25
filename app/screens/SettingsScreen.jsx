import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { responsiveFontSize, responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
import { connect } from "react-redux";
import { globalObject } from "../src/globalObject";
import { StackActions, NavigationActions } from "react-navigation";

function Main({ navigation, style }) {
  const logout = async () => {
    await removeValue("password");
    await removeValue("email");
    globalObject.unmountSocket();
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "LoginScreen" })],
    });
    navigation.dispatch(resetAction);
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
      <View style={globalObject.styles.menuBtnContainer}>
        <Text style={globalObject.styles.menuTitle}>הגדרות</Text>
        <TouchableOpacity
          style={globalObject.styles.menuBtn}
          onPress={() => navigation.navigate("ChangePasswordScreen")}
        >
          <Text style={globalObject.styles.menuBtnText}>שינוי סיסמה</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalObject.styles.menuBtn}
          onPress={() => navigation.navigate("PreferencesOfUserForStyleScreen")}
        >
          <Text style={globalObject.styles.menuBtnText}>ערכת נושא</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalObject.styles.menuBtn}
          onPress={() => Alert.alert("התראת מפתחים", "חלק זה בפיתוח")}
        >
          <Text style={globalObject.styles.menuBtnText}>עזרה</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalObject.styles.menuBtn} onPress={logout}>
          <Text style={globalObject.styles.menuBtnText}>התנתקות</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalObject.styles.exitButton}
          onPress={() => navigation.pop()}
        >
          <Image
            style={globalObject.styles.exitIcon}
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
});
const mapStateToProps = (state) => {
  return { style: state.styles };
};
export default connect(mapStateToProps, {})(Main);
