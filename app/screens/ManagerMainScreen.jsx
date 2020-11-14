import {globalObject} from "../src/globalObject"
import React from 'react'
import {View ,StyleSheet} from 'react-native'
import Greeting from "../components/Greeting"
import CompanyCode from "../components/CompanyCode"
import TaskBoard from "../components/TaskBoard"
import ManagerNaviButton from "../components/ManagerNaviButton"

export default function ManagerMainScreen({navigation})
{
    globalObject.Navigation = navigation;
    return (
        <View style={styles.container}>
            <Greeting/>
            <CompanyCode/>
            <TaskBoard/>
            <ManagerNaviButton/>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex:1,
            //backgroundColor:"white"     
          },
    }
)