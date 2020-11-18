import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Greeting from "../../components/Greeting"
import CompanyCode from "../../components/CompanyCode"
import TaskBoard from "../../components/TaskBoard"
import ManagerNaviButton from "../../components/ManagerNaviButton"
import * as Notifications from "expo-notifications";

export default function Main({ navigation }) {


    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener(notification => {
            console.log(notification);
        });
        return () => subscription.remove();
    }, []);

    return (
        <View style={styles.container}>
            <Greeting navigation={navigation} />
            <CompanyCode navigation={navigation} />
            <TaskBoard navigation={navigation} />
            <ManagerNaviButton navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            //backgroundColor:"white"     
        },
    }
)