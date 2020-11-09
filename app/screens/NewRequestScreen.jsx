import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Picker } from 'react-native-picker-dropdown'
import { userSendPersonalRequest } from '../src/api/apiKeys'
import { globalObject } from '../src/globalObject'

// send {type,body,fullName,email}
// recive {_id,}
const SendTask = async (type,body)=>
{
    return;
    res = await globalObject.SendRequest(userSendPersonalRequest,{type:type,body:body,fullName:globalObject.User.fullName,email:globalObject.User.email})

}

export default function NewRequestScreen() {

    const [type, SetType] = useState("חולי");
    const [text, SetText] = useState("");
    return (
        <View style={styles.view}>
            <View> 
                <Text style={styles.header}>
                   בקשה חדשה:
                </Text>
            </View>

            <View>
                <Text >סוג הבקשה</Text>
                <Picker selectedValue={type} style={styles.itemList}  onValueChange={(itemValue) => SetType(itemValue)}>
                    <Picker.Item label="חולי" value="java" />
                    <Picker.Item label="חופש" value="js" />
                </Picker>
            </View>

            <View>
                <Text >גוף הבקשה (אוציונלי):</Text>
                <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => SetText(text)}
                value={text}
                />
            </View>

            <TouchableOpacity onPress={()=>SendTask(type,text)}>
                <Text >שלח בקשה</Text> 
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    view:
    {
        marginTop:50,
    },
    header:
    {

       
    },
    itemList:
    {
        textAlign:"right",
    },

})
