import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";

export default class VoiceRecording {
  constructor() {
    this.recording = new Audio.Recording();

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
          console.log(await this.recording.getStatusAsync());
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
        const res = await this.recording.getStatusAsync();
        var url = this.recording.getURI();
        console.log(url);
        var soundObject = new Audio.Sound();
        await soundObject.loadAsync({ uri: url }, { shouldPlay: true });
        await soundObject.playAsync();

        console.log(res);
        this.recording = new Audio.Recording();
      } catch (error) {
        console.log(error);
      }
    };
  }
}
