import React, { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { globalObject } from "../../src/globalObject";
import requestList from "../../src/api/apiKeys";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

export default function Main({ navigation }) {


  const [codeText, SetCodeText] = useState("");

  const pressHandler = async () => {
    const user = await globalObject.SendRequest(requestList.userJoinCompanyUrl, { email: globalObject.User.email, code: codeText.trim() });
    if (user) {

      globalObject.User = user;
      navigation.navigate('EmployeeMainScreen');
    }

  }

  const user = globalObject.User;
  return (

    <View style={styles.container}>
      <View style={styles.container, { flex: 1 }}>
        <Text style={styles.GreetingText}>שלום, {user.firstName} </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText, { fontWeight: 'bold', fontSize: 16, marginTop: 120, }}>חבר/י את חשבונך לבית עסק רשום:</Text>
        </View>
        <TextInput onChangeText={SetCodeText} style={styles.inputBox} placeholder='קוד גישה לבית העסק' />
        <TouchableOpacity onPress={() => pressHandler(codeText)} style={styles.button}>
          <Text style={styles.buttonText}>התחל לעבוד</Text>
        </TouchableOpacity>
        <Text style={styles.signupText}>* אין לך קוד? בקש/י מהמנהל שלך</Text>
      </View>
      <View style={styles.signupTextCont}>
        <Text style={styles.signupText, { fontWeight: 'bold', fontSize: 16, }}> מנהל/ת עסק?</Text>
        <Text style={styles.signupText}> להרשמת בית עסק חדש במערכת</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterCompanyScreen')}>
          <Text style={styles.signupButton}>לחץ כאן</Text>
        </TouchableOpacity>
        <Text style={styles.signupButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flexGrow: 1,
    paddingVertical: responsiveHeight(1),
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBox: {
    width: 300,
    height: 60,
    backgroundColor: '#ededed',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginVertical: 10,
    textAlign: "right"
  },
  button: {
    width: 300,
    backgroundColor: "#7f71e3",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'seashell',
    textAlign: 'center',
  },
  signupTextCont: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  signupText: {
    fontSize: 16,
    marginTop: 30,
  },
  signupButton: {
    paddingRight: 5,
    color: "#7f71e3",
    fontSize: 18,
    fontWeight: "bold",
  },
  GreetingText: {
    marginTop: 110,
    fontSize: 22,
    color: '#000000',
    fontWeight: "bold"
  }

});

