import { Image, StyleSheet, Text, View, Dimensions, Button } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { globalObject } from "../src/globalObject"
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
window.navigator.userAgent = "react-native"; // for some versions of socketio this is needed also in React Native
import io from 'socket.io-client/dist/socket.io'; // note the /dist/ subdirectory (socket.io-client v.2.1.1)!
import ip from '../src/api/serverIP';

function GetGreetingMsg() {
    var msg;
    var hours = new Date().getHours();
    if (hours >= 6 && hours < 12)
        msg = "בוקר טוב";
    else if (hours >= 12 && hours < 18)
        msg = "צהורים טובים";
    else if (hours >= 18 && hours < 23)
        msg = "ערב טוב";
    else
        msg = "לילה טוב";
    return msg;

}

function Greeting({ navigation, style }) {

    useEffect(() => {
        ( async ()=>{
      
          globalObject.socket.on('newTaskGot'+globalObject.User.email,(data)=>{
            globalObject.User.tasks.processing[data._id]=data
            console.log('daad')
          })
      
        })();
      
        },[])

    const [GreetingMsg, SetGreeting] = useState("");
    useEffect(() => {
        const id = setInterval(() => {
            SetGreeting(GetGreetingMsg());
        }, 3600);
        SetGreeting(GetGreetingMsg());
        return () => { clearInterval(id) };
    }, [])
    return (

        <View style={{ ...styles.view, ...style.view }}>
            <Text style={styles.GreetingText}> {GreetingMsg}, {globalObject.User.firstName}</Text>
            <TouchableOpacity style={styles.settings} onPress={() => navigation.navigate("SettingsScreen")}>
                <Image style={styles.tinyLogo} source={require('../assets/settings_icon.png')} />
                <Text style={styles.settingsFont}>הגדרות</Text>
            </TouchableOpacity>
        </View>

    )

}


const styles = StyleSheet.create(
    {
        view:
        {
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 30,
            width: Dimensions.get('window').width,
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            textAlign: "right",
            borderRadius: 2,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 85,
            borderBottomLeftRadius: 0,

        },
        GreetingText:
        {
            fontSize: 16,
            color: "seashell",
            fontWeight: "bold",
            paddingRight: 30,
            marginTop: 45,
        },
        settings:
        {
            marginLeft: 5,
            borderRadius: 25,
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 35,
        },
        settingsFont:
        {
            fontSize: 11,
            color: "seashell",
            textAlign: 'center',
            fontWeight: "bold",
        },
        tinyLogo: {
            width: 30,
            height: 30,
        },
    }
)

const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Greeting)