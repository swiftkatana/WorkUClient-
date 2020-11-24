import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { globalObject } from "../../src/globalObject";
import requestList from "../../src/api/apiKeys";
import { connect } from "react-redux";
import Recorder from "../../class/VoiceRecording";
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from "react-native-responsive-dimensions";

function Main({ navigation, style }) {
  const play = require("../../assets/play_button_icon.png");
  const pause = require("../../assets/pause_icon.png");
  const square = require("../../assets/square_icon.png");
  const microphone = require("../../assets/microphone_icon.png");
  const paper_plane = require("../../assets/paper_plane_icon.png");
  const imgSrc = [play, pause, square, microphone, paper_plane];
  const item = navigation.state.params.item;
  const [update, setUpdate] = useState(0);
  const myScroll = useRef(null);
  const Rec = new Recorder();
  const status = globalObject.User.role === "manager" ? "בוטל" : "הושלם";
  const navi =
    globalObject.User.role === "manager"
      ? "ManagerMainScreen"
      : "EmployeeMainScreen";
  const butText =
    globalObject.User.role === "manager" ? "ביטול משימה" : "סיימתי בהצלחה";
  const email = item.employee;
  const notiEmail =
    globalObject.User.role === "manager"
      ? item.employee
      : globalObject.User.managerEmail;
  const audios = navigation.state.params.shouldRender
    ? globalObject.User.tasks.processing[item._id].audios
    : globalObject.User.tasks.completed[item._id].audios;

  const [toolTipVisible, setToolTipVisible] = useState(false);
  const renderTaskOptions = () => {
    return (
      <View>
        <View style={globalObject.styles.recordSendBtnList}>
          <TouchableOpacity
            style={{ ...globalObject.styles.voice_3_btns, ...style.btn2 }}
            onPressIn={Rec.StartRecording}
            onPressOut={Rec.StopRecording}
          >
            <Image style={globalObject.styles.tinyVoiceIcon} source={imgSrc[3]} />
            <Text style={globalObject.styles.regButtonText}>הקלט</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...globalObject.styles.voice_3_btns, ...style.btn2 }}
            onPress={Rec.playAudio}
          >
            <Image style={globalObject.styles.tinyVoiceIcon} source={imgSrc[0]} />
            <Text style={globalObject.styles.regButtonText}>נגן הקלטה</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...globalObject.styles.voice_3_btns, ...style.btn2 }}
            onPress={handlerSendVoice}
          >
            <Image style={globalObject.styles.tinyVoiceIcon} source={imgSrc[4]} />
            <Text style={globalObject.styles.regButtonText}>שלח הודעה</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.updateBtnContainer}>
          <TouchableOpacity
            style={{ ...styles.updateButton, ...style.btn2 }}
            onPress={pressHandler}
          >
            <Image
              style={globalObject.styles.tinyVoiceIcon}
              source={require("../../assets/star_icon.png")}
            />
            <Text style={globalObject.styles.regButtonText}> {butText} </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  useEffect(() => {
    const handle = setInterval(() => {
      if (update !== audios.length) setUpdate(update + 1);
    }, 100);
    myScroll.current.scrollToEnd({ animated: true });
    return () => {
      clearInterval(handle);
    };
  }, [update]);

  const SendUpdateTask = async () => {
    var res = await globalObject.SendRequest(requestList.userUpdateTaskUrl, {
      _id: item._id,
      email,
      complete: "completed",
      status,
    });
    if (res) {
      globalObject.User.tasks.completed[item._id] = res;
      delete globalObject.User.tasks.processing[item._id];
      let status =
        globalObject.User.role === "manager"
          ? { title: "משימה בוטלה", body: "המשימה הוסרה מלוח המשימות" }
          : {
            title: "משימה הושלמה",
            body: "העובד " + globalObject.User.fullName + " השלים משימה",
          };
      globalObject.sendSocketMessage("taskStatusChange", res, notiEmail);
      globalObject.sendNotification(
        notiEmail,
        res,
        status.body,
        status.body,
        "updateTask"
      );
      navigation.navigate(navi);
    }
  };
  const pressHandler = () => {
    title = "שים לב";
    msg =
      globalObject.User.role !== "manager"
        ? "פעולה זו תעביר את המשימה לסטטוס ''הושלמה'' ולאחר מכן חדר המשימה יסגר ויוסר מרשימת המשימות הפתוחות"
        : "פעולה זו תעביר את המשימה לסטטוס ''נסגר'' ולאחר מכן חדר המשימה יסגר ויוסר מרשימת המשימות הפתוחות";
    alertButton = [
      {
        text: "אישור",
        onPress: () => {
          SendUpdateTask();
        },
      },
      { text: "ביטול" },
    ];
    Alert.alert(title, msg, alertButton, { cancelable: false });
  };
  const handlerSendVoice = async () => {
    let to = item.employee;
    let noti =
      globalObject.User.role === "manager"
        ? globalObject.User.tasks.processing[item._id].employee
        : globalObject.User.managerEmail;

    let audio = await Rec.UploadToServer(
      globalObject.User.email,
      to,
      item._id,
      globalObject.User.fullName,
      globalObject.User.role
    );
    if (audio) {
      audios.push(audio);
      globalObject.sendSocketMessage(
        "updateTaskVoice",
        {
          audio,
          taskId: item._id,
        },
        noti
      );
      audio.taskId = item._id;
      globalObject.sendNotification(
        noti,
        audio,
        "התקבלה הודעה קולית חדשה",
        "התקבל עדכון",
        "updateTaskVoice"
      );
      setUpdate(update + 1);
    }
  };

  const renderVoiceList = () => {
    return audios.map((obj) => {
      if (obj.email === globalObject.User.email) {
        return (
          <View key={obj.url} style={globalObject.styles.VoicPlayeButton}>
            <TouchableOpacity
              style={{ ...globalObject.styles.VoicPlayeButton, ...style.btn3 }}
              onPress={() => Rec.playAudio(obj.url)}
            >
              <Image style={globalObject.styles.tinyVoiceIcon} source={imgSrc[0]} />
              <Text style={globalObject.styles.regButtonText}>אני</Text>
            </TouchableOpacity>
          </View>
        );
      }
      return (
        <View key={obj.url} style={globalObject.styles.yourVoiceMsg}>
          <TouchableOpacity
            style={{ ...globalObject.styles.VoicPlayeButton, ...style.btn2 }}
            onPress={() => Rec.playAudio(obj.url)}
          >
            <Image style={globalObject.styles.tinyVoiceIcon} source={imgSrc[0]} />
            <Text style={globalObject.styles.regButtonText}>{obj.fullName}</Text>
          </TouchableOpacity>
        </View>
      );
    });
  };

  return (
    <View style={{ ...styles.view, ...style.view }}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={globalObject.styles.menuTitle}>משימה</Text>
          <Text style={globalObject.styles.subTextWhite}>דחיפות: {item.priority}</Text>
          <Text style={globalObject.styles.subTextWhite}>תקציר: {item.title}</Text>
          <Text style={globalObject.styles.subTextWhite}>שם עובד: {item.fullName} </Text>

        </View>
        <View style={globalObject.styles.VoiceScrollView}>
            <ScrollView ref={(ref) => (myScroll.current = ref)}>
              {renderVoiceList()}
            </ScrollView>
          </View>
      </View>

      {navigation.state.params.shouldRender === true
        ? renderTaskOptions()
        : null}

      <TouchableOpacity
        style={globalObject.styles.exitButton}
        onPress={() => navigation.pop()}
      >
        <Image
          style={globalObject.styles.exitIcon}
          source={require("../../assets/exit_icon.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    //marginTop:50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    height: responsiveScreenHeight(50),
    width: responsiveScreenWidth(100),
    alignItems: "center",
    justifyContent: "center",
  },
  updateBtnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  updateButton: {
    width: responsiveWidth(50),
    height: responsiveHeight(10.2),
    borderRadius: 25,
    marginVertical: responsiveHeight(1),
    alignItems: "center",
    justifyContent:'center',
  },
});
const mapStateToProps = (state) => {
  return { style: state.styles };
};
export default connect(mapStateToProps, {})(Main);
