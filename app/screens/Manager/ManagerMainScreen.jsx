import React, { useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Greeting from "../../components/Greeting";
import CompanyCode from "../../components/CompanyCode";
import TaskBoard from "../../components/TaskBoard";
import ManagerNaviButton from "../../components/ManagerNaviButton";
import * as Notifications from "expo-notifications";
import { globalObject } from "../../src/globalObject";

export default function Main({ navigation }) {
  const handleListener = ({ data }) => {
    switch (data.type) {
      case "updateTask":
        Alert.alert("you got notification", data.type);
        delete globalObject.User.tasks.processing[data.data._id];
        globalObject.User.tasks.completed[data.data._id] = data.data;
        break;

      case "newPersonalRequest":
        Alert.alert("you got notification", data.type);
        globalObject.User.personalRequests[data.data._id] = data.data;

        break;
      case "updateTaskVoice":
        Alert.alert("you got notification", data.type);
        globalObject.User.tasks.processing[data.data.taskId].audios.push(
          data.data
        );
        break;

      case "gotNewShiftPen":
        globalObject.company.employees[data.data.email].shift = data.data;
        break;

      case "joinCompany":
        globalObject.company.employees[data.data.email] = data.data;
        break;
      default:
        Alert.alert("you got not handler notification", data.type);
        break;
    }
  };

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => handleListener(notification.request.content)
    );
    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => handleListener(response.notification.request.content)
    );
    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Greeting navigation={navigation} />
      <CompanyCode navigation={navigation} />
      <TaskBoard navigation={navigation} />
      <ManagerNaviButton navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
    },
  }
)
