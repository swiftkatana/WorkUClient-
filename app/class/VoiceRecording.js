import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import apiKeys from "../src/api/apiKeys";
export default class VoiceRecording {
  constructor() {
    this.recording = new Audio.Recording();
    this.sound;
    this.uri;
    this.url;
    this.StartRecording = async () => {
      if (
        (await Permissions.getAsync(Permissions.AUDIO_RECORDING)).status !==
        "granted"
      ) {
        await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      } else {
        try {
          await this.recording.prepareToRecordAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
          );

          if ((await this.recording.getStatusAsync()).canRecord) {
            await this.recording.startAsync();
            console.log("start rec");
          }

        } catch (error) {
          console.log(error);
        }
      }
    };

    this.StopRecording = async () => {
      console.log("stop rec");
      try {
        if ((await this.recording.getStatusAsync()).isRecording) {
          await this.recording.stopAndUnloadAsync();
          this.uri = this.recording.getURI();
          delete this.recording;
          this.recording = new Audio.Recording();
        }
      } catch (error) {
        console.log(error);
      }
    };
    this.UploadToServer = async (email, to, _id, fullName) => {
      if (!this.uri) {
        console.log('need to add voice before send ')
        return
      }
      let res = await FileSystem.uploadAsync(apiKeys.UploadAudioUrl, this.uri, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        httpMethod: "POST",
        sessionType: FileSystem.FileSystemSessionType.BACKGROUND,
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "audio",
        mimeType: "",
        parameters: {
          email,
          _id,
          fullName,
          to
        },
      });
      if (res.body.err) {
        console.log(res.body.err)
        return res.body.err
      }
      return JSON.parse(res.body)
    };

    this.playAudio = async (url) => {
      try {
        if (this.sound) {
          if (await (await this.sound.getStatusAsync()).isLoaded) {
            await this.sound.unloadAsync();
          }

        }
        console.log('play music', url || this.uri);
        this.sound = new Audio.Sound();
        await this.sound.loadAsync({ uri: url || this.uri }, { shouldPlay: true });
      } catch (error) {
        console.log(error);
      }

    };
  }
}
