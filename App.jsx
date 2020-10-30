import React from "react";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import store from "./app/src/store";
import WelcomeScreen from "./app/screens/WelcomeScreen";

export default function App() {
  return (
    // <Provider store={store}>
      <WelcomeScreen style={styles.container}>
        <StatusBar style="auto" />
      </WelcomeScreen>
    // {/* </Provider> */}
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

//