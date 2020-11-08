import {globalObject} from "../src/globalObject"
import React, { Component,useEffect,useState } from 'react'
import { Text, View ,StyleSheet,Dimensions} from 'react-native'
import Greeting from "../components/Greeting"
import Timer from "../components/Timer"
import Board from "../components/Board"
import MainScreenAction from "../components/MainScreenAction"
export default function MainScreen()
{
    return (
        <View style={styles.container}>
            <Greeting/>
            <Timer/>
            <Board/>
            <MainScreenAction/>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            marginTop:50,
            height: Dimensions.get('window').height -10,
            
            
            
          },


    }
)