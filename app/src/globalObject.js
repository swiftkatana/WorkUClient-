import { Alert, Button, Dimensions } from "react-native";
import sever from "./api/serverApi";
import { responedList } from "./respondList";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import NetInfo from "@react-native-community/netinfo";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import socketClient from "socket.io-client";
import ip from "./api/serverIP";
const io = require("socket.io-client");
const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000,
  secure: false,
  transports: ["websocket"], // you need to explicitly tell it to use websockets
};

class global {
  constructor() {
    this.User; //when log in used to store the user object
    this.company;
    this.timer;
    this.language;
    this.login = false;
    this.socket;
    this.firstTimeInitSocket = true;
    this.styles = {
      regInputBox: {
        width: responsiveScreenWidth(80),
        height: responsiveScreenHeight(7),
        backgroundColor: "#ededed",
        borderRadius: 25,
        paddingHorizontal: responsiveScreenWidth(6),
        marginVertical: responsiveScreenHeight(1),
        textAlign: "right",
      },
      regButton: {
        width: responsiveScreenWidth(80),
        height: responsiveScreenHeight(7),
        backgroundColor: "#7f71e3",
        borderRadius: 25,
        marginVertical: responsiveScreenHeight(1),
        justifyContent: "center",
      },
      regButtonText: {
        fontSize: responsiveScreenFontSize(2), //16
        color: "seashell",
        textAlign: "center",
      },
      signupOrLoginTextCont: {
        flexDirection: "row-reverse",
        justifyContent: "center",
        alignItems: "center",
      },
      signupOrLoginText: {
        fontSize: responsiveScreenFontSize(2), //16
      },
      signupOrLoginButton: {
        paddingRight: responsiveScreenWidth(1),
        color: "#7f71e3",
        fontSize: responsiveScreenFontSize(2.2), //18
        fontWeight: "bold",
      },
      loadingIcon: {
        marginTop: responsiveScreenHeight(2),
        width: responsiveScreenHeight(4),
        height: responsiveScreenHeight(4),
      },
      regTitleText: {
        marginVertical: responsiveScreenHeight(4),
        fontSize: responsiveScreenFontSize(2.9), //22
        color: "#000000",
        fontWeight: "bold",
      },
      menuTitle: {
        textAlign: "center",
        width: Dimensions.get("window").width * 0.8,
        margin: responsiveScreenWidth(5),
        fontSize: responsiveScreenFontSize(6), //48
        color: "seashell",
        borderBottomWidth: 2,
        borderColor: "seashell",
      },
      menuBtnContainer: {
        alignItems: "center",
      },
      menuBtn: {
        margin: responsiveScreenWidth(5),
      },
      menuBtnText: {
        fontSize: responsiveScreenFontSize(3),
        color: "seashell",
      },
      exitButton: {
        paddingTop: responsiveScreenHeight(3),
      },
      exitIcon: {
        width: responsiveScreenHeight(6.5),
        height: responsiveScreenHeight(6.5),
      },
      subTextBlack: {
        fontSize: responsiveScreenFontSize(2.2), //18
        color: "black",
      },
      subTextWhite: {
        textAlign: "center",
        fontSize: responsiveScreenFontSize(2.2), //18
        color: "seashell",
      },
      mainListCon: {
        height: Dimensions.get("window").height / 1.6,
        width: Dimensions.get("window").width / 1.1,
        borderWidth: 1,
        borderRadius: 25,
      },
      listContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: Dimensions.get("window").height / 1.7,
        width: Dimensions.get("window").width / 1.1,
        marginTop: responsiveScreenHeight(1),
      },
      listText: {
        flex: 4,
        textAlign: "center",
        fontSize: responsiveScreenFontSize(1.7), //14
      },
      list: {
        height: responsiveScreenHeight(9),
        width: Dimensions.get("window").width * 0.85,
        backgroundColor: "white",
        flexDirection: "row-reverse",
        alignItems: "center",
        //marginHorizontal: 20,
        borderRadius: 25,
        marginBottom: responsiveScreenHeight(1),
        borderWidth: 1,
        borderColor: "lightgrey",
      },
      arrowIcon: {
        width: responsiveScreenHeight(2.5),
        height: responsiveScreenHeight(2.5),
        marginLeft: responsiveScreenWidth(5),
        opacity: 0.7,
      },
      //for tasks screens
      voice_3_btns: {
        width: responsiveScreenWidth(25),
        height: responsiveScreenHeight(10.2),
        borderRadius: 25,
        marginVertical: responsiveScreenHeight(1),
        marginHorizontal: responsiveScreenWidth(2),
        alignItems: "center",
        justifyContent: "center",
      },
      VoicPlayeButton: {
        width: responsiveWidth(50),
        height: responsiveHeight(10.1),
        justifyContent: "center",
        borderRadius: 25,
        marginHorizontal: responsiveScreenWidth(5),
        alignItems: "center",
        borderWidth: 3,
        borderColor: "lightgrey",
      },
      tinyVoiceIcon: {
        width: responsiveScreenHeight(2),
        height: responsiveScreenHeight(2),
        alignItems: "center",
        justifyContent: "center",
      },
      recordSendBtnList: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        marginTop: responsiveScreenWidth(5),
      },
      myVoiceMsg: {
        width: Dimensions.get("window").width,
        alignItems: "flex-start",
        justifyContent: "center",
      },
      yourVoiceMsg: {
        width: Dimensions.get("window").width * 0.85,
        alignItems: "flex-end",
        justifyContent: "center",
      },

      VoiceScrollView: {
        height: responsiveHeight(28),
        width: responsiveWidth(85),
        marginTop: responsiveScreenHeight(1),
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "seashell",
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "lightgrey",
      },
    };

    this.unmountSocket = () => {
      //updatePersonalReuqest, updateTaskVoice, newTaskGot, taskStatusChange;
      this.socket.off("updatePersonalReuqest" + this.User.email);
      this.socket.off("updateTaskVoice" + this.User.email);
      this.socket.off("newTaskGot" + this.User.email);
      this.socket.off("taskStatusChange" + this.User.email);
      this.socket.send({ type: "logout" });
    };
    this.sendSocketMessage = (type = "", data, to = "") => {
      let message = {
        type,
        data,
        to,
      };
      this.socket.send({ ...message });
    };

    this.SocketConnect = () => {
      try {
        this.socket = socketClient(ip, connectionConfig);
        this.socket.on("disconnect", () => {
          this.SocketConnect();
        });
      } catch (e) {
        console.log(e);
      }
      if (this.firstTimeInitSocket) {
        this.firstTimeInitSocket = false;
        this.unmountSocket();

        this.socket.on("newTaskGot" + this.User.email, (data) => {
          console.log("new");
          this.User.tasks.processing[data._id] = data;
        });

        this.socket.on("updateTaskVoice" + this.User.email, (data) => {
          console.log("new audio");
          console.log(data.audio.url);
          var v = Object.values(this.User.tasks.processing[data.taskId].audios);
          var found = false;
          v.forEach((i) => {
            if (i.url === data.audio.url) {
              found = true;
              return;
            }
          });
          if (!found)
            this.User.tasks.processing[data.taskId].audios.push(data.audio);
          //console.log(this.User.tasks.processing[data.taskId].audios);
        });
        this.socket.on(
          "updateOrNewPersonalRequest" + this.User.email,
          (data) => {
            console.log("updateOrNewPersonalRequest");
            this.User.personalRequests[data._id] = data;
          }
        );

        this.socket.on("taskStatusChange" + this.User.email, (data) => {
          console.log("taskStatusChange");
          delete this.User.tasks.processing[data._id];
          this.User.tasks.completed[data._id] = data;
        });

        this.socket.on("managerGotShift" + this.User.email, (data) => {
          console.log("managerGotShift");
          this.company.employees[data.email].shift = data;
        });

        this.socket.on("newEmployee" + this.User.email, (data) => {
          console.log("newEmployee");
          this.company.employees[data.email] = data;
        });

        if (this.User.role !== "manager") {
          this.socket.on(
            "employeeGotFinalShift" + this.User.company,
            (data) => {
              console.log("employeeGotFinalShift");
              if (this.User.shifts.length > 1) {
                this.User.shifts.shift();
              }
              this.User.shifts.push(data);
            }
          );
        }
      }
    };

    this.sendNotification = async (
      email,
      data,
      body,
      title,
      type,
      sound = "default"
    ) => {
      let to = await this.SendRequest(requestList.getExpoIdUrl, {
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
