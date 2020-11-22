import React from "react";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from "react-redux";
import store from "./app/src/store";
// employee
import EmployeeMainScreen from "./app/screens/Employee/EmployeeMainScreen"
import MainRequestScreen from "./app/screens/Employee/MainRequestScreen"
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


//reg and log
import RegisterUserScreen from "./app/screens/RegistrationAndLogin/RegisterUserScreen";
import SelectionScreen from "./app/screens/RegistrationAndLogin/SelectionScreen";
import RegisterCompanyScreen from "./app/screens/RegistrationAndLogin/RegisterCompanyScreen";
import LoginScreen from "./app/screens/RegistrationAndLogin/LoginScreen";

//Global
import SettingsScreen from "./app/screens/SettingsScreen";
import PreferencesOfUserForStyleScreen from './app/screens/PreferencesOfUserForStyleScreen'
import ContactsScreen from "./app/screens/ContactsScreen";
import DisplaySingleContactScreen from "./app/screens/DisplaySingleContactScreen";
import ChangeProfileImageScreen from './app/screens/ChangeProfileImageScreen';


// managar
import ManagerMainScreen from "./app/screens/Manager/ManagerMainScreen";
import ManagerManageRequestsScreen from "./app/screens/Manager/ManagerManageRequestsScreen";
import ManagerToolsScreen from "./app/screens/Manager/ManagerToolsScreen";
import HandleSingleRequestScreen from "./app/screens/Manager/HandleSingleRequestScreen";
import NewTaskScreen from "./app/screens/Manager/NewTaskScreen";
import GetCodeForRes from './app/screens/RegistrationAndLogin/GetCodeForResScreen';
import RestPasswordWithCode from './app/screens/RegistrationAndLogin/RestPasswordWithCodeScreen';
import ChangePasswordScreen from './app/screens/RegistrationAndLogin/ChangePasswordScreen';
import OldTasksScreen from "./app/screens/Manager/OldTasksScreen";



const listScreen =
  [
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
    { ChangeProfileImageScreen: ChangeProfileImageScreen },
    { OldTasksScreen: OldTasksScreen },
  ];
var screens = {}

export default function App() {
  for (let i = 0; i < listScreen.length; i++) {
    var keyNames = Object.keys(listScreen[i]);
    screens[keyNames[0]] = { screen: listScreen[i][keyNames[0]], navigationOptions: { headerShown: false } }
  }
  const AppContainer = createAppContainer(createStackNavigator(screens));
  return (<Provider store={store}><AppContainer /></Provider>);
}

