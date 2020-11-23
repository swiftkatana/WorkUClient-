import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import apiKeys from "../src/api/apiKeys";
export default class VoiceRecording {
  constructor() {
    this.recording = new Audio.Recording();
    this.sound;
    this.uri;
    this.StartRecording = async () => {
      if ((await Permissions.getAsync(Permissions.AUDIO_RECORDING)).status !=="granted") {
            await Permissions.askAsync(Permissions.AUDIO_RECORDING);
            return;
      } else {
        try {
            if(this.recording._isDoneRecording) return;
            if((await this.recording.getStatusAsync()).canRecord === false)
               {
                await this.recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
               }
            if(!(await this.recording.getStatusAsync()).isRecording)
                await this.recording.startAsync();
            this.url = null;
            this.uri = null;
        } catch (error) {
          console.log('start error', error);
        }
      }
    };

    this.StopRecording = async () => {
      try {
        if((await this.recording.getStatusAsync()).durationMillis > 300) {
          await this.recording.stopAndUnloadAsync();
          this.uri = this.recording.getURI();
          delete this.recording;
          this.recording = new Audio.Recording();
        }
      } catch (error) {
        console.log('stop error', error);
      }
    };
    this.UploadToServer = async (email, to, _id, fullName, readComOrUser) => {
      if (!this.uri) 
        return null;
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
          to,
          readComOrUser
        },
      });
      let body = JSON.parse(res.body);
      if (body.err)
        return null;
      return body;
    };

    this.playAudio = async (url) => {
      try {
        if(!this.uri && !url)
          return;
        if (this.sound) {
            await this.sound.pauseAsync();
            await this.sound.unloadAsync();
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
