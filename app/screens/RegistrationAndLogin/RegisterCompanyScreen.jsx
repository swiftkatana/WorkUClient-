import React, { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import requestList from "../../src/api/apiKeys";
import { globalObject } from "../../src/globalObject";



export default function Main({ navigation }) {
  const [companyName, setCompanyName] = useState('')
  const pressHandler = async () => {
    if (!companyName) {
      title = "ההרשמה נכשלה";
      msg = "אחד או יותר מהשדות ריקים, נסו שנית"
      alertButton = [{ text: "הבנתי" }];
      Alert.alert(title, msg, alertButton, { cancelable: false });
    } else {
      const company = await globalObject.SendRequest(requestList.createCompanyUrl, { companyName, email: globalObject.User.email });
      if (company) {
        globalObject.User.joinCode = company.joinCode;
        globalObject.User.company = companyName;
        globalObject.company = company;

        navigation.navigate('ManagerMainScreen');
      }

    }
  }

  return (

    <View style={styles.container}>
      <Text style={styles.logoText}>רישום בית עסק</Text>
      <TextInput value={companyName} onChangeText={setCompanyName} style={styles.inputBox} placeholder="שם חברה" />
      <TouchableOpacity style={styles.button} onPress={() => pressHandler(companyName)}>
        <Text style={styles.buttonText}>אישור</Text>
      </TouchableOpacity>
    </View>


  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  logoText: {
    marginVertical: 20,
    fontSize: 22,
    color: '#000000',
    fontWeight: "bold"
  }

});