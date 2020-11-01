import React from "react";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View,Button,Alert } from "react-native";
import {store,globalData} from "./app/src/store";
import ProfileScreen from "./app/screens/ProfileScreen";
export default function App() {
  return <ProfileScreen info={
    {
      "permission": {
          "ceo": "ceo"
      },
      "role": "מנהל",
      "email": "danial1029@hotmail.com",
      "firstName": "דניאל",
      "lastName": "לוי",
      "imageProfile": "http://84.108.77.60:1029/images/defaultProfile.png",
      "company": {
          "name": "דניאל בעמ",
          "status": "אושר"
      },
      "fullName": "דניאל לוי",
      "DOYBC": "2020-10-30T12:05:28.517Z"
  }
  } />
  return (
    
    <Provider store={store}>

      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.LeftTop} >
        <Button  title="Press me" onPress={() => Alert.alert('Simple Button pressed')}/>
        </View>
      </View>
      

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
  LeftTop: {
    position:"absolute",
    left:25,
    top:50,
  },
});




//