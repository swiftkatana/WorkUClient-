import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { ClippingRectangle, StyleSheet, Text, View } from "react-native";
import {  NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// just a icon libary 
import Ionicons from 'react-native-vector-icons/Ionicons';
import store from "./app/src/store";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import RegisterScreen from "./app/screens/RegisterScreen";

const Tab = createBottomTabNavigator();


export default function App() {
 


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator >
          <Tab.Screen options={{ tabBarVisible: false, }} name='Login' component={WelcomeScreen} />
          <Tab.Screen options={{ tabBarVisible: false, }} name='Register' component={RegisterScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </Provider>
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
