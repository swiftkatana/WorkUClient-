import React from "react";
import { NativeModules,Platform,I18nManager } from "react-native";
// just a icon libary 
import WelcomeScreen from "./app/screens/WelcomeScreen";
import ProfileScreen from './app/screens/ProfileScreen';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import {globalObject} from "./app/src/globalObject";
import LoginForm from "./app/components/LoginForm";
import TaskScreen from "./app/screens/TaskScreen";
import UserRegisterScreen from "./app/screens/UserRegisterScreen";
import RegisterSelectScreen from "./app/screens/RegisterSelectScreen";
import MainRequestScreen from "./app/screens/MainRequestScreen"
import NewRequestScreen from "./app/screens/NewRequestScreen";

const screens = {

  TaskScreen:{
    screen:TaskScreen,
    navigationOptions:{
      headerShown: false
    }
  },
  WelcomeScreen:{
    screen :WelcomeScreen,
    navigationOptions:{
      headerShown: false
    }
  },
  MainRequestScreen:{
    screen:MainRequestScreen,
    navigationOptions:{
      headerShown: false
    }
  },
  NewRequestScreen:
  {
  screen:NewRequestScreen,
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

  UserRegisterScreen:{
    screen:UserRegisterScreen,
    navigationOptions:{
      headerShown: false
    }
  },
  RegisterSelectScreen:{
    screen:RegisterSelectScreen,
    navigationOptions:{
      headerShown: false
    }
  },


}








export default function App() {


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
      globalObject.id = token.data;
    }
  };
  registerForPushNotificationsAsync();

  const AppContainer = createAppContainer(createStackNavigator(screens));
  listen = (r) =>{
    console.log(r);
  }
  Notifications.addNotificationResponseReceivedListener(listen);

  globalObject.language =
          Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
            : NativeModules.I18nManager.localeIdentifier;

  return (<AppContainer/>);
}

