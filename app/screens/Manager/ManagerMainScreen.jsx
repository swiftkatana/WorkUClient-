import React, { useEffect } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import Greeting from "../../components/Greeting"
import CompanyCode from "../../components/CompanyCode"
import TaskBoard from "../../components/TaskBoard"
import ManagerNaviButton from "../../components/ManagerNaviButton"
import * as Notifications from "expo-notifications";

export default function Main({ navigation }) {


    const handleListener = ({ data, body }) => {
        switch (body) {

            case 'updateTask':
                Alert.alert('you got notification', body);
                delete globalObject.User.tasks.processing[data._id]
                globalObject.User.tasks.completed[data._id] = data;
                break;

            case 'newPersonalRequest':
                Alert.alert('you got notification', body);
                globalObject.User.personalRequests[data._id] = data;

                break;

            default:
                Alert.alert('you got not handler notification', body);
                break;
        }

    }

    useEffect(() => {

        const subscription1 = Notifications.addNotificationReceivedListener(notification => handleListener(notification.request.content));
        const subscription2 = Notifications.addNotificationResponseReceivedListener(response => handleListener(response.notification.request.content));
        return () => {
            subscription1.remove();
            subscription2.remove();
        }
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