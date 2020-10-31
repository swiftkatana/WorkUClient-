import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { ClippingRectangle, StyleSheet, Text, View } from "react-native";
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// just a icon libary 
import Ionicons from 'react-native-vector-icons/Ionicons';

import store from "./app/src/store";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import RegisterScreen from "./app/screens/RegisterScreen";

const Tab = createBottomTabNavigator();


export default function App() {
  useEffect(() => {

  })

  const getHeaderTitle = (route) => {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

    switch (routeName) {
      case 'Feed':
        return 'News feed';
      case 'Profile':
        return 'My profile';
      case 'Account':
        return 'My account';
    }
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{ showLabel: false }} initialRouteName='Login'
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              size = 40

              if (route.name === 'Register') {

              } else if (route.name === 'Login') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            }, title: (d) => {
              if (route.name === 'Register') {
                d = <Text></Text>
              } else if (route.name === 'Login') {
                d = <Text>להתחבר</Text>
              }
              return d
            }, tabBarAccessibilityLabel: (r) => {

            }
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'green',
          }}
        >
          <Tab.Screen options={{ tabBarVisible: false, }} name='Login' component={WelcomeScreen} />
          <Tab.Screen options={{ tabBarVisible: true, }} name='Register' component={RegisterScreen} />
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
