import { globalObject } from "../../src/globalObject"
import React from 'react'
import { View, StyleSheet } from 'react-native'
import Greeting from "../../components/Greeting"
import CompanyCode from "../../components/CompanyCode"
import TaskBoard from "../../components/TaskBoard"
import ManagerNaviButton from "../../components/ManagerNaviButton"

export default function Main({ navigation }) {

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