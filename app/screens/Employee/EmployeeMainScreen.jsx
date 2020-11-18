import { globalObject } from "../../src/globalObject"
import React, { useEffect } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import Greeting from "../../components/Greeting"
import Timer from "../../components/Timer"
import TaskBoard from "../../components/TaskBoard"
import EmployeeNaviButton from "../../components/EmployeeNaviButton"
import * as Notifications from "expo-notifications";

export default function Main({ navigation }) {


    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener(notification => {
            let { data, body } = notification.request.content;
            console.log(notification.request.content)
            switch (body) {

                case 'newTask':
                    Alert.alert('you got notification', body);

                    globalObject.User.tasks.processing[data._id] = data;
                    break;

                case 'updatePersonalReq':
                    Alert.alert('you got notification', body);

                    globalObject.User.personalRequests[data._id] = data
                    break;
                default:
                    Alert.alert('you got not handler notification', body);
                    break;
            }
        });
        return () => subscription.remove();
    }, []);

    return (
        <View style={styles.container}>
            <Greeting navigation={navigation} />
            <Timer navigation={navigation} />
            <TaskBoard navigation={navigation} />
            <EmployeeNaviButton navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container:
        {
            flex: 1,
        },
    }
)