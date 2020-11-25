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

      globalObject.sendSocketMessage("joinCompany", user, user.managerEmail);
      globalObject.sendNotification(user.managerEmail, user, "עובד חדש", `עובד בשם ${user.fullName} הוסף`, "joinCompany");
      navigation.navigate('EmployeeMainScreen');
    }

  }

  const user = globalObject.User;
  return (

    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={globalObject.styles.regTitleText}>שלום, {user.firstName} </Text>

          <Text style={{ ...globalObject.styles.signupOrLoginText, fontWeight: 'bold' }}>חבר/י את חשבונך לבית עסק רשום:</Text>
        </View>
        <TextInput onChangeText={SetCodeText} style={globalObject.styles.regInputBox} placeholder='קוד גישה לבית העסק' />
        <TouchableOpacity onPress={() => pressHandler(codeText)} style={globalObject.styles.regButton}>
          <Text style={globalObject.styles.regButtonText}>התחל לעבוד</Text>
        </TouchableOpacity>
        <Text style={globalObject.styles.signupOrLoginText}>* אין לך קוד? בקש/י מהמנהל שלך</Text>
      </View>
      <View style={styles.signupTextCont}>
        <Text style={{ ...globalObject.styles.signupOrLoginText, fontWeight: 'bold' }}> מנהל/ת עסק?</Text>
        <Text style={{ ...globalObject.styles.signupOrLoginText, fontWeight: 'bold' }}> להרשמת בית עסק חדש במערכת</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterCompanyScreen')}>
          <Text style={globalObject.styles.signupOrLoginButton}>לחץ כאן</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flexGrow: 1,
    paddingVertical: responsiveHeight(6),
    justifyContent: 'center',
    alignItems: 'center'
  },

  signupTextCont: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    // paddingVertical: 16,
  },
});

