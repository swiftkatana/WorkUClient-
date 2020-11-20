import React, { useState, useRef } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Audio } from 'expo-av';
import { Recording } from "expo-av/build/Audio";
import * as Permissions from "expo-permissions";


const onPlaybackStatusUpdate = playbackStatus => {
    if (!playbackStatus.isLoaded) {
        // Update your UI for the unloaded state
        if (playbackStatus.error) {
            console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
            // Send Expo team the error on Slack or the forums so we can help you debug!
        }
    } else {
        // Update your UI for the loaded state

        if (playbackStatus.isPlaying) {
            // Update your UI for the playing state
        } else {
            // Update your UI for the paused state
        }

        if (playbackStatus.isBuffering) {
            // Update your UI for the buffering state
        }

        if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
            // The player has just finished playing and will stop. Maybe you want to play something else?
        }

    }
};


export default function VoiceRecording() {
    var recording = new Audio.Recording();
    const [obj, SetObj] = useState();
    const askForPermissions = async () => {
        await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    };

    const recordingHandler = async () => {
        if ((await Permissions.getAsync(Permissions.AUDIO_RECORDING)).status !== "granted") {
            await askForPermissions();
        }
        else {
            try {
                await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                // await recording.createNewLoadedSoundAsync(,onPlaybackStatusUpdate);
                await recording.startAsync();
                console.log(await recording.getStatusAsync());
                console.log("You are now recording!");
            } catch (error) {
                console.log(error);
            }
        }
    };
    const stopRecordingHandler = async () => {

        console.log("1stop recording!");

        try {
            await recording.stopAndUnloadAsync();
            const res = await recording.getStatusAsync();
            var url = recording.getURI();
            console.log(url);
            var soundObject = new Audio.Sound();
            await soundObject.loadAsync({ uri: url }, { shouldPlay: true });
            await soundObject.playAsync();

            console.log(res);
            recording = new Audio.Recording();

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.button} onPressIn={recordingHandler} onPressOut={stopRecordingHandler}>
                <Image style={styles.tinyLogo} source={require('../assets/microphone_icon.png')} />
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
    tinyLogo: {
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
