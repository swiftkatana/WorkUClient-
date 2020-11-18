import { globalObject } from "../../src/globalObject"
import React from 'react'
import { View, StyleSheet } from 'react-native'
import Greeting from "../../components/Greeting"
import Timer from "../../components/Timer"
import TaskBoard from "../../components/TaskBoard"
import EmployeeNaviButton from "../../components/EmployeeNaviButton"
export default function Main({ navigation }) {

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