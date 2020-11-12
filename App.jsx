import React from "react";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';

import WelcomeScreen from "./app/screens/WelcomeScreen";
import ProfileScreen from './app/screens/ProfileScreen';
import LoginForm from "./app/components/LoginForm";
import TaskScreen from "./app/screens/TaskScreen";
import UserRegisterScreen from "./app/screens/UserRegisterScreen";
import RegisterSelectScreen from "./app/screens/RegisterSelectScreen";
import MainRequestScreen from "./app/screens/MainRequestScreen"
import NewRequestScreen from "./app/screens/NewRequestScreen";
import AllRequestScreen from "./app/screens/AllRequestScreen";
import EmployeePortfolioScreen from "./app/screens/EmployeePortfolioScreen";
import UserPayChecksScreen from "./app/screens/UserPayChecksScreen";
import WorkingTimeReportScreen from "./app/screens/WorkingTimeReportScreen";
import SettingsScreen from "./app/screens/SettingsScreen";
import { globalObject } from "./app/src/globalObject";

const screens = {

  WelcomeScreen:{
    screen:WelcomeScreen,
    navigationOptions:{
      headerShown: false
    }
  },
  SettingsScreen:{
    screen:SettingsScreen,
    navigationOptions:{
      headerShown: false
    }
  },
  TaskScreen:{
    screen:TaskScreen,
    navigationOptions:{
      headerShown: false
    }
  },
  EmployeePortfolioScreen:{
    screen:EmployeePortfolioScreen,
    navigationOptions:{
      headerShown: false
    }
  },
  UserPayChecksScreen:{
    screen:UserPayChecksScreen,
    navigationOptions:{
      headerShown: false
    }
  },
  WorkingTimeReportScreen:{
    screen:WorkingTimeReportScreen,
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
    headerShown: false,
  }
  },
  AllRequestScreen:
  {
    screen:AllRequestScreen,
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
  const AppContainer = createAppContainer(createStackNavigator(screens));
  listen = (r) =>{
    console.log(r);
  }
  globalObject.AddNotificationListener(listen)

  return (<AppContainer/>);
}

