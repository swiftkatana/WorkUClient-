import React, { useState,
    Dimensions,
    Image,
    Slider,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from "react";
import { Audio,AVPlaybackStatus  } from 'expo-av';
import * as FileSystem from "expo-file-system";
import * as Font from "expo-font";
import * as Permissions from "expo-permissions";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const BACKGROUND_COLOR = "#FFF8ED";
const LIVE_COLOR = "#FF0000";
const DISABLED_OPACITY = 0.5;
const RATE_SCALE = 3.0;

const recording = new Audio.Recording();

export default function VoiceRecording() {
    const [haveRecordingPermissions, setHaveRecordingPermissions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaybackAllowed, setIsPlaybackAllowed] = useState(false);
    const [muted, setMuted] = useState(false);
    const [soundPosition, setSoundPosition] = useState(null);
    const [soundDuration, setSoundDuration] = useState(null);
    const [recordingDuration, setRecordingDuration] = useState(null);
    const [shouldPlay, setShouldPlay] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [shouldCorrectPitch, setShouldCorrectPitch] = useState(true);
    const [volume, setVolume] = useState(1.0);
    const [rate, setRate] = useState(1.0);

    recording= Audio.Recording | null;
    sound= Audio.Sound | null;
    isSeeking= boolean;
    shouldPlayAtEndOfSeek= boolean;
    recordingSettings= Audio.RecordingOptions;

    recording = null;
    sound = null;
    isSeeking = false;
    shouldPlayAtEndOfSeek = false;
    recordingSettings = Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY;

    const askForPermissions  = async () => {
        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        setHaveRecordingPermissions(response.status === "granted");
    };
    const updateScreenForSoundStatus  = async (status: AVPlaybackStatus) => {
        if (status.isLoaded) {
              setSoundDuration(status.durationMillis ?? null);
              setSoundPosition(status.positionMillis);
              setShouldPlay(status.shouldPlay);
              setIsPlaying(status.isPlaying);
              setRate(status.rate);
              setMuted(status.isMuted);
              setVolume(status.volume);
              setShouldCorrectPitch(status.shouldCorrectPitch);
              setIsPlaybackAllowed(true);
          } else {
              setSoundDuration(null);
              setSoundPosition(null);
              setIsPlaybackAllowed(false);
            if (status.error) {
              console.log(`FATAL PLAYER ERROR: ${status.error}`);
            }
          }
    };

    const updateScreenForRecordingStatus   = async (status: Audio.RecordingStatus) => {
        if (status.canRecord) {
              setIsRecording(status.isRecording);
              setRecordingDuration(status.durationMillis);
          } else if (status.isDoneRecording) {
              setIsRecording(false);
              setRecordingDuration(status.durationMillis);
            if (!isLoading) {
              stopRecordingAndEnablePlayback();
            }
          }
    };
    const stopPlaybackAndBeginRecording   = async (status: Audio.RecordingStatus) => {
        setIsLoading(true);
        if (sound !== null) {
            await sound.unloadAsync();
            sound.setOnPlaybackStatusUpdate(null);
            sound = null;
          }
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
            staysActiveInBackground: true,
          });
          if (recording !== null) {
            recording.setOnRecordingStatusUpdate(null);
            recording = null;
          }

          const recording = new Audio.Recording();
          await recording.prepareToRecordAsync(recordingSettings);
          recording.setOnRecordingStatusUpdate(updateScreenForRecordingStatus);
      
          recording = recording;
          await recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
          setState({
            isLoading: false,
          });
    }

    const stopRecordingAndEnablePlayback   = async () => {
          setIsLoading(true);
        if (!recording) {
          return;
        }
        try {
          await recording.stopAndUnloadAsync();
        } catch (error) {
          // On Android, calling stop before any data has been collected results in
          // an E_AUDIO_NODATA error. This means no audio data has been written to
          // the output file is invalid.
          if (error.code === "E_AUDIO_NODATA") {
            console.log(
              `Stop was called too quickly, no data has yet been received (${error.message})`
            );
          } else {
            console.log("STOP ERROR: ", error.code, error.name, error.message);
          }
            setIsLoading(false);
          return;
        }
        const info = await FileSystem.getInfoAsync(recording.getURI() || "");
        console.log(`FILE INFO: ${JSON.stringify(info)}`);
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: false,
          staysActiveInBackground: true,
        });
        const { sound, status } = await recording.createNewLoadedSoundAsync(
          {
            isLooping: true,
            isMuted: state.muted,
            volume: state.volume,
            rate: state.rate,
            shouldCorrectPitch: state.shouldCorrectPitch,
          },
          updateScreenForSoundStatus
        );
        sound = sound;
          setIsLoading(false);
      }
    
      

    


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
