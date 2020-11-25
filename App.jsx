import React, { useEffect, useRef, useState } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Provider } from "react-redux";
window.navigator.userAgent = "react-native"; // for some versions of socketio this is needed also in React Native
//import io from "socket.io-client/dist/socket.io"; // note the /dist/ subdirectory (socket.io-client v.2.1.1)!
import socketClient from "socket.io-client";
const io = require("socket.io-client");
const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000,
  secure: false,
  transports: ["websocket"], // you need to explicitly tell it to use websockets
};
import ip from "./app/src/api/serverIP";
import store from "./app/src/store";
import { I18nManager, AppState } from "react-native";
import { Restart } from "fiction-expo-restart";
// employee
import EmployeeMainScreen from "./app/screens/Employee/EmployeeMainScreen";
import MainRequestScreen from "./app/screens/Employee/MainRequestScreen";
import NewRequestScreen from "./app/screens/Employee/NewRequestScreen";
import EmployeePortalScreen from "./app/screens/Employee/EmployeePortalScreen";
import EmployeePayChecksScreen from "./app/screens/Employee/EmployeePayChecksScreen";
import WorkingTimeReportScreen from "./app/screens/Employee/WorkingTimeReportScreen";
import EmployeeUpdateTaskScreen from "./app/screens/Employee/EmployeeUpdateTaskScreen";
import DisplayRequestScreen from "./app/screens/Employee/DisplayRequestScreen";
import AllRequestScreen from "./app/screens/Employee/AllRequestScreen";
import ManualWorkingTime from "./app/screens/Employee/ManualWorkingTime";
import EmployeeShiftsScreen from "./app/screens/Employee/EmployeeShiftsScreen";
import employeeStatisticScreen from "./app/screens/Employee/employeeStatisticScreen";
import TaskUpdateVoiceScreen from "./app/screens/Employee/TaskUpdateVoiceScreen";
import EmployeeCurrentShifts from "./app/screens/Employee/EmployeeCurrentShifts";

//reg and log
import RegisterUserScreen from "./app/screens/RegistrationAndLogin/RegisterUserScreen";
import SelectionScreen from "./app/screens/RegistrationAndLogin/SelectionScreen";
import RegisterCompanyScreen from "./app/screens/RegistrationAndLogin/RegisterCompanyScreen";
import LoginScreen from "./app/screens/RegistrationAndLogin/LoginScreen";
import GetCodeForRes from "./app/screens/RegistrationAndLogin/GetCodeForResScreen";
import RestPasswordWithCode from "./app/screens/RegistrationAndLogin/RestPasswordWithCodeScreen";
import ChangePasswordScreen from "./app/screens/RegistrationAndLogin/ChangePasswordScreen";

//Global
import SettingsScreen from "./app/screens/SettingsScreen";
import PreferencesOfUserForStyleScreen from "./app/screens/PreferencesOfUserForStyleScreen";
import ContactsScreen from "./app/screens/ContactsScreen";
import DisplaySingleContactScreen from "./app/screens/DisplaySingleContactScreen";
import ChangeProfileImageScreen from "./app/screens/ChangeProfileImageScreen";

// managar
import ManagerMainScreen from "./app/screens/Manager/ManagerMainScreen";
import ManagerManageRequestsScreen from "./app/screens/Manager/ManagerManageRequestsScreen";
import ManagerToolsScreen from "./app/screens/Manager/ManagerToolsScreen";
import HandleSingleRequestScreen from "./app/screens/Manager/HandleSingleRequestScreen";
import NewTaskScreen from "./app/screens/Manager/NewTaskScreen";
import OldTasksScreen from "./app/screens/Manager/OldTasksScreen";
import ManageShifts from "./app/screens/Manager/ManageShifts";
import DisplayWorkingTimeReportOfEmployee from "./app/screens/Manager/DisplayWorkingTimeReportOfEmployee";
import { globalObject } from "./app/src/globalObject";

const listScreen = [
  { LoginScreen: LoginScreen },
  { PreferencesOfUserForStyleScreen: PreferencesOfUserForStyleScreen },
  { SettingsScreen: SettingsScreen },
  { HandleSingleRequestScreen: HandleSingleRequestScreen },
  { ManagerToolsScreen: ManagerToolsScreen },
  { ManagerManageRequestsScreen: ManagerManageRequestsScreen },
  { ManagerMainScreen: ManagerMainScreen },
  { RegisterCompanyScreen: RegisterCompanyScreen },
  { SelectionScreen: SelectionScreen },
  { RegisterUserScreen: RegisterUserScreen },
  { AllRequestScreen: AllRequestScreen },
  { DisplayRequestScreen: DisplayRequestScreen },
  { EmployeeUpdateTaskScreen: EmployeeUpdateTaskScreen },
  { WorkingTimeReportScreen: WorkingTimeReportScreen },
  { EmployeePortalScreen: EmployeePortalScreen },
  { EmployeePayChecksScreen: EmployeePayChecksScreen },
  { NewRequestScreen: NewRequestScreen },
  { MainRequestScreen: MainRequestScreen },
  { EmployeeMainScreen: EmployeeMainScreen },
  { ManualWorkingTime: ManualWorkingTime },
  { NewTaskScreen: NewTaskScreen },
  { EmployeeShiftsScreen: EmployeeShiftsScreen },
  { employeeStatisticScreen: employeeStatisticScreen },
  { GetCodeForRes: GetCodeForRes },
  { RestPasswordWithCode: RestPasswordWithCode },
  { ChangePasswordScreen: ChangePasswordScreen },
  { TaskUpdateVoiceScreen: TaskUpdateVoiceScreen },
  { ContactsScreen: ContactsScreen },
  { DisplaySingleContactScreen: DisplaySingleContactScreen },
  { OldTasksScreen: OldTasksScreen },
  { EmployeeCurrentShifts: EmployeeCurrentShifts },
  { ManageShifts: ManageShifts },
  { DisplayWorkingTimeReportOfEmployee: DisplayWorkingTimeReportOfEmployee },
];
var screens = {};




export default function App() {


  if (I18nManager.isRTL == true) {
    I18nManager.forceRTL(false);
    I18nManager.allowRTL(false);
    Restart();
  }




  for (let i = 0; i < listScreen.length; i++) {
    var keyNames = Object.keys(listScreen[i]);
    screens[keyNames[0]] = {
      screen: listScreen[i][keyNames[0]],
      navigationOptions: { headerShown: false },
    };
  }
  const AppContainer = createAppContainer(createStackNavigator(screens));
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
