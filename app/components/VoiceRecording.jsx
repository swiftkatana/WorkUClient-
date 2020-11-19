import React, { useState,useRef } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Audio } from 'expo-av';
import { Recording } from "expo-av/build/Audio";
import * as Permissions from "expo-permissions";

const recording = new Audio.Recording();

export default function VoiceRecording() {
    const [haveRecordingPermissions, setHaveRecordingPermissions] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    const [status, SetStatus] = useState("completed");
    //const recording = useRef(new Audio.Recording());

    const askForPermissions = async () => {
        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        setHaveRecordingPermissions(response.status === "granted");
    };
    
    const recordingHandler = async() =>{
        if(!(Permissions.getAsync(Permissions.AUDIO_RECORDING) === "granted"))
        {
            askForPermissions();
        }
        if(haveRecordingPermissions){
            try {
                await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                await recording.startAsync();
                setIsRecording(true);
                console.log("You are now recording!");
            } catch (error) {
                //console.log(error)
            console.log(error);
            setIsRecording(false);
            }
        }else{
            console.log("no premission!");
            setIsRecording(false);
        }
    };
    const stopRecordingHandler = async() =>{
        console.log("no 1111111111!");
        try {
            await this.recording.stopAndUnloadAsync();
        } catch (error) {
          
        }
    };

    
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.button} onPressIn={() => recordingHandler()} onPressOut={() => stopRecordingHandler()}>
                <Image style={styles.tinyLogo} source={require('../assets/microphone_icon.png')}/>  
                <Text style={styles.buttonText}>רמקול</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        //backgroundColor: "#7f71e3",
    },
    button: {
        width: 300,
        backgroundColor: "#6f61ca", // #6357b5
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
        marginHorizontal: 30,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "500",
        color: "seashell",
        textAlign: "center",
    },
    tinyLogo:{
        width: 20,
        height: 20,
        //alignItems: 'center',
        //justifyContent: 'center',
        //marginBottom: 50,
        //marginRight: 10,
        //marginTop: 14,
        left: 30,
        bottom: 2,
        zIndex: 5,
        
    },
    exitButton: {
        marginLeft: 30,
        paddingTop: 60,
    },
    exitText: {
        fontSize: 30,
        color: "seashell",
    },
});
