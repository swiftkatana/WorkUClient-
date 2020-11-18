import { globalObject } from "../../src/globalObject"
import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Greeting from "../../components/Greeting"
import Timer from "../../components/Timer"
import TaskBoard from "../../components/TaskBoard"
import EmployeeNaviButton from "../../components/EmployeeNaviButton"
import * as Notifications from "expo-notifications";

export default function Main({ navigation }) {

    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener(notification => {
            console.log(notification);
        });
        return () => subscription.remove();
    }, []);

    globalObject.Navigation = navigation;
    return (
        <View style={styles.container}>
            <Greeting />
            <Timer />
            <TaskBoard />
            <EmployeeNaviButton />
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