import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import { globalObject } from "../src/globalObject";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
window.navigator.userAgent = "react-native"; // for some versions of socketio this is needed also in React Native
import io from "socket.io-client/dist/socket.io"; // note the /dist/ subdirectory (socket.io-client v.2.1.1)!
import ip from "../src/api/serverIP";
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

function GetGreetingMsg() {
  var msg;
  var hours = new Date().getHours();
  if (hours >= 6 && hours < 12) msg = "בוקר טוב";
  else if (hours >= 12 && hours < 18) msg = "צהורים טובים";
  else if (hours >= 18 && hours < 23) msg = "ערב טוב";
  else msg = "לילה טוב";
  return msg;
}

function Greeting({ navigation, style }) {
  const [GreetingMsg, SetGreeting] = useState("");
  useEffect(() => {
    const id = setInterval(() => {
      SetGreeting(GetGreetingMsg());
    }, 3600);
    SetGreeting(GetGreetingMsg());
    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <View style={{ ...styles.view, ...style.view }}>
      <Text style={styles.GreetingText}>
        {" "}
        {GreetingMsg}, {globalObject.User.firstName}
      </Text>
      <TouchableOpacity
        style={styles.settings}
        onPress={() => navigation.navigate("SettingsScreen")}
      >
        <Image
          style={styles.tinyLogo}
          source={require("../assets/settings_icon.png")}
        />
        <Text style={styles.settingsFont}>הגדרות</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal:responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(3),
    width: Dimensions.get("window").width,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    textAlign: "right",
    borderRadius: 2,
    borderBottomRightRadius: 85,
  },
  GreetingText: {
    fontSize: responsiveScreenFontSize(2),
    color: "seashell",
    fontWeight: "bold",
    paddingRight: responsiveScreenWidth(9),
    marginTop: responsiveScreenHeight(4),
  },
  settings: {
    marginLeft: responsiveScreenWidth(1),
    borderRadius: 25,
    width: responsiveScreenWidth(15),
    height: responsiveScreenHeight(10),
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveScreenHeight(4),
  },
  settingsFont: {
    fontSize: responsiveScreenFontSize(1.4),
    color: "seashell",
    textAlign: "center",
    fontWeight: "bold",
  },
  tinyLogo: {
    width: responsiveScreenHeight(3.5),
    height: responsiveScreenHeight(3.5),
},
});

const mapStateToProps = (state) => {
  return { style: state.styles };
};
export default connect(mapStateToProps, {})(Greeting);
