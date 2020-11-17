import { Alert, Button } from "react-native";
import sever from "./api/serverApi";
import { responedList } from "./respondList";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import NetInfo from "@react-native-community/netinfo";

class global {
  constructor() {
    this.User; //when log in used to store the user object
    this.Navigation; //used for storing navigation oject
    this.company;
    this.timer = 0;
    this.language;

    this.AddNotificationListener = (callback) => {
      Notifications.addNotificationResponseReceivedListener(callback);
    };

    this.SendRequest = async (url, obj) => {
      console.log(url);
      console.log(obj);
      title = "";
      msg = "";
      alertButton = [{ text: "הבנתי" }];
      isConnected = await NetInfo.fetch().then((state) => state.isConnected);
      if (!isConnected) {
        title = "תקלה בתקשורת";
        msg = "אירעה תקלה בתקשורת יש לבדוק את החיבור לרשת";

        Alert.alert(title, msg, alertButton, { cancelable: false });
        return {};
      } else {
        try {
          const res = await sever.post(url, obj);
          if (res.data.err) {
            switch (res.data.err) {
              case responedList.DBError:
              case responedList.FaildSave:
                return await this.SendRequest(url, obj);
              case responedList.usersNotFound:
                title = "הכניסה נכשלה";
                msg = " שם המשתמש או הסיסמה שגויים אנא נסו שנית";
                break;
              // when try to create a company and there is already a company with this name
              case responedList.companyNameExists:
                title = "ההרשמה נכשלה";
                msg = "";
                break;
              case responedList.NotExists:
                title = "תקלה לא צפויה";
                msg = "אנא פנה אלנו במייל\n danial1029@hotmail.com";
                break;
              // error when someone try to use a fake or not exists email
              case responedList.emailIsFake:
                title = "ההרשמה נכשלה";
                msg = "האימייל אינו תקין";
                break;
              default:
                title = error;
                msg = "error";
                break;
            }
            Alert.alert(title, msg, alertButton, { cancelable: false });
            return null;
          }
          return res.data == null ? "okay" : res.data;
        } catch (error) {
          title = "תקלה בתקשורת";
          msg = "קיימת בעיה עם השרת נסו מאוחר יותר";

          Alert.alert(title, msg, alertButton, { cancelable: false });
          return null;
        }
      }
    };

    this.registerForPushNotificationsAsync = async () => {
      if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
          );
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
        token = await Notifications.getExpoPushTokenAsync();
        return token.data;
      }
      return 0;
    };
  }
}
const globalObject = new global();
export { globalObject };
