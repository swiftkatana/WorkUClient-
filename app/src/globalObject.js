import { Alert, Button } from "react-native";
import sever from "./api/serverApi";
import { responedList } from "./respondList";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import NetInfo from "@react-native-community/netinfo";
import { responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

class global {
  constructor() {
    this.User; //when log in used to store the user object
    this.company;
    this.timer;
    this.language;
    this.styles = {
      
      inputBox: {
        width: responsiveScreenWidth(80),
        height: responsiveScreenHeight(7),
        backgroundColor: "#ededed",
        borderRadius: 25,
        paddingHorizontal: responsiveScreenWidth(6),
        marginVertical: responsiveScreenHeight(1),
        textAlign: "right",
      },
      exitButton:
      {
          paddingTop: 40,
  
      },
      exitIcon:{
          height:50,
          width:50,
      },
      
    }

    this.socket;
    this.sendNotification = async (
      email,
      data,
      body,
      title,
      type,
      sound = "default"
    ) => {
      let to = await globalObject.SendRequest(requestList.getExpoIdUrl, {
        email,
      });
      if (!to) return;
      if (to === this.User.expoId) return;
      const message = {
        to,
        sound,
        title,
        body,
        data: { data, type },
        vibrate: true,
        priority: "high",
      };

      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
    };

    this.SendRequest = async (url, obj) => {
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
              case responedList.infoInvalid:
                title = "המידע שהכנסת שגוי";
                msg = "בבקשה תבדוק את המידע שהכנסת";
                break;
              default:
                title = res.data.err;
                msg = "error";
                break;
            }
            Alert.alert(title, msg, alertButton, { cancelable: false });
            return null;
          }
          return res.data === null ? "" : res.data;
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

        if (Platform.OS === "android") {
          Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
          });
        }
        token = await Notifications.getExpoPushTokenAsync();
        return token.data;
      }
      return "";
    };
  }
}
const globalObject = new global();
export { globalObject };
