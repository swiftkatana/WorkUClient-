import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "@react-native-community/picker";
import { globalObject } from "../../src/globalObject";
import requestList from "../../src/api/apiKeys";
import { Audio } from 'expo-av';
import * as Permissions from "expo-permissions";
import VoiceRecording from "../../components/VoiceRecording";
const SendUpdateTask = async (id, status) => {
    var res = await globalObject.SendRequest(requestList.userUpdateTaskUrl, {
        _id: id,
        email: globalObject.User.email,
        complete: status,
    });
    if (res) {
        if (status == "completed") {
            globalObject.User.tasks.completed[id] = globalObject.User.tasks.processing[id];
            delete globalObject.User.tasks.processing[id];
            globalObject.Navigation.navigate("ManagerMainScreen");
        }
    }
};

export default function Main({ navigation }) {

    
    const item = navigation.state.params.item;
    console.log(item);
    const [status, SetStatus] = useState("completed");
    return (
        <View style={styles.view}>
            <TouchableOpacity
                style={styles.exitButton}
                onPress={() => globalObject.Navigation.pop()}
            >
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.header}>משימה</Text>

                    <Text style={styles.subTitle}>דחיפות: {item.priority}</Text>
                    <Text style={styles.subTitle}>תקציר: {item.title}</Text>
                    <View style={styles.scrollView}>
                        <ScrollView>
                            <Text style={styles.bodyHeader}>פירוט:</Text>
                            <Text style={styles.subTitle}>{item.description}</Text>
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.picker}>
                    <Text style={styles.subTitle}>סטטוס משימה:</Text>

                    <Picker
                        prompt="test"
                        mode="dropdown"
                        selectedValue={status}
                        onValueChange={(itemValue) => SetStatus(itemValue)}
                    >
                        <Picker.Item
                            style={styles.pickerItem}
                            label="המשימה הושלמה"
                            value="completed"
                        />
                        <Picker.Item
                            style={styles.pickerItem}
                            label="המשימה לא הושלמה"
                            value="uncompleted"
                        />
                    </Picker>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => SendUpdateTask(item.id, status)}
                    >
                        <Text style={styles.buttonText}>שלח עדכון</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <VoiceRecording/>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: "#7f71e3",
    },
    container: {
        alignItems: "flex-end",
    },
    scrollView:
    {
        height: 150,
        marginTop: 30,
        justifyContent: 'flex-end',
        textAlign: "right",
    },
    header: {
        margin: 20,
        marginRight: 30,
        fontSize: 28,
        color: "seashell",
        textDecorationLine: "underline",
    },
    subTitle: {
        marginRight: 30,
        marginLeft: 30,
        fontSize: 16,
        color: "seashell",
    },
    descriptionStyle: {
        textAlign: "right",
        marginRight: 30,
        marginLeft: 30,
        fontSize: 16,
        color: "seashell",
    },
    bodyHeader: {

        marginRight: 30,
        marginLeft: 30,
        fontSize: 16,
        color: "seashell",
    },
    itemList: {
        textAlign: "right",
        width: 300,
        textAlign: "right",
        justifyContent: "center",
    },
    infoContainer: {},
    inputBoxContainer: {},
    inputBox: {
        width: 300,
        height: 100,
        backgroundColor: "#ededed",
        borderRadius: 25,
        marginVertical: 60,
        marginHorizontal: 30,
        textAlign: "right",
    },
    picker: {
        textAlign: "right",
        justifyContent: "center",
    },
    itemList: {
        textAlign: "right",
        width: 300,
        textAlign: "right",
        justifyContent: "center",
    },
    pickerItem: {
        fontSize: 16,
        color: "green",
        textAlign: "right",
        justifyContent: "center",
    },
    button: {
        width: 300,
        backgroundColor: "#6f61ca", // #6357b5
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 30,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "500",
        color: "seashell",
        textAlign: "center",
    },
    exitButton: {
        marginLeft: 30,
        paddingTop: 60,
    },
    exitText: {
        fontSize: 30,
        color: "seashell",
    },
});
