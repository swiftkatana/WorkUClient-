import React, { useEffect,useState } from "react";
import { AppState,ClippingRectangle, StyleSheet, Text, View,Button,TextInput } from "react-native";
// just a icon libary 
import WelcomeScreen from "./app/screens/WelcomeScreen";
import ProfileScreen from './app/screens/ProfileScreen';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import {gobalObject} from "./app/src/gobalObject";
import LoginForm from "./app/components/LoginForm";
import MainScreen from "./app/screens/MainScreen";
const screens = {
  WelcomeScreen:{
    screen :WelcomeScreen,
    navigationOptions:{
      headerShown: false
    }
  },
  ProfileScreen:{
    screen:ProfileScreen,
    navigationOptions:{
      headerShown: false
    }
  },

  loginScreen:{
    screen:LoginForm,
    navigationOptions:{
      headerShown: false
    }
  },
  MainScreen:{
    screen:MainScreen,
    navigationOptions:{
      headerShown: false
    }
  }


}

const AppContainer = createAppContainer(createStackNavigator(screens));



listen = (r) =>{
  console.log(r.notification.request.content.data);
}
Notifications.addNotificationResponseReceivedListener(listen);

async function registerForPushNotificationsAsync() {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync();
    gobalObject.id = token.data;
  }
};

registerForPushNotificationsAsync();

export default function App() {
  return (<AppContainer/>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});



const s = StyleSheet.create({
  continer:
  {
      paddingTop :50,
  },
  info:
  {
      fontSize:15,
      textAlign:"right",
      
  },
  Img:
  {
      marginTop:40,
      position : "absolute",
      height :50,
      width:50
  }
  })
  