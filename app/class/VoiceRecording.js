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
          await this.recording.startAsync();
          console.log("start rec");
        } catch (error) {
          console.log(error);
        }
      }
    };

    this.StopRecording = async () => {
      console.log("stop rec");
      try {
        await this.recording.stopAndUnloadAsync();
        this.uri = this.recording.getURI();
        this.recording = new Audio.Recording();
      } catch (error) {
        console.log(error);
      }
    };
    this.UploadToServer = async (email, _id, fullName) => {
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
          fullName
        },
      });
      if (res.body.err) {
        console.log(res.body.err)
        return res.body.err
      }
      return res.body
    };

    this.playAudio = async () => {
      console.log('play music', this.uri)
      this.sound = new Audio.Sound();
      await this.sound.loadAsync({ uri: this.uri }, { shouldPlay: true });
      await this.sound.playAsync();
      await this.sound.unloadAsync();
    };
  }
}
