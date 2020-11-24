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
      <Text style={globalObject.styles.regTitleText}>רישום בית עסק</Text>
      <TextInput value={companyName} onChangeText={setCompanyName} style={globalObject.styles.regInputBox} placeholder="שם חברה" />
      <TouchableOpacity style={globalObject.styles.regButton} onPress={() => pressHandler(companyName)}>
        <Text style={globalObject.styles.regButtonText}>אישור</Text>
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
});