import React, { useState,useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Audio } from 'expo-av';
import { Recording } from "expo-av/build/Audio";
import * as Permissions from "expo-permissions";


export default function VoiceRecording() {
    const [haveRecordingPermissions, setHaveRecordingPermissions] = useState(false);
    const [status, SetStatus] = useState("completed");

   const recording = useRef(new Audio.Recording()) 
    const askForPermissions = async () => {
        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
          setHaveRecordingPermissions(response.status === "granted");
      };
    
    const recordingHandler = async() =>{
    
        askForPermissions();
        try {
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            console.log("You are now recording!");
          } catch (error) {
              //console.log(error)
            console.log("err!");
          }
    };
    
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.button} onPress={() => recordingHandler()}>
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
    exitButton: {
        marginLeft: 30,
        paddingTop: 60,
    },
    exitText: {
        fontSize: 30,
        color: "seashell",
    },
});
