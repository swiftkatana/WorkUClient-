import { globalObject } from "../../src/globalObject"
import React, { useEffect } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import Greeting from "../../components/Greeting"
import Timer from "../../components/Timer"
import TaskBoard from "../../components/TaskBoard"
import EmployeeNaviButton from "../../components/EmployeeNaviButton"
import * as Notifications from "expo-notifications";
import { connect } from "react-redux"

function Main({ style, navigation }) {

    const handleListener = ({ data }) => {
        console.log()
        switch (data.type) {

            case 'newTask':
                Alert.alert('you got notification', data.type);

                globalObject.User.tasks.processing[data.data._id] = data.data;
                break;

            case 'updatePersonalReq':
                Alert.alert('you got notification', data.type);

                globalObject.User.personalRequests[data.data._id] = data.data
                break;
            case 'updateTask':
                Alert.alert('you got notification', data.type);
                globalObject.User.tasks.processing[data.data.taskId].audios.push(data.data);

                break;
            default:
                Alert.alert('you got not handler notification', data.type);
                break;
        }
    }

    useEffect(() => {

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
            }),
        });
        const subscription1 = Notifications.addNotificationResponseReceivedListener(response => handleListener(response.notification.request.content));
        const subscription2 = Notifications.addNotificationReceivedListener(notification => handleListener(notification.request.content));
        return () => {
            subscription1.remove();
            subscription2.remove();
        }
    }, []);

    return (
        <View style={styles.container}>
            <Greeting navigation={navigation} />
            <Timer style={style} />
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

const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)